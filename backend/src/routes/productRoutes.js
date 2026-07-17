const express = require('express');
const { protect, adminOnly } = require('../middleware/auth');
const {
  getProducts,
  getFeaturedProducts,
  getCategoriesAndBrands,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const router = express.Router();

router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/filters', getCategoriesAndBrands);
router.get('/:id', getProductById);

router.post('/', protect, adminOnly, createProduct);
router.put('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

module.exports = router;
