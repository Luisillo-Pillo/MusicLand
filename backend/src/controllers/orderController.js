const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

function generateOrderNumber() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.floor(Math.random() * 9000 + 1000);
  return `ML-${timestamp}-${random}`;
}

async function createOrder(req, res) {
  try {
    const { shippingAddress, paymentMethod } = req.body;
    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({ message: 'Dirección de envío y método de pago son obligatorios' });
    }

    const user = await User.findById(req.user._id).populate('cart.product');
    if (!user.cart.length) {
      return res.status(400).json({ message: 'El carrito está vacío' });
    }

    const orderProducts = [];
    let total = 0;

    for (const item of user.cart) {
      const product = item.product;
      if (!product) continue;
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Stock insuficiente para ${product.name}` });
      }
      orderProducts.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: item.quantity
      });
      total += product.price * item.quantity;
    }

    for (const item of user.cart) {
      await Product.findByIdAndUpdate(item.product._id, { $inc: { stock: -item.quantity } });
    }

    const order = await Order.create({
      orderNumber: generateOrderNumber(),
      user: user._id,
      products: orderProducts,
      total,
      shippingAddress,
      paymentMethod
    });

    user.cart = [];
    await user.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error al procesar la compra', error: error.message });
  }
}

async function getMyOrders(req, res) {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener pedidos', error: error.message });
  }
}

async function getOrderById(req, res) {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'No tienes acceso a este pedido' });
    }
    res.json(order);
  } catch (error) {
    res.status(404).json({ message: 'Pedido no encontrado' });
  }
}

module.exports = { createOrder, getMyOrders, getOrderById };
