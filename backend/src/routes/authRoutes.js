// Rutas públicas de autenticación. authLimiter frena los intentos repetidos de
// registro/login (fuerza bruta de contraseñas, spam de cuentas) antes de que
// lleguen al controlador.
const express = require('express');
const { register, login } = require('../controllers/authController');
const { authLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);

module.exports = router;
