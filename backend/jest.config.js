// Configuración de Jest para el backend. testTimeout más alto de lo normal
// porque mongodb-memory-server puede tardar varios segundos en arrancar el
// mongod en memoria (más aún la primera vez, si tiene que descargar el
// binario) — el valor por defecto de Jest (5s) se queda corto para eso.
module.exports = {
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/tests/helpers/env.js'],
  testTimeout: 30000,
  testMatch: ['<rootDir>/tests/**/*.test.js']
};
