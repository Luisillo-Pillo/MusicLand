require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');
const User = require('../models/User');
const products = require('./seedData');

async function run() {
  await connectDB();

  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log(`Se insertaron ${products.length} productos.`);

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
