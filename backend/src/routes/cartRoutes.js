const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart
} = require('../controllers/cartController');

const router = express.Router();

// Todo el carrito requiere sesión: no existe carrito "de invitado" en este proyecto.
router.use(protect);

router.get('/', getCart); // el carrito del usuario autenticado, siempre completo
router.post('/', addToCart); // agrega un producto (o suma cantidad si ya estaba)
router.put('/:productId', updateCartItem); // cambia la cantidad de un producto ya en el carrito
router.delete('/clear', clearCart); // antes de '/:productId' para que Express no lea "clear" como un id
router.delete('/:productId', removeCartItem);

module.exports = router;
