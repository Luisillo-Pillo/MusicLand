const express = require('express');
const { protect, adminOnly } = require('../middleware/auth');
const {
  createOrder,
  getMyOrders,
  getOrdersByUser,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  requestReturn,
  getReturnRequests,
  updateReturnRequestStatus,
  deleteReturnRequest,
  deleteOrder
} = require('../controllers/orderController');

const router = express.Router();

// Todo pedido requiere sesión: no hay compra como invitado en este proyecto.
router.use(protect);

router.post('/', createOrder); // crea el pedido (carrito completo, o un solo producto vía "Comprar ahora")
router.get('/', getMyOrders); // pedidos del usuario autenticado, no de nadie más

// Las rutas con prefijo fijo van antes de '/:id' para que Express no las capture como un id.
router.get('/all', adminOnly, getAllOrders);
router.get('/returns', adminOnly, getReturnRequests);
router.get('/user/:userId', adminOnly, getOrdersByUser);

// Sin adminOnly: getOrderById valida por su cuenta que quien pide sea el
// dueño del pedido o un admin (ver el controlador).
router.get('/:id', getOrderById);
router.put('/:id/status', adminOnly, updateOrderStatus);
router.put('/:id/return-request/:requestId/status', adminOnly, updateReturnRequestStatus);
router.delete('/:id/return-request/:requestId', adminOnly, deleteReturnRequest);

// Sin adminOnly: el propio cliente puede cancelar; cancelOrder verifica la propiedad.
router.put('/:id/cancel', cancelOrder);

// Sin adminOnly: el propio cliente solicita la devolución de su pedido; requestReturn verifica la propiedad.
router.post('/:id/return-request', requestReturn);

router.delete('/:id', adminOnly, deleteOrder);

module.exports = router;
