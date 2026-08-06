const Product = require('../models/Product');
const handleError = require('../utils/handleError');

const SORT_OPTIONS = {
  price_asc: { price: 1 },
  price_desc: { price: -1 },
  name_asc: { name: 1 },
  name_desc: { name: -1 }
};

const MAX_LIMIT = 200;

function toPositiveInt(value, fallback, max) {
  const n = Math.floor(Number(value));
  if (!Number.isFinite(n) || n < 1) return fallback;
  return max ? Math.min(n, max) : n;
}

function toPrice(value) {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

// Neutraliza los metacaracteres para que el texto del usuario se busque literal
// y no pueda inyectar una expresión regular costosa.
function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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

    res.json({ products, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    handleError(res, error, 'Error al obtener productos');
  }
}

async function getFeaturedProducts(req, res) {
  try {
    let products = await Product.find({ featured: true }).limit(10);
    if (products.length === 0) {
      products = await Product.find().sort({ createdAt: -1 }).limit(10);
    }
    res.json(products);
  } catch (error) {
    handleError(res, error, 'Error al obtener destacados');
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

async function getCategoriesAndBrands(req, res) {
  try {
    const [categories, brands] = await Promise.all([countBy('category'), countBy('brand')]);
    res.json({ categories, brands });
  } catch (error) {
    handleError(res, error, 'Error al obtener filtros');
  }
}

async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
}

async function createProduct(req, res) {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    handleError(res, error, 'Error al crear el producto');
  }
}

async function updateProduct(req, res) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    handleError(res, error, 'Error al actualizar el producto');
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    handleError(res, error, 'Error al eliminar el producto');
  }
}

module.exports = {
  getProducts,
  getFeaturedProducts,
  getCategoriesAndBrands,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
