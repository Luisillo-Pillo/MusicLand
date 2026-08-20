const request = require('supertest');
const app = require('../../src/app');
const db = require('../helpers/db');

beforeAll(async () => {
  await db.connect();
});

afterAll(async () => {
  await db.closeDatabase();
});

// Prueba mínima, sin tocar ningún modelo: confirma que la app arranca y
// responde. Sirve también como "canario" para detectar rápido si algo del
// entorno de pruebas (la base de datos en memoria, sobre todo) dejó de
// funcionar, sin tener que descartar primero una prueba más compleja.
describe('GET /api/health', () => {
  it('responde 200 con el estatus de la API', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok', service: 'MusicLand API' });
  });
});
