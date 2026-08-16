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

const RETURN_REQUEST_STATUSES = ['pendiente', 'aprobada', 'rechazada'];

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

// Confirmación al cliente: a diferencia de sendOrderNotification (que avisa a
// la tienda), esta es la que recibe quien compró — "gracias por tu compra"
// con el detalle del pedido. Sale del mismo correo de MusicLand (SMTP_USER).
async function sendCustomerOrderConfirmation(order, user) {
  const itemsHtml = order.products
    .map(
      (item) =>
        `<li>${escapeHtml(item.name)} x${item.quantity} — $${(item.price * item.quantity).toFixed(2)}</li>`
    )
    .join('');

  const address = order.shippingAddress || {};

  await sendMail({
    to: user.email,
    subject: `¡Gracias por tu compra! Pedido #${order.orderNumber} - MusicLand`,
    html: `
      <p>Hola ${escapeHtml(user.name)},</p>
      <p>¡Gracias por tu compra! Ya recibimos tu pedido <strong>#${escapeHtml(order.orderNumber)}</strong> y lo estamos preparando.</p>
      <p><strong>Productos:</strong></p>
      <ul>${itemsHtml}</ul>
      <p><strong>Total:</strong> $${order.total.toFixed(2)}</p>
      <p><strong>Dirección de envío:</strong><br>
        ${escapeHtml(address.fullName || '')}<br>
        ${escapeHtml(address.street || '')}<br>
        ${escapeHtml(address.city || '')}, ${escapeHtml(address.state || '')}, ${escapeHtml(address.zipCode || '')}<br>
        ${escapeHtml(address.country || '')}
      </p>
      ${
        order.paymentMethod?.last4
          ? `<p><strong>Método de pago:</strong> ${escapeHtml(order.paymentMethod.brand || '')} •••• ${escapeHtml(order.paymentMethod.last4)}</p>`
          : ''
      }
      <p><strong>Fecha:</strong> ${new Date(order.createdAt).toLocaleString('es-MX')}</p>
      <p>Puedes revisar el estatus de tu pedido cuando quieras desde tu cuenta, en "Historial de compras".</p>
      <p>Si tienes cualquier duda, responde a este correo y con gusto te atendemos.</p>
      <p>— Equipo MusicLand</p>
    `
  });
}

async function createOrder(req, res) {
  // Se declara fuera del try para que el catch general también pueda devolver el
  // stock si el fallo ocurre a mitad del bucle de descuento.
  const decremented = [];

  try {
    const { shippingAddress, paymentMethod, items } = req.body;
    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({ message: 'Dirección de envío y método de pago son obligatorios' });
    }

    // 'items' es el atajo de "Comprar ahora" desde el detalle de un producto:
    // compra solo esos productos puntuales sin tocar el carrito guardado del
    // usuario. Sin 'items', se compra el carrito completo como siempre.
    const isDirectPurchase = Array.isArray(items) && items.length > 0;

    let user;
    let sourceItems;

    if (isDirectPurchase) {
      const productIds = items.map((i) => i?.productId).filter(Boolean);
      if (productIds.length !== items.length) {
        return res.status(400).json({ message: 'Selección de productos inválida' });
      }
      const products = await Product.find({ _id: { $in: productIds } });
      const productsById = new Map(products.map((p) => [p._id.toString(), p]));
      sourceItems = items.map((i) => ({
        product: productsById.get(i.productId?.toString()),
        quantity: Number(i.quantity)
      }));
      if (sourceItems.some((i) => !i.product || !Number.isInteger(i.quantity) || i.quantity < 1)) {
        return res.status(400).json({ message: 'Uno de los productos seleccionados ya no está disponible' });
      }
      // req.user ya es el documento completo (lo carga el middleware protect),
      // no hace falta otra consulta ni popular el carrito.
      user = req.user;
    } else {
      user = await User.findById(req.user._id).populate('cart.product');
      if (!user.cart.length) {
        return res.status(400).json({ message: 'El carrito está vacío' });
      }
      sourceItems = user.cart;
    }

    const orderProducts = [];
    let total = 0;
    let insufficientStockProduct = null;

    for (const item of sourceItems) {
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

      // El precio que se cobra es el de `updated` (el documento recién leído
      // al descontar el stock), no el de `product` (que pudo cargarse antes,
      // p. ej. desde el carrito hace rato): así, si una oferta cambió o
      // terminó entre que el cliente vio el producto y confirmó la compra,
      // se cobra el precio real vigente en este instante, no uno obsoleto.
      const sellingPrice = updated.getSellingPrice();

      decremented.push({ productId: product._id, quantity: item.quantity });
      orderProducts.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: sellingPrice,
        quantity: item.quantity
      });
      total += sellingPrice * item.quantity;
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
      return handleError(res, orderError, 'No pudimos registrar tu compra');
    }

    // El pedido ya está confirmado: el descuento de stock es definitivo y no debe
    // revertirse aunque falle algo de lo que viene después.
    decremented.length = 0;

    // "Comprar ahora" no toca el carrito: lo que el usuario ya tenía guardado
    // ahí se queda exactamente igual.
    if (!isDirectPurchase) {
      try {
        user.cart = [];
        await user.save();
      } catch (cartError) {
        // El pedido ya existe y es válido; vaciar el carrito es secundario y se puede
        // reintentar después, así que no se cancela la compra ni se devuelve el stock.
        console.error('El pedido se creó pero no se pudo vaciar el carrito:', cartError);
      }
    }

    try {
      await sendOrderNotification(order, user);
    } catch (mailError) {
      console.error('Error al enviar el correo de notificación de compra:', mailError.message);
    }

    try {
      await sendCustomerOrderConfirmation(order, user);
    } catch (mailError) {
      console.error('Error al enviar el correo de confirmación al cliente:', mailError.message);
    }

    res.status(201).json(order);
  } catch (error) {
    await restoreStock(decremented);
    handleError(res, error, 'No pudimos procesar tu compra');
  }
}

// Historial de compras del usuario autenticado (OrderHistory.jsx). El
// desempate por _id en el sort, igual que en getProducts, garantiza un orden
// total y estable — dos pedidos nunca comparten exactamente el mismo createdAt.
async function getMyOrders(req, res) {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1, _id: -1 });
    res.json(orders);
  } catch (error) {
    handleError(res, error, 'No pudimos cargar tus pedidos');
  }
}

// Misma consulta que getMyOrders pero para un usuario cualquiera (por su id
// en la URL) — usada por el admin desde AdminUserOrders. La ruta la protege
// adminOnly, así que aquí no hace falta verificar quién pregunta.
async function getOrdersByUser(req, res) {
  try {
    const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1, _id: -1 });
    res.json(orders);
  } catch (error) {
    handleError(res, error, 'No pudimos cargar los pedidos de este cliente');
  }
}

// Todos los pedidos de la tienda (AdminOrders.jsx), opcionalmente filtrados
// por estatus. populate('user', 'name email') trae solo esos dos campos del
// cliente (no toda la cuenta) para no arrastrar direcciones/pagos/carrito de
// cada uno en una lista que puede tener cientos de pedidos.
async function getAllOrders(req, res) {
  try {
    const { status } = req.query;
    // Un valor de `status` que no exista en ORDER_STATUSES se ignora en vez
    // de dar error: equivale a "sin filtro" (todos los pedidos).
    const filter = status && ORDER_STATUSES.includes(status) ? { status } : {};
    const orders = await Order.find(filter)
      .sort({ createdAt: -1, _id: -1 })
      .populate('user', 'name email');
    res.json(orders);
  } catch (error) {
    handleError(res, error, 'No pudimos cargar los pedidos');
  }
}

// Cambia el estatus de un pedido (panel de admin). 'cancelado' está excluido
// a propósito de este endpoint genérico — ver ASSIGNABLE_STATUSES arriba — y
// se redirige al flujo de cancelOrder, que además devuelve el stock.
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

    // Se registra la fecha (sin hora) en que el pedido pasó a "entregado": es la
    // base de la ventana de 15 días para solicitar una devolución. No se
    // vuelve a tocar si ya estaba puesta (aunque, al ser 'entregado' un estatus
    // final, no debería poder llegar aquí dos veces para el mismo pedido).
    const update = { status };
    if (status === 'entregado' && !current.deliveredAt) {
      const now = new Date();
      update.deliveredAt = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    const order = await Order.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true
    }).populate('user', 'name email');

    res.json(order);
  } catch (error) {
    handleError(res, error, 'No pudimos actualizar el estado del pedido');
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
    if (!reason) {
      return res.status(400).json({ message: 'Cuéntanos el motivo de la cancelación' });
    }
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
    handleError(res, error, 'No pudimos cancelar el pedido');
  }
}

// Aviso a la tienda: a diferencia de cancelar, una devolución no cambia nada
// del pedido por sí sola, solo abre el caso para que alguien lo revise.
async function notifyStoreOfReturnRequest(order, user, items, isFullOrder, reason) {
  const itemsHtml = items.map((i) => `<li>${escapeHtml(i.name)} x${i.quantity}</li>`).join('');

  await sendMail({
    subject: `Solicitud de devolución - Pedido #${order.orderNumber} - MusicLand`,
    replyTo: user?.email,
    html: `
      <h2>Nueva solicitud de devolución</h2>
      <p><strong>Pedido:</strong> ${escapeHtml(order.orderNumber)}</p>
      <p><strong>Cliente:</strong> ${escapeHtml(user?.name || 'Cuenta eliminada')} (${escapeHtml(user?.email || 'sin correo')})</p>
      <p><strong>Alcance:</strong> ${isFullOrder ? 'Pedido completo' : 'Productos específicos del pedido'}</p>
      <p><strong>Productos a devolver:</strong></p>
      <ul>${itemsHtml}</ul>
      <p><strong>Motivo:</strong></p>
      <blockquote style="margin:0;padding-left:12px;border-left:3px solid #6d28d9;color:#555;">
        ${escapeHtml(reason).replace(/\n/g, '<br>')}
      </blockquote>
    `
  });
}

async function requestReturn(req, res) {
  try {
    const { items, fullOrder, reason } = req.body;

    const trimmedReason = typeof reason === 'string' ? reason.trim() : '';
    if (!trimmedReason) {
      return res.status(400).json({ message: 'Cuéntanos el motivo de la devolución' });
    }
    if (trimmedReason.length > 1000) {
      return res.status(400).json({ message: 'El motivo no puede superar los 1000 caracteres' });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Selecciona al menos un producto para devolver' });
    }

    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });

    const isOwner = order.user && order.user._id.toString() === req.user._id.toString();
    if (!isOwner) {
      return res.status(403).json({ message: 'No tienes acceso a este pedido' });
    }

    if (order.status !== 'entregado') {
      return res.status(409).json({
        message: 'Solo puedes solicitar la devolución de un pedido que ya fue entregado'
      });
    }

    // La ventana de devolución son 15 días naturales desde que el pedido se
    // marcó como entregado (deliveredAt, sin hora). Pasado ese plazo la
    // opción desaparece aunque nunca se haya solicitado una devolución.
    if (order.deliveredAt) {
      const deadline = new Date(order.deliveredAt);
      deadline.setDate(deadline.getDate() + 15);
      if (Date.now() > deadline.getTime()) {
        return res.status(409).json({
          message: 'El plazo de 15 días para solicitar una devolución de este pedido ya venció'
        });
      }
    }

    // Un producto que ya apareció en cualquier solicitud anterior (sin importar
    // su estatus: pendiente, aprobada o rechazada) no puede volver a solicitarse.
    const alreadyRequested = new Set(
      order.returnRequests.flatMap((r) => r.items.map((i) => i.product?.toString()).filter(Boolean))
    );

    // Cada producto solicitado debe pertenecer al pedido: si no, alguien podría
    // "devolver" algo que nunca compró aquí. La cantidad es la que se compró de
    // ese producto, no una cantidad parcial elegida aparte.
    const orderedByProduct = new Map(
      order.products.filter((p) => p.product).map((p) => [p.product.toString(), p])
    );
    const returnItems = [];
    for (const item of items) {
      const productId = item?.productId;
      const key = productId && productId.toString();
      const original = key && orderedByProduct.get(key);
      if (!original) {
        return res.status(400).json({ message: 'Uno de los productos seleccionados no pertenece a este pedido' });
      }
      if (alreadyRequested.has(key)) {
        return res.status(409).json({
          message: `Ya se solicitó la devolución de "${original.name}" anteriormente`
        });
      }
      returnItems.push({ product: original.product, name: original.name, quantity: original.quantity });
    }

    // "Pedido completo" ahora significa "todo lo que aún quedaba disponible para
    // devolver", no todo el pedido original (una parte pudo devolverse antes).
    const stillReturnable = order.products.filter(
      (p) => p.product && !alreadyRequested.has(p.product.toString())
    );
    const isFullOrder = !!fullOrder || returnItems.length === stillReturnable.length;

    order.returnRequests.push({
      items: returnItems,
      fullOrder: isFullOrder,
      reason: trimmedReason,
      status: 'pendiente',
      requestedAt: new Date()
    });
    await order.save();

    // El correo es un aviso, no parte de la solicitud: si falla, la solicitud ya
    // quedó registrada en el pedido, así que solo se anota el error.
    try {
      await notifyStoreOfReturnRequest(order, order.user, returnItems, isFullOrder, trimmedReason);
    } catch (mailError) {
      console.error('Error al enviar el aviso de solicitud de devolución:', mailError.message);
    }

    res.status(201).json(order);
  } catch (error) {
    handleError(res, error, 'No pudimos enviar tu solicitud de devolución');
  }
}

// Todos los pedidos con al menos una solicitud de devolución. Un pedido puede
// traer varias (una por cada tanda de productos solicitada); el front las
// separa en filas individuales y aplica el filtro por estatus sobre cada una.
async function getReturnRequests(req, res) {
  try {
    const orders = await Order.find({ 'returnRequests.0': { $exists: true } })
      .sort({ createdAt: -1 })
      .populate('user', 'name email');
    res.json(orders);
  } catch (error) {
    handleError(res, error, 'No pudimos cargar las solicitudes de devolución');
  }
}

// Aviso al cliente: se manda solo cuando el admin resuelve la solicitud
// (aprobada/rechazada), nunca al dejarla en 'pendiente' — ver el `if` en
// updateReturnRequestStatus más abajo, que es quien decide cuándo llamar a esta función.
async function notifyCustomerOfReturnStatus(order, user, status) {
  const approved = status === 'aprobada';
  await sendMail({
    to: user.email,
    subject: `Tu solicitud de devolución del pedido #${order.orderNumber} fue ${approved ? 'aprobada' : 'rechazada'} - MusicLand`,
    html: `
      <p>Hola ${escapeHtml(user.name)},</p>
      <p>Tu solicitud de devolución del pedido <strong>#${escapeHtml(order.orderNumber)}</strong> fue
        <strong>${approved ? 'aprobada' : 'rechazada'}</strong>.</p>
      ${
        approved
          ? '<p>Nos pondremos en contacto contigo para coordinar la recolección o el punto de entrega, y procesaremos el reembolso a tu método de pago original en un plazo de 5 a 10 días hábiles.</p>'
          : '<p>Si tienes dudas sobre esta decisión, responde a este correo y con gusto te explicamos los detalles.</p>'
      }
      <p>— Equipo MusicLand</p>
    `
  });
}

// El admin aprueba o rechaza una solicitud puntual (una entre varias que un
// mismo pedido puede tener, cada una con su propio _id — ver returnRequestSchema
// en Order.js). Aprobar/rechazar NO mueve stock ni cambia el estatus del
// pedido en sí: solo actualiza esta solicitud y avisa al cliente por correo.
async function updateReturnRequestStatus(req, res) {
  try {
    const { status } = req.body;
    if (!RETURN_REQUEST_STATUSES.includes(status)) {
      return res.status(400).json({
        message: `Estado inválido. Debe ser uno de: ${RETURN_REQUEST_STATUSES.join(', ')}`
      });
    }

    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });

    // .id() busca el subdocumento de returnRequests con ese _id (llega en la
    // URL como :requestId, distinto del :id del pedido).
    const request = order.returnRequests.id(req.params.requestId);
    if (!request) {
      return res.status(404).json({ message: 'Esta solicitud de devolución no existe' });
    }

    request.status = status;
    await order.save();

    // El correo es un aviso, no parte del cambio: si falla, el estatus ya quedó
    // actualizado, así que solo se registra el error. Esto es lo que hace que el
    // cliente vea la devolución como aprobada/rechazada desde su historial: el
    // estatus vive en el propio pedido que ya trae de vuelta getMyOrders.
    try {
      if (order.user?.email && status !== 'pendiente') {
        await notifyCustomerOfReturnStatus(order, order.user, status);
      }
    } catch (mailError) {
      console.error('Error al enviar el aviso de estatus de la devolución:', mailError.message);
    }

    res.json(order);
  } catch (error) {
    handleError(res, error, 'No pudimos actualizar el estado de la devolución');
  }
}

// Borra solo la solicitud puntual (el pedido y las demás solicitudes se
// conservan): libera esos productos, que vuelven a quedar disponibles para
// una nueva solicitud al no haber ya registro de ellos en returnRequests.
async function deleteReturnRequest(req, res) {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Pedido no encontrado' });

    const request = order.returnRequests.id(req.params.requestId);
    if (!request) {
      return res.status(404).json({ message: 'Esta solicitud de devolución no existe' });
    }

    order.returnRequests.pull(req.params.requestId);
    await order.save();

    res.json({ message: 'Solicitud de devolución eliminada' });
  } catch (error) {
    handleError(res, error, 'No pudimos eliminar la solicitud de devolución');
  }
}

// Detalle de un pedido puntual: lo usan tanto el cliente (OrderHistory "Ver
// detalles") como el admin (AdminOrderDetail), así que la ruta no lleva
// adminOnly — el control de acceso se hace aquí abajo, comparando dueño vs.
// solicitante en vez de a nivel de middleware.
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
    handleError(res, error, 'No pudimos cargar este pedido');
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
    handleError(res, error, 'No pudimos eliminar el pedido');
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
  requestReturn,
  getReturnRequests,
  updateReturnRequestStatus,
  deleteReturnRequest,
  deleteOrder
};
