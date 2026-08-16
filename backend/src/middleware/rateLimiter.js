const rateLimit = require('express-rate-limit');

// Limita los intentos de registro/login por IP: sin esto, alguien podría
// probar contraseñas en bucle contra una cuenta (fuerza bruta) o crear
// cuentas en masa. 10 intentos cada 15 minutos es holgado para un usuario
// real que se equivoca, pero corta un ataque automatizado.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Demasiados intentos. Inténtalo de nuevo en unos minutos.' }
});

// Mismo criterio para el formulario de contacto (que no requiere sesión):
// evita que se use como vía para enviar spam masivo por correo a la tienda.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Has enviado demasiados mensajes. Inténtalo de nuevo en unos minutos.' }
});

module.exports = { authLimiter, contactLimiter };
