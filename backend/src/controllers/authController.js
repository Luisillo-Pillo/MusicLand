const User = require('../models/User');
const generateToken = require('../utils/generateToken');

async function register(req, res) {
  try {
    const { name, email, password, phone, profilePhoto } = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: 'Nombre, correo, teléfono y contraseña son obligatorios' });
    }
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ message: 'El teléfono debe tener exactamente 10 dígitos' });
    }
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'Ya existe una cuenta con ese correo' });
    }
    const user = await User.create({
      name,
      email,
      password,
      phone,
      lastLogin: new Date(),
      profilePhoto:
        profilePhoto ||
        `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=6d28d9`
    });
    const token = generateToken(user);
    res.status(201).json({ token, user: user.toSafeObject() });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Correo y contraseña son obligatorios' });
    }
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    user.lastLogin = new Date();
    await user.save();
    const token = generateToken(user);
    res.json({ token, user: user.toSafeObject() });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
}

module.exports = { register, login };
