const express = require('express');
const { protect, adminOnly } = require('../middleware/auth');
const {
  getMe,
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  contactUser,
  updateMe,
  addAddress,
  updateAddress,
  deleteAddress,
  addPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod
} = require('../controllers/userController');

const router = express.Router();

router.use(protect);

// Listado completo de usuarios: solo admin.
router.get('/', adminOnly, getAllUsers);

// "/me/*": el propio usuario autenticado gestiona sus datos, direcciones y
// métodos de pago sin necesitar rol admin ni pasar su propio id en la URL.
router.get('/me', getMe);
router.put('/me', updateMe);

router.post('/me/addresses', addAddress);
router.put('/me/addresses/:addressId', updateAddress);
router.delete('/me/addresses/:addressId', deleteAddress);

router.post('/me/payment-methods', addPaymentMethod);
router.put('/me/payment-methods/:paymentMethodId', updatePaymentMethod);
router.delete('/me/payment-methods/:paymentMethodId', deletePaymentMethod);

// "/:id": gestión de cuentas ajenas desde el panel de administración.
router.get('/:id', adminOnly, getUserById);
router.put('/:id/role', adminOnly, updateUserRole);
router.post('/:id/contact', adminOnly, contactUser);
router.delete('/:id', adminOnly, deleteUser);

module.exports = router;
