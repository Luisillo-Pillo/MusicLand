const User = require('../models/User');

function getMe(req, res) {
  res.json(req.user.toSafeObject());
}

async function updateMe(req, res) {
  try {
    const { name, profilePhoto, password } = req.body;
    const user = await User.findById(req.user._id);
    if (name) user.name = name;
    if (profilePhoto) user.profilePhoto = profilePhoto;
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
  updateMe,
  addAddress,
  updateAddress,
  deleteAddress,
  addPaymentMethod,
  deletePaymentMethod
};
