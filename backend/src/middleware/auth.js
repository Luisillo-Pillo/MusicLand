const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Exige un JWT válido en el header Authorization y carga el usuario completo
// en req.user para que el resto de la cadena (controlador, adminOnly) lo use
// sin volver a consultar la base de datos.
async function protect(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No autorizado, falta el token' });
    }
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'No autorizado, usuario no encontrado' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'No autorizado, token inválido o expirado' });
  }
}

// Se coloca después de `protect` en la cadena de middlewares: asume que
// req.user ya existe y solo verifica el rol.
function adminOnly(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Acceso restringido a administradores' });
}

module.exports = { protect, adminOnly };
