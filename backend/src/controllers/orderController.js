const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { sendMail, escapeHtml } = require('../utils/mailer');

function generateOrderNumber() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.floor(Math.random() * 9000 + 1000);
  return `ML-${timestamp}-${random}`;
}

async function sendOrderNotification(order, user) {
  const itemsHtml = order.products
    .map(
      (item) =>
        `<li>${escapeHtml(item.name)} x${item.quantity} — $${(item.price * item.quantity).toFixed(2)}</li>`
    )
    .join('');

  const address = order.shippingAddress || {};

  await sendMail({
    subject: `Nueva compra #${order.orderNumber} - MusicLand`,
    replyTo: user.email,
    html: `
      <h2>Nueva compra realizada</h2>
      <p><strong>Pedido:</strong> ${escapeHtml(order.orderNumber)}</p>
      <p><strong>Cliente:</strong> ${escapeHtml(user.name)} (${escapeHtml(user.email)})</p>
      <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
      <p><strong>Productos:</strong></p>
      <ul>${itemsHtml}</ul>
      <p><strong>Dirección de envío:</strong><br>
        ${escapeHtml(address.fullName || '')}<br>
        ${escapeHtml(address.street || '')}<br>
        ${escapeHtml(address.city || '')}, ${escapeHtml(address.state || '')}, ${escapeHtml(address.zipCode || '')}<br>
        ${escapeHtml(address.country || '')}
      </p>
      <p><strong>Fecha:</strong> ${new Date(order.createdAt).toLocaleString('es-MX')}</p>
    `
  });
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

    try {
      await sendOrderNotification(order, user);
    } catch (mailError) {
      console.error('Error al enviar el correo de notificación de compra:', mailError.message);
    }

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
