require('dotenv').config();
const connectDB = require('./src/config/db');
const app = require('./src/app');

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
