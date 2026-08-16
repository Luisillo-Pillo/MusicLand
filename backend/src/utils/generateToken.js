const jwt = require('jsonwebtoken');

// Firma el JWT que el cliente guarda tras registrarse/iniciar sesión. Solo
// lleva el id y el rol (nada de contraseña ni datos personales): es lo mínimo
// que el middleware `protect` necesita para volver a cargar al usuario y
// decidir si una ruta admin-only le está permitida.
function generateToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '30d' }
  );
}

module.exports = generateToken;
