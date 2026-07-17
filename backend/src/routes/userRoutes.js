const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getMe,
  updateMe,
  addAddress,
  updateAddress,
  deleteAddress,
  addPaymentMethod,
  deletePaymentMethod
} = require('../controllers/userController');

const router = express.Router();

router.use(protect);

router.get('/me', getMe);
router.put('/me', updateMe);

router.post('/me/addresses', addAddress);
router.put('/me/addresses/:addressId', updateAddress);
router.delete('/me/addresses/:addressId', deleteAddress);

router.post('/me/payment-methods', addPaymentMethod);
router.delete('/me/payment-methods/:paymentMethodId', deletePaymentMethod);

module.exports = router;
