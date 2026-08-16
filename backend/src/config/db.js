const mongoose = require('mongoose');

// Abre la conexión a MongoDB Atlas antes de que server.js levante Express: si
// esto falla (URI mal escrita, IP no permitida en Atlas, credenciales
// incorrectas), el servidor no debe arrancar a medias sirviendo rutas que de
// todas formas van a fallar al tocar la base de datos.
async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Falta la variable de entorno MONGODB_URI');
  }
  // strictQuery evita consultas silenciosamente ignoradas por campos que no
  // existen en el schema (comportamiento por defecto que cambiará en Mongoose 7+).
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri);
  console.log(`MongoDB conectado: ${mongoose.connection.host}`);
}

module.exports = connectDB;
