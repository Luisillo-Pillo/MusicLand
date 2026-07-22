const User = require('../models/User');
const Order = require('../models/Order');

function getMe(req, res) {
  res.json(req.user.toSafeObject());
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    const orderCounts = await Order.aggregate([{ $group: { _id: '$user', count: { $sum: 1 } } }]);
    const countByUser = {};
    orderCounts.forEach((entry) => {
      countByUser[entry._id.toString()] = entry.count;
    });
    const usersWithStats = users.map((user) => ({
      ...user.toSafeObject(),
      totalPurchases: countByUser[user._id.toString()] || 0
    }));
    res.json(usersWithStats);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
}

async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    const totalPurchases = await Order.countDocuments({ user: user._id });
    res.json({ ...user.toSafeObject(), totalPurchases });
  } catch (error) {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
}

async function deleteUser(req, res) {
  try {
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: 'No puedes borrar tu propia cuenta' });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
  }
}

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
    res.status(500).json({ message: 'Error al actualizar el rol', error: error.message });
  }
}

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
    res.status(500).json({ message: 'Error al actualizar el perfil', error: error.message });
  }
}

// Direcciones
async function addAddress(req, res) {
  const user = await User.findById(req.user._id);
  if (req.body.isDefault) {
    user.addresses.forEach((a) => {
      a.isDefault = false;
    });
  }
  user.addresses.push(req.body);
  await user.save();
  res.status(201).json(user.addresses);
}

async function updateAddress(req, res) {
  const user = await User.findById(req.user._id);
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
}

async function deleteAddress(req, res) {
  const user = await User.findById(req.user._id);
  user.addresses.pull({ _id: req.params.addressId });
  await user.save();
  res.json(user.addresses);
}

// Métodos de pago
async function addPaymentMethod(req, res) {
  const user = await User.findById(req.user._id);
  if (req.body.isDefault) {
    user.paymentMethods.forEach((p) => {
      p.isDefault = false;
    });
  }
  user.paymentMethods.push(req.body);
  await user.save();
  res.status(201).json(user.paymentMethods);
}

async function deletePaymentMethod(req, res) {
  const user = await User.findById(req.user._id);
  user.paymentMethods.pull({ _id: req.params.paymentMethodId });
  await user.save();
  res.json(user.paymentMethods);
}

module.exports = {
  getMe,
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  updateMe,
  addAddress,
  updateAddress,
  deleteAddress,
  addPaymentMethod,
  deletePaymentMethod
};
