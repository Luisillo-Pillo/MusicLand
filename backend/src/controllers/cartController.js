const User = require('../models/User');
const Product = require('../models/Product');
const handleError = require('../utils/handleError');

// Carga el carrito del usuario con los datos completos de cada producto (no
// solo el id guardado). Si algún producto fue borrado del catálogo después de
// agregarse al carrito, populate() lo deja en null: se filtra aquí y se
// guarda la limpieza, así el carrito no vuelve a arrastrar esa referencia rota.
async function getPopulatedCart(userId) {
  const user = await User.findById(userId).populate('cart.product');
  const validItems = user.cart.filter((item) => item.product);
  if (validItems.length !== user.cart.length) {
    user.cart = validItems;
    await user.save();
  }
  return user.cart;
}

// Devuelve el carrito del usuario autenticado.
async function getCart(req, res) {
  try {
    const cart = await getPopulatedCart(req.user._id);
    res.json(cart);
  } catch (error) {
    handleError(res, error, 'No pudimos cargar tu carrito');
  }
}

// Acepta solo enteros positivos; devuelve null para NaN, decimales, negativos o cero.
function parseQuantity(value) {
  const n = Number(value);
  if (!Number.isInteger(n) || n < 1) return null;
  return n;
}

// Agrega un producto al carrito, o suma la cantidad si ya estaba: valida que
// la cantidad pedida (sumada a lo que ya hubiera) no exceda el stock disponible.
async function addToCart(req, res) {
  try {
    const { productId, quantity = 1 } = req.body;

    const qty = parseQuantity(quantity);
    if (qty === null) {
      return res.status(400).json({ message: 'La cantidad debe ser un número entero mayor que cero' });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    const user = await User.findById(req.user._id);
    const existing = user.cart.find((item) => item.product.toString() === productId);
    const newQuantity = existing ? existing.quantity + qty : qty;

    if (newQuantity > product.stock) {
      return res.status(400).json({
        message: `Solo quedan ${product.stock} unidades de ${product.name}${
          existing ? ` y ya tienes ${existing.quantity} en el carrito` : ''
        }`
      });
    }

    if (existing) {
      existing.quantity = newQuantity;
    } else {
      user.cart.push({ product: productId, quantity: qty });
    }
    await user.save();
    res.status(201).json(await getPopulatedCart(req.user._id));
  } catch (error) {
    handleError(res, error, 'No pudimos agregar el producto a tu carrito');
  }
}

// Cambia la cantidad de un producto ya presente en el carrito. Mandar
// cantidad 0 es la forma de quitarlo (equivale a removeCartItem).
async function updateCartItem(req, res) {
  try {
    const { quantity } = req.body;
    const n = Number(quantity);
    if (!Number.isInteger(n) || n < 0) {
      return res.status(400).json({ message: 'La cantidad debe ser un número entero no negativo' });
    }

    const user = await User.findById(req.user._id);

    if (n === 0) {
      user.cart = user.cart.filter((item) => item.product.toString() !== req.params.productId);
    } else {
      const item = user.cart.find((i) => i.product.toString() === req.params.productId);
      if (!item) return res.status(404).json({ message: 'Producto no está en el carrito' });

      const product = await Product.findById(req.params.productId);
      if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
      if (n > product.stock) {
        return res.status(400).json({ message: `Solo quedan ${product.stock} unidades de ${product.name}` });
      }

      item.quantity = n;
    }

    await user.save();
    res.json(await getPopulatedCart(req.user._id));
  } catch (error) {
    handleError(res, error, 'No pudimos actualizar tu carrito');
  }
}

// Quita por completo un producto del carrito.
async function removeCartItem(req, res) {
  try {
    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter((item) => item.product.toString() !== req.params.productId);
    await user.save();
    res.json(await getPopulatedCart(req.user._id));
  } catch (error) {
    handleError(res, error, 'No pudimos eliminar el producto');
  }
}

// Vacía el carrito completo (usado tras completar una compra, o manualmente
// desde la página de Carrito).
async function clearCart(req, res) {
  try {
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();
    res.json([]);
  } catch (error) {
    handleError(res, error, 'No pudimos vaciar tu carrito');
  }
}

module.exports = { getCart, addToCart, updateCartItem, removeCartItem, clearCart };
