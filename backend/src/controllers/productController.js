const Product = require('../models/Product');

const SORT_OPTIONS = {
  price_asc: { price: 1 },
  price_desc: { price: -1 },
  name_asc: { name: 1 },
  name_desc: { name: -1 }
};

async function getProducts(req, res) {
  try {
    const { search, category, brand, sort, page = 1, limit = 100 } = req.query;
    const filter = {};
    if (search) filter.$text = { $search: search };
    if (category) filter.category = category;
    if (brand) filter.brand = brand;

    const sortOption = SORT_OPTIONS[sort] || { createdAt: -1 };

    const products = await Product.find(filter)
      .sort(sortOption)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));
    const total = await Product.countDocuments(filter);

    res.json({ products, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error: error.message });
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
    res.status(500).json({ message: 'Error al obtener destacados', error: error.message });
  }
}

async function getCategoriesAndBrands(req, res) {
  try {
    const categories = await Product.distinct('category');
    const brands = await Product.distinct('brand');
    res.json({ categories, brands });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener filtros', error: error.message });
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
    res.status(400).json({ message: 'Error al crear el producto', error: error.message });
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
    res.status(400).json({ message: 'Error al actualizar el producto', error: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
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
