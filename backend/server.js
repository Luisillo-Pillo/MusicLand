require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./src/config/db');

const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const contactRoutes = require('./src/routes/contactRoutes');

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

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Servidor MusicLand corriendo en el puerto ${PORT}`);
    });

    // Sin este handler, un puerto ocupado (típicamente un servidor anterior que
    // quedó corriendo en otra terminal y nunca se cerró con Ctrl+C) hace que
    // Node tire un stack trace crudo de "EADDRINUSE" y el proceso muera sin
    // explicar qué pasó. Con esto se explica el motivo y cómo resolverlo.
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(
          `\nNo se pudo iniciar el servidor: el puerto ${PORT} ya está en uso.\n` +
            'Seguramente hay otra instancia de este backend corriendo en otra terminal ' +
            '(o quedó abierta sin cerrarse). Ciérrala o libera el puerto e inténtalo de nuevo.\n' +
            `Windows: netstat -ano | findstr :${PORT}   luego   taskkill /PID <pid> /F\n`
        );
        process.exit(1);
      }
      console.error('Error al iniciar el servidor:', error);
      process.exit(1);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1);
  });
