const User = require('../models/User');
const Product = require('../models/Product');

async function getPopulatedCart(userId) {
  const user = await User.findById(userId).populate('cart.product');
  user.cart = user.cart.filter((item) => item.product);
  return user.cart;
}

async function getCart(req, res) {
  try {
    const cart = await getPopulatedCart(req.user._id);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el carrito', error: error.message });
  }
}

async function addToCart(req, res) {
  try {
    const { productId, quantity = 1 } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    const user = await User.findById(req.user._id);
    const existing = user.cart.find((item) => item.product.toString() === productId);
    if (existing) {
      existing.quantity += Number(quantity);
    } else {
      user.cart.push({ product: productId, quantity: Number(quantity) });
    }
    await user.save();
    res.status(201).json(await getPopulatedCart(req.user._id));
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar al carrito', error: error.message });
  }
}

async function updateCartItem(req, res) {
  try {
    const { quantity } = req.body;
    const user = await User.findById(req.user._id);
    if (Number(quantity) <= 0) {
      user.cart = user.cart.filter((item) => item.product.toString() !== req.params.productId);
    } else {
      const item = user.cart.find((i) => i.product.toString() === req.params.productId);
      if (!item) return res.status(404).json({ message: 'Producto no está en el carrito' });
      item.quantity = Number(quantity);
    }
    await user.save();
    res.json(await getPopulatedCart(req.user._id));
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el carrito', error: error.message });
  }
}

async function removeCartItem(req, res) {
  try {
    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter((item) => item.product.toString() !== req.params.productId);
    await user.save();
    res.json(await getPopulatedCart(req.user._id));
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
  }
}

async function clearCart(req, res) {
  try {
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();
    res.json([]);
  } catch (error) {
    res.status(500).json({ message: 'Error al vaciar el carrito', error: error.message });
  }
}

module.exports = { getCart, addToCart, updateCartItem, removeCartItem, clearCart };
