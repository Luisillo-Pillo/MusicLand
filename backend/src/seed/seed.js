require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');
const User = require('../models/User');
const products = require('./seedData');

// Script de un solo uso (`npm run seed`) para poblar una base de datos nueva:
// reemplaza TODO el catálogo de productos por el de seedData.js (por eso el
// deleteMany antes del insertMany) y crea las dos cuentas de prueba si aún no
// existen. Pensado para correrse una vez al preparar el entorno, no como
// parte del arranque normal del servidor.
async function run() {
  await connectDB();

  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`Se insertaron ${products.length} productos.`);

  // No se recrean si ya existen, para no pisar la contraseña de una cuenta
  // que el usuario ya haya cambiado desde un seed anterior.
  const adminEmail = 'admin@musicland.com';
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({
      name: 'Administrador MusicLand',
      email: adminEmail,
      password: 'Admin123!',
      role: 'admin'
    });
    console.log(`Usuario admin creado -> correo: ${adminEmail} / contraseña: Admin123!`);
  }

  const demoEmail = 'usuario@musicland.com';
  const existingDemo = await User.findOne({ email: demoEmail });
  if (!existingDemo) {
    await User.create({
      name: 'Usuario Demo',
      email: demoEmail,
      password: 'Usuario123!',
      role: 'user'
    });
    console.log(`Usuario demo creado -> correo: ${demoEmail} / contraseña: Usuario123!`);
  }

  await mongoose.disconnect();
  console.log('Seed completado.');
  process.exit(0);
}

run().catch((error) => {
  console.error('Error en el seed:', error);
  process.exit(1);
});
