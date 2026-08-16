const Product = require('../models/Product');
const handleError = require('../utils/handleError');

// Traduce el valor de ?sort= de la URL a la sintaxis de .sort() de Mongoose.
// 'random' (el que usa el Home por defecto) no está aquí porque no es un
// sort de Mongo real — se maneja aparte, ver el bloque `if (sort === 'random')` abajo.
const SORT_OPTIONS = {
  price_asc: { price: 1 },
  price_desc: { price: -1 },
  name_asc: { name: 1 },
  name_desc: { name: -1 }
};

// Techo del ?limit= que puede pedir el cliente, para que nadie pida "todo el
// catálogo de una vez" con un límite absurdamente alto.
const MAX_LIMIT = 200;

// Convierte page/limit de query string (siempre texto, o pueden venir vacíos
// o inválidos) a un entero positivo utilizable; cualquier valor no válido
// (texto no numérico, negativo, cero) cae al `fallback` en vez de romper la
// consulta con NaN.
function toPositiveInt(value, fallback, max) {
  const n = Math.floor(Number(value));
  if (!Number.isFinite(n) || n < 1) return fallback;
  return max ? Math.min(n, max) : n;
}

// Igual que toPositiveInt pero para minPrice/maxPrice: acepta 0 (a diferencia
// de toPositiveInt) y devuelve null en vez de un fallback numérico, para que
// el llamador pueda distinguir "no se mandó filtro de precio" de "0".
function toPrice(value) {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

// Neutraliza los metacaracteres para que el texto del usuario se busque literal
// y no pueda inyectar una expresión regular costosa.
function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Agrega sellingPrice (el precio con descuento ya calculado, ver
// Product.getSellingPrice) a la respuesta JSON de un producto, para que el
// frontend nunca tenga que repetir la fórmula del descuento — solo lee
// sellingPrice si quiere el precio a cobrar, o price/discountPercent si
// quiere mostrar el precio tachado y el porcentaje.
function withSellingPrice(product) {
  const obj = product.toObject();
  obj.sellingPrice = product.getSellingPrice();
  return obj;
}

// PRNG determinista (mulberry32) a partir de un seed de texto: con el mismo
// seed siempre produce la misma secuencia de números. Así, "Ver más" en la
// página de inicio puede pedir la página 2 del orden aleatorio sin repetir ni
// saltarse productos, mientras que una recarga (seed nuevo en el cliente) sí
// mezcla el catálogo de nuevo.
function seededRandom(seed) {
  let h = 1779033703 ^ String(seed).length;
  for (let i = 0; i < String(seed).length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function next() {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

// Fisher-Yates de toda la vida, solo que con el PRNG sembrado de arriba en
// vez de Math.random(), para que el orden "aleatorio" sea reproducible por seed.
function shuffleWithSeed(array, seed) {
  const rand = seededRandom(String(seed || 'musicland'));
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

async function getProducts(req, res) {
  try {
    const { search, q, category, brand, sort } = req.query;
    const page = toPositiveInt(req.query.page, 1);
    const limit = toPositiveInt(req.query.limit, 100, MAX_LIMIT);

    const filter = {};

    // 'search' usa el índice de texto (palabras completas, para la tienda);
    // 'q' busca subcadenas (para el panel admin, donde se escribe a medias).
    if (search) filter.$text = { $search: search };
    if (q && q.trim()) {
      const rx = new RegExp(escapeRegex(q.trim()), 'i');
      filter.$or = [{ name: rx }, { brand: rx }, { category: rx }];
    }

    if (category) filter.category = category;
    if (brand) filter.brand = brand;

    const minPrice = toPrice(req.query.minPrice);
    const maxPrice = toPrice(req.query.maxPrice);
    if (minPrice !== null || maxPrice !== null) {
      filter.price = {};
      if (minPrice !== null) filter.price.$gte = minPrice;
      if (maxPrice !== null) filter.price.$lte = maxPrice;
    }

    // Orden aleatorio (usado por defecto en el home): Mongo no tiene un "sort
    // aleatorio pero estable entre páginas" nativo, así que se trae el conjunto
    // filtrado completo (el catálogo es chico, cientos de productos como mucho)
    // y se mezcla en memoria con un PRNG sembrado por 'seed'. Con eso, pedir la
    // página 2 con el mismo seed da la continuación exacta de la página 1 en
    // vez de un mezclado nuevo que repita o se salte productos.
    if (sort === 'random') {
      const all = await Product.find(filter).sort({ _id: 1 });
      const shuffled = shuffleWithSeed(all, req.query.seed);
      const total = shuffled.length;
      const start = (page - 1) * limit;
      const products = shuffled.slice(start, start + limit).map(withSellingPrice);
      return res.json({ products, total, page, pages: Math.ceil(total / limit) });
    }

    // El desempate por _id es obligatorio: los campos de ordenación no son únicos
    // (el seed inserta cientos de productos con el mismo createdAt) y sin un criterio
    // total Mongo no garantiza orden estable entre consultas, así que skip/limit
    // devolvería productos repetidos y se saltaría otros.
    const sortOption = { ...(SORT_OPTIONS[sort] || { createdAt: -1 }), _id: -1 };

    const products = await Product.find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Product.countDocuments(filter);

    res.json({ products: products.map(withSellingPrice), total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    handleError(res, error, 'No pudimos cargar los productos');
  }
}

// Carrusel de ofertas de la portada: los productos con descuento activo,
// del mayor al menor porcentaje (las mejores ofertas primero). Si nadie tiene
// un descuento puesto todavía (p. ej. una tienda recién sembrada), cae de
// vuelta a mostrar los 10 más recientes, para que el carrusel nunca aparezca
// vacío — ya no muestra el precio de lista, sino el precio con descuento
// (ver getSellingPrice en el modelo) para que la portada coincida con lo que
// de verdad se cobra al comprar.
async function getDeals(req, res) {
  try {
    let products = await Product.find({ discountPercent: { $gt: 0 } })
      .sort({ discountPercent: -1 })
      .limit(10);
    if (products.length === 0) {
      products = await Product.find().sort({ createdAt: -1 }).limit(10);
    }
    res.json(products.map(withSellingPrice));
  } catch (error) {
    handleError(res, error, 'No pudimos cargar las ofertas');
  }
}

// Los recuentos se calculan con una agregación en vez de descargar el catálogo
// entero al cliente para contarlo allí (que además rompería al superar el límite).
function countBy(field) {
  return Product.aggregate([
    { $group: { _id: `$${field}`, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
    { $project: { _id: 0, name: '$_id', count: 1 } }
  ]);
}

// Las dos listas de "Filtrar por" del Home/AdminProducts (categorías y
// marcas), cada una con su conteo de productos, en paralelo con Promise.all
// porque una consulta no depende de la otra.
async function getCategoriesAndBrands(req, res) {
  try {
    const [categories, brands] = await Promise.all([countBy('category'), countBy('brand')]);
    res.json({ categories, brands });
  } catch (error) {
    handleError(res, error, 'No pudimos cargar los filtros');
  }
}

// Ficha de un producto (ProductDetail.jsx). Pasa por handleError como el
// resto de los controladores: así un :id con formato inválido da 400
// "identificador no válido" en vez de un 404 genérico, y cualquier otro
// error real queda registrado en el servidor en vez de enmascararse.
async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(withSellingPrice(product));
  } catch (error) {
    handleError(res, error, 'No pudimos cargar este producto');
  }
}

// CRUD de administración: req.body se pasa casi tal cual al modelo, que es
// quien valida (required, min, enum, etc. — ver Product.js); un dato
// inválido llega aquí como ValidationError y handleError lo traduce a un 400
// con el mensaje de esa regla.
async function createProduct(req, res) {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    handleError(res, error, 'No pudimos guardar el producto');
  }
}

async function updateProduct(req, res) {
  try {
    // runValidators: sin esto, findByIdAndUpdate NO vuelve a correr las
    // reglas del schema (comportamiento por defecto de Mongoose) y se podría
    // guardar, por ejemplo, un precio negativo al editar.
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    handleError(res, error, 'No pudimos actualizar el producto');
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    handleError(res, error, 'No pudimos eliminar el producto');
  }
}

module.exports = {
  getProducts,
  getDeals,
  getCategoriesAndBrands,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
