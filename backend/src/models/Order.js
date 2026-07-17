const mongoose = require('mongoose');

const orderProductSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [orderProductSchema],
    total: { type: Number, required: true },
    shippingAddress: {
      fullName: String,
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
      phone: String
    },
    paymentMethod: {
      brand: String,
      last4: String
    },
    status: {
      type: String,
      enum: ['pendiente', 'procesando', 'enviado', 'entregado'],
      default: 'procesando'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
