const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const contactRoutes = require('./routes/contactRoutes');

// La app de Express en sí (middlewares, rutas, manejo de errores), separada
// de server.js: server.js es quien conecta la base de datos y de verdad pone
// la app a escuchar en un puerto; este módulo solo la arma y la exporta, sin
// llamar a app.listen(). Así las pruebas (ver tests/) pueden montar esta
// misma app con supertest, contra una base de datos en memoria, sin abrir un
// puerto real ni depender de que el backend esté corriendo aparte.
const app = express();

// Render (y cualquier PaaS) sirve detrás de un proxy: sin esto req.ip es la IP del
// proxy y el rate limiter agruparía a todos los usuarios en un mismo cubo.
app.set('trust proxy', 1);

const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim());

app.use(helmet());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'MusicLand API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);

// Cualquier ruta de la API que no coincidió con nada de arriba (normalmente
// un bug del frontend llamando a un endpoint que ya no existe o está mal
// escrito, no algo que un cliente real dispare navegando la tienda).
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Red de seguridad final: si algo lanza un error que ningún controlador
// atrapó (todos deberían pasar por handleError, así que esto debería ser
// raro en la práctica), se registra completo en el servidor y al cliente
// solo le llega un mensaje genérico y honesto — sin fecha de "ya lo estamos
// arreglando" que este proyecto no puede prometer, pero sí en el mismo tono
// de disculpa breve que se usa en el resto de la interfaz.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Ocurrió un error inesperado en el servidor. Inténtalo de nuevo en unos minutos.' });
});

module.exports = app;
