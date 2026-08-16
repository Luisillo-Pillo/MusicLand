const express = require('express');
const { protect, adminOnly } = require('../middleware/auth');
const {
  getProducts,
  getDeals,
  getCategoriesAndBrands,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const router = express.Router();

// Consultar el catálogo es público (cualquiera puede navegar la tienda sin
// cuenta); solo crear/editar/borrar productos exige sesión de administrador.
router.get('/', getProducts);
router.get('/deals', getDeals); // productos con descuento, para el carrusel del Home
router.get('/filters', getCategoriesAndBrands);
router.get('/:id', getProductById);

router.post('/', protect, adminOnly, createProduct);
router.put('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

module.exports = router;
