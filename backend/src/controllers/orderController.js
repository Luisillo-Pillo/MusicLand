const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { sendMail, escapeHtml } = require('../utils/mailer');
const handleError = require('../utils/handleError');

const ORDER_STATUSES = ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'];

// 'cancelado' se excluye del cambio de estatus genérico: cancelar devuelve stock al
// inventario, así que tiene que pasar por cancelOrder y no por una simple asignación.
const ASSIGNABLE_STATUSES = ORDER_STATUSES.filter((s) => s !== 'cancelado');

// Un cliente solo puede cancelar mientras el pedido no haya salido del almacén.
const CLIENT_CANCELABLE = ['pendiente', 'procesando'];

// Un pedido entregado o cancelado ya cerró su ciclo: su estatus queda congelado.
const FINAL_STATUSES = ['entregado', 'cancelado'];

// Devuelve al inventario las unidades ya descontadas cuando la compra no llega a completarse.
async function restoreStock(decremented) {
  for (const item of decremented) {
    try {
      await Product.findByIdAndUpdate(item.productId, { $inc: { stock: item.quantity } });
    } catch (restoreError) {
      console.error(
        `No se pudo devolver el stock del producto ${item.productId} (${item.quantity} unidades):`,
        restoreError
      );
    }
  }
}

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
  // Se declara fuera del try para que el catch general también pueda devolver el
  // stock si el fallo ocurre a mitad del bucle de descuento.
  const decremented = [];

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
    let insufficientStockProduct = null;

    for (const item of user.cart) {
      const product = item.product;
      if (!product) continue;

      const updated = await Product.findOneAndUpdate(
        { _id: product._id, stock: { $gte: item.quantity } },
        { $inc: { stock: -item.quantity } },
        { new: true }
      );

      if (!updated) {
        insufficientStockProduct = product.name;
        break;
      }

      decremented.push({ productId: product._id, quantity: item.quantity });
      orderProducts.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: item.quantity
      });
      total += product.price * item.quantity;
    }

    if (insufficientStockProduct) {
      await restoreStock(decremented);
      return res.status(400).json({ message: `Stock insuficiente para ${insufficientStockProduct}` });
    }

    // A partir de aquí el stock ya está descontado: cualquier fallo debe devolverlo
    // al inventario o las unidades se perderían de forma permanente.
    let order;
    try {
      order = await Order.create({
        orderNumber: generateOrderNumber(),
        user: user._id,
        products: orderProducts,
        total,
        shippingAddress,
        paymentMethod
      });
    } catch (orderError) {
      await restoreStock(decremented);
      return handleError(res, orderError, 'Error al registrar la compra');
    }

    // El pedido ya está confirmado: el descuento de stock es definitivo y no debe
    // revertirse aunque falle algo de lo que viene después.
    decremented.length = 0;

    try {
      user.cart = [];
      await user.save();
    } catch (cartError) {
      // El pedido ya existe y es válido; vaciar el carrito es secundario y se puede
      // reintentar después, así que no se cancela la compra ni se devuelve el stock.
      console.error('El pedido se creó pero no se pudo vaciar el carrito:', cartError);
    }

    try {
      await sendOrderNotification(order, user);
    } catch (mailError) {
      console.error('Error al enviar el correo de notificación de compra:', mailError.message);
    }

    res.status(201).json(order);
  } catch (error) {
    await restoreStock(decremented);
    handleError(res, error, 'Error al procesar la compra');
  }
}

async function getMyOrders(req, res) {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1, _id: -1 });
    res.json(orders);
  } catch (error) {
    handleError(res, error, 'Error al obtener pedidos');
  }
}

async function getOrdersByUser(req, res) {
  try {
    const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1, _id: -1 });
    res.json(orders);
  } catch (error) {
    handleError(res, error, 'Error al obtener los pedidos del usuario');
  }
}

async function getAllOrders(req, res) {
  try {
    const { status } = req.query;
    const filter = status && ORDER_STATUSES.includes(status) ? { status } : {};
    const orders = await Order.find(filter)
      .sort({ createdAt: -1, _id: -1 })
      .populate('user', 'name email');
    res.json(orders);
  } catch (error) {
    handleError(res, error, 'Error al obtener los pedidos');
  }
}

async function updateOrderStatus(req, res) {
  try {
    const { status } = req.body;

    if (status === 'cancelado') {
      return res.status(400).json({
        message: 'Para cancelar un pedido usa la acción de cancelar, que devuelve el stock al inventario'
      });
    }
    if (!ASSIGNABLE_STATUSES.includes(status)) {
      return res.status(400).json({
        message: `Estado inválido. Debe ser uno de: ${ASSIGNABLE_STATUSES.join(', ')}`
      });
    }

    const current = await Order.findById(req.params.id);
    if (!current) return res.status(404).json({ message: 'Pedido no encontrado' });

    // Reactivar un cancelado exigiría volver a descontar stock (que puede haberse
    // vendido ya), y un entregado ya cerró su ciclo: ambos quedan congelados.
    if (FINAL_STATUSES.includes(current.status)) {
      return res.status(409).json({
        message:
          current.status === 'cancelado'
            ? 'Este pedido está cancelado y su estado ya no puede modificarse'
            : 'Este pedido ya fue entregado y su estado ya no puede modificarse'
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('user', 'name email');

    res.json(order);
  } catch (error) {
    handleError(res, error, 'Error al actualizar el estado del pedido');
  }
}

function reasonBlock(reason) {
  if (!reason) return '<p><em>No se especificó un motivo.</em></p>';
  return `
    <p><strong>Motivo:</strong></p>
    <blockquote style="margin:0;padding-left:12px;border-left:3px solid #6d28d9;color:#555;">
      ${escapeHtml(reason).replace(/\n/g, '<br>')}
    </blockquote>`;
}

function orderSummaryHtml(order) {
  const items = order.products
    .map((i) => `<li>${escapeHtml(i.name)} x${i.quantity} — $${(i.price * i.quantity).toFixed(2)}</li>`)
    .join('');
  return `<ul>${items}</ul><p><strong>Total:</strong> $${order.total.toFixed(2)}</p>`;
}

// Aviso a la tienda cuando es el cliente quien cancela. Sin 'to', sendMail entrega
// en NOTIFY_EMAIL; el replyTo permite responderle al cliente directamente.
async function notifyStoreOfCancellation(order, user, reason) {
  await sendMail({
    subject: `Pedido cancelado por el cliente #${order.orderNumber} - MusicLand`,
    replyTo: user?.email,
    html: `
      <h2>Un cliente canceló su pedido</h2>
      <p><strong>Pedido:</strong> ${escapeHtml(order.orderNumber)}</p>
      <p><strong>Cliente:</strong> ${escapeHtml(user?.name || 'Cuenta eliminada')} (${escapeHtml(user?.email || 'sin correo')})</p>
      <p><strong>Fecha de cancelación:</strong> ${new Date(order.cancelledAt).toLocaleString('es-MX')}</p>
      ${reasonBlock(reason)}
      <p><strong>Productos devueltos al inventario:</strong></p>
      ${orderSummaryHtml(order)}
    `
  });
}

// Aviso al cliente cuando es la tienda quien cancela.
async function notifyCustomerOfCancellation(order, user, reason) {
  await sendMail({
    to: user.email,
    subject: `Tu pedido #${order.orderNumber} fue cancelado - MusicLand`,
    html: `
      <p>Hola ${escapeHtml(user.name)},</p>
      <p>Te informamos que tu pedido <strong>#${escapeHtml(order.orderNumber)}</strong> fue cancelado por nuestro equipo.</p>
      ${reasonBlock(reason)}
      <p><strong>Detalle del pedido:</strong></p>
      ${orderSummaryHtml(order)}
      <p>Si tienes cualquier duda, responde a este correo y con gusto te atendemos.</p>
      <p>— Equipo MusicLand</p>
    `
  });
}

async function cancelOrder(req, res) {
  try {
    const reason = typeof req.body?.reason === 'string' ? req.body.reason.trim() : '';
    if (reason.length > 1000) {
      return res.status(400).json({ message: 'El motivo no puede superar los 1000 caracteres' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });

    const isAdmin = req.user.role === 'admin';
    const isOwner = order.user && order.user.toString() === req.user._id.toString();
    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: 'No tienes acceso a este pedido' });
    }

    if (order.status === 'cancelado') {
      return res.status(409).json({ message: 'Este pedido ya está cancelado' });
    }
    if (order.status === 'entregado') {
      return res.status(409).json({
        message: 'Un pedido entregado no puede cancelarse; gestiona una devolución en su lugar'
      });
    }
    if (!isAdmin && !CLIENT_CANCELABLE.includes(order.status)) {
      return res.status(409).json({
        message: 'El pedido ya fue enviado. Contacta con la tienda para gestionar la cancelación'
      });
    }

    // El filtro por estatus hace la transición atómica: si llegan dos cancelaciones
    // a la vez, solo una obtiene el documento y solo una devuelve el stock.
    const cancelledByAdmin = isAdmin && !isOwner;

    const cancelled = await Order.findOneAndUpdate(
      { _id: order._id, status: { $ne: 'cancelado' } },
      {
        status: 'cancelado',
        cancelledAt: new Date(),
        cancelledBy: cancelledByAdmin ? 'admin' : 'cliente',
        cancellationReason: reason
      },
      { new: true }
    ).populate('user', 'name email');

    if (!cancelled) {
      return res.status(409).json({ message: 'Este pedido ya está cancelado' });
    }

    await restoreStock(
      order.products
        .filter((item) => item.product)
        .map((item) => ({ productId: item.product, quantity: item.quantity }))
    );

    // El correo es un aviso, no parte de la cancelación: si falla, el pedido ya
    // quedó cancelado y el stock devuelto, así que solo se registra el error.
    try {
      if (cancelledByAdmin) {
        if (cancelled.user?.email) {
          await notifyCustomerOfCancellation(cancelled, cancelled.user, reason);
        } else {
          console.warn(`Pedido ${cancelled.orderNumber} cancelado por admin sin cliente al que avisar.`);
        }
      } else {
        await notifyStoreOfCancellation(cancelled, cancelled.user, reason);
      }
    } catch (mailError) {
      console.error('Error al enviar el aviso de cancelación:', mailError.message);
    }

    res.json(cancelled);
  } catch (error) {
    handleError(res, error, 'Error al cancelar el pedido');
  }
}

async function getOrderById(req, res) {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email phone profilePhoto');
    if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });

    // populate deja user como documento (o null si la cuenta fue eliminada).
    const ownerId = order.user?._id ? order.user._id.toString() : null;
    if (ownerId !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'No tienes acceso a este pedido' });
    }
    res.json(order);
  } catch (error) {
    handleError(res, error, 'Error al obtener el pedido');
  }
}

async function deleteOrder(req, res) {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });

    // Borrar un pedido en curso perdería el rastro de mercancía comprometida y su
    // stock reservado; solo se eliminan los que ya cerraron su ciclo.
    if (!FINAL_STATUSES.includes(order.status)) {
      return res.status(409).json({
        message: 'Solo se pueden eliminar los pedidos entregados o cancelados'
      });
    }

    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pedido eliminado' });
  } catch (error) {
    handleError(res, error, 'Error al eliminar el pedido');
  }
}

module.exports = {
  createOrder,
  getMyOrders,
  getOrdersByUser,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  deleteOrder
};
