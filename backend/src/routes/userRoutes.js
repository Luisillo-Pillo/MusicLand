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

router.get('/', adminOnly, getAllUsers);

router.get('/me', getMe);
router.put('/me', updateMe);

router.post('/me/addresses', addAddress);
router.put('/me/addresses/:addressId', updateAddress);
router.delete('/me/addresses/:addressId', deleteAddress);

router.post('/me/payment-methods', addPaymentMethod);
router.put('/me/payment-methods/:paymentMethodId', updatePaymentMethod);
router.delete('/me/payment-methods/:paymentMethodId', deletePaymentMethod);

router.get('/:id', adminOnly, getUserById);
router.put('/:id/role', adminOnly, updateUserRole);
router.post('/:id/contact', adminOnly, contactUser);
router.delete('/:id', adminOnly, deleteUser);

module.exports = router;
