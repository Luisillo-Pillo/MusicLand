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
  deleteOrder
} = require('../controllers/orderController');

const router = express.Router();

router.use(protect);

router.post('/', createOrder);
router.get('/', getMyOrders);

// Las rutas con prefijo fijo van antes de '/:id' para que Express no las capture como un id.
router.get('/all', adminOnly, getAllOrders);
router.get('/user/:userId', adminOnly, getOrdersByUser);

router.get('/:id', getOrderById);
router.put('/:id/status', adminOnly, updateOrderStatus);

// Sin adminOnly: el propio cliente puede cancelar; cancelOrder verifica la propiedad.
router.put('/:id/cancel', cancelOrder);

router.delete('/:id', adminOnly, deleteOrder);

module.exports = router;
