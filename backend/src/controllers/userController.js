const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { sendMail, escapeHtml } = require('../utils/mailer');
const handleError = require('../utils/handleError');

const ORDER_FINAL_STATUSES = ['entregado', 'cancelado'];

// Cancela los pedidos que sigan activos de un usuario y devuelve su stock al
// inventario. Se usa antes de borrar la cuenta: si no, esos pedidos quedarían
// huérfanos (apuntando a un usuario que ya no existe) sin haber cerrado su
// ciclo ni liberado las unidades que tenían reservadas.
async function cancelUserOrders(userId) {
  const activeOrders = await Order.find({ user: userId, status: { $nin: ORDER_FINAL_STATUSES } });

  for (const order of activeOrders) {
    for (const item of order.products) {
      if (!item.product) continue;
      try {
        await Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity } });
      } catch (restoreError) {
        console.error(
          `No se pudo devolver el stock del producto ${item.product} al cancelar el pedido ${order.orderNumber}:`,
          restoreError
        );
      }
    }
    order.status = 'cancelado';
    order.cancelledAt = new Date();
    order.cancelledBy = 'admin';
    order.cancellationReason = 'Cancelado automáticamente: la cuenta del cliente fue eliminada';
    await order.save();
  }
}

// req.user ya lo cargó el middleware `protect` con el token; no hace falta
// otra consulta a la base de datos, solo devolverlo sin la contraseña.
function getMe(req, res) {
  res.json(req.user.toSafeObject());
}

// Listado para /admin/usuarios. El conteo de compras de cada usuario se
// calcula con UNA sola agregación sobre toda la colección Order (agrupa por
// usuario y cuenta), en vez de una consulta countDocuments por usuario en un
// bucle — evita mandar N+1 consultas a Mongo cuando hay N usuarios.
async function getAllUsers(req, res) {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    const orderCounts = await Order.aggregate([{ $group: { _id: '$user', count: { $sum: 1 } } }]);
    // countByUser: mapa "id de usuario" -> "cuántos pedidos tiene", armado a
    // partir del resultado de la agregación para poder consultarlo O(1) por
    // usuario al construir la respuesta de abajo.
    const countByUser = {};
    orderCounts.forEach((entry) => {
      countByUser[entry._id.toString()] = entry.count;
    });
    const usersWithStats = users.map((user) => ({
      ...user.toAdminObject(),
      totalPurchases: countByUser[user._id.toString()] || 0
    }));
    res.json(usersWithStats);
  } catch (error) {
    handleError(res, error, 'No pudimos cargar los usuarios');
  }
}

async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    const totalPurchases = await Order.countDocuments({ user: user._id });
    res.json({ ...user.toAdminObject(), totalPurchases });
  } catch (error) {
    // handleError ya traduce un id con formato inválido (CastError) a un 400
    // amigable y, de paso, registra en el servidor cualquier otro error real
    // (antes se devolvía "Usuario no encontrado" para todo, incluso una caída
    // de la base de datos, sin dejar rastro para depurarlo después).
    handleError(res, error, 'No pudimos cargar este usuario');
  }
}

async function deleteUser(req, res) {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: 'No puedes borrar tu propia cuenta' });
    }
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    // No bloquea el borrado si falla: la cuenta ya se decidió eliminar, así que
    // solo se registra el error para revisar el inventario manualmente después.
    try {
      await cancelUserOrders(user._id);
    } catch (cancelError) {
      console.error(`No se pudieron cancelar los pedidos activos del usuario ${user._id}:`, cancelError);
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    handleError(res, error, 'No pudimos eliminar este usuario');
  }
}

// Solo dos roles existen: 'user' y 'admin'. La segunda validación evita que
// un admin se quite a sí mismo el rol (podría dejar la tienda sin ningún
// administrador con acceso si era el único) — a otro admin sí se le puede quitar.
async function updateUserRole(req, res) {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Rol inválido' });
    }
    if (req.params.id === req.user._id.toString() && role !== 'admin') {
      return res.status(400).json({ message: 'No puedes quitarte tu propio rol de administrador' });
    }
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user.toSafeObject());
  } catch (error) {
    handleError(res, error, 'No pudimos actualizar el rol del usuario');
  }
}

// Correo directo de un admin a un cliente puntual (botón "Contactar" en
// AdminUserProfile). replyTo es el correo del ADMIN que escribe, no el de la
// tienda: si el cliente responde el correo, le llega directo a quien se lo
// mandó, no a la bandeja general de MusicLand.
async function contactUser(req, res) {
  try {
    const { subject, message } = req.body;
    if (!subject || !subject.trim() || !message || !message.trim()) {
      return res.status(400).json({ message: 'El asunto y el mensaje son obligatorios' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const sent = await sendMail({
      to: user.email,
      subject: subject.trim(),
      replyTo: req.user.email,
      html: `
        <p>Hola ${escapeHtml(user.name)},</p>
        <p>${escapeHtml(message.trim()).replace(/\n/g, '<br>')}</p>
        <p>— Equipo MusicLand</p>
      `
    });

    if (!sent) {
      return res.status(503).json({
        message: 'El servicio de correo no está configurado (SMTP_USER/SMTP_PASS); el mensaje no se envió'
      });
    }

    res.json({ message: `Mensaje enviado a ${user.email}` });
  } catch (error) {
    handleError(res, error, 'No pudimos enviar tu mensaje');
  }
}

// El propio usuario edita su nombre/teléfono/contraseña. Cada campo es
// opcional y solo se toca si vino en el body (`if (name) ...`), así que se
// puede mandar solo el que cambió sin arrastrar los demás como vacíos; el
// hash de la contraseña nueva lo hace el pre('save') del modelo, no aquí.
async function updateMe(req, res) {
  try {
    const { name, phone, password } = req.body;
    if (phone && !/^\d{10}$/.test(phone)) {
      return res.status(400).json({ message: 'El teléfono debe tener exactamente 10 dígitos' });
    }
    const user = await User.findById(req.user._id);
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (password) user.password = password;
    await user.save();
    res.json(user.toSafeObject());
  } catch (error) {
    handleError(res, error, 'No pudimos actualizar tu perfil');
  }
}

// Direcciones y métodos de pago comparten el mismo patrón "solo uno puede ser
// el predeterminado": al agregar o editar uno marcándolo isDefault, primero
// se le quita esa marca a todos los demás del arreglo antes de guardar —
// nunca se valida esto a nivel de schema, se aplica aquí en cada operación.

async function addAddress(req, res) {
  try {
    const user = await User.findById(req.user._id);
    if (req.body.isDefault) {
      user.addresses.forEach((a) => {
        a.isDefault = false;
      });
    }
    user.addresses.push(req.body);
    await user.save();
    res.status(201).json(user.addresses);
  } catch (error) {
    handleError(res, error, 'No pudimos guardar la dirección');
  }
}

async function updateAddress(req, res) {
  try {
    const user = await User.findById(req.user._id);
    // .id() es el método que da Mongoose para buscar un subdocumento de un
    // arreglo por su _id (las direcciones no tienen su propio modelo/colección).
    const address = user.addresses.id(req.params.addressId);
    if (!address) return res.status(404).json({ message: 'Dirección no encontrada' });
    if (req.body.isDefault) {
      user.addresses.forEach((a) => {
        a.isDefault = false;
      });
    }
    Object.assign(address, req.body);
    await user.save();
    res.json(user.addresses);
  } catch (error) {
    handleError(res, error, 'No pudimos actualizar la dirección');
  }
}

async function deleteAddress(req, res) {
  try {
    const user = await User.findById(req.user._id);
    // .pull() quita el subdocumento con ese _id del arreglo; si no existe,
    // no hace nada (no es un error) — de ahí que no haya un chequeo de "no
    // encontrada" aquí como sí lo hay en updateAddress.
    user.addresses.pull({ _id: req.params.addressId });
    await user.save();
    res.json(user.addresses);
  } catch (error) {
    handleError(res, error, 'No pudimos eliminar la dirección');
  }
}

async function addPaymentMethod(req, res) {
  try {
    const user = await User.findById(req.user._id);
    if (req.body.isDefault) {
      user.paymentMethods.forEach((p) => {
        p.isDefault = false;
      });
    }
    user.paymentMethods.push(req.body);
    await user.save();
    res.status(201).json(user.paymentMethods);
  } catch (error) {
    handleError(res, error, 'No pudimos guardar el método de pago');
  }
}

async function updatePaymentMethod(req, res) {
  try {
    const user = await User.findById(req.user._id);
    const method = user.paymentMethods.id(req.params.paymentMethodId);
    if (!method) return res.status(404).json({ message: 'Método de pago no encontrado' });
    if (req.body.isDefault) {
      user.paymentMethods.forEach((p) => {
        p.isDefault = false;
      });
    }
    Object.assign(method, req.body);
    await user.save();
    res.json(user.paymentMethods);
  } catch (error) {
    handleError(res, error, 'No pudimos actualizar el método de pago');
  }
}

async function deletePaymentMethod(req, res) {
  try {
    const user = await User.findById(req.user._id);
    user.paymentMethods.pull({ _id: req.params.paymentMethodId });
    await user.save();
    res.json(user.paymentMethods);
  } catch (error) {
    handleError(res, error, 'No pudimos eliminar el método de pago');
  }
}

module.exports = {
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
};
