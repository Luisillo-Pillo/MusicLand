// Helper compartido por las pruebas de integración: levanta un MongoDB real
// pero EN MEMORIA (mongodb-memory-server descarga y corre un mongod de
// verdad, solo que sin persistir nada a disco) para que las pruebas hablen
// con una base de datos real y no con mocks — así se prueba el
// comportamiento real de Mongoose (validaciones, índices, etc.), pero sin
// tocar jamás la base de datos real de desarrollo/producción en MongoDB
// Atlas, y sin que las pruebas dependan de tener internet hacia Atlas.
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongod = null;

// Se llama una vez en el beforeAll() de cada archivo de pruebas de integración.
async function connect() {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
}

// Se llama en el afterEach() de cada archivo: vacía todas las colecciones
// entre pruebas para que una prueba nunca vea datos que dejó otra (cada
// prueba debe poder correr sola o en cualquier orden, sin depender de las demás).
async function clearDatabase() {
  const collections = mongoose.connection.collections;
  for (const key of Object.keys(collections)) {
    await collections[key].deleteMany({});
  }
}

// Se llama en el afterAll(): cierra la conexión y apaga el mongod en memoria.
async function closeDatabase() {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (mongod) await mongod.stop();
}

module.exports = { connect, clearDatabase, closeDatabase };
