const request = require('supertest');
const app = require('../../src/app');
const db = require('../helpers/db');
const User = require('../../src/models/User');

beforeAll(async () => {
  await db.connect();
});

afterEach(async () => {
  await db.clearDatabase();
});

afterAll(async () => {
  await db.closeDatabase();
});

const validUser = {
  name: 'Ana Pérez',
  email: 'ana@example.com',
  phone: '4491234567',
  password: 'Segura123!'
};

describe('POST /api/auth/register', () => {
  it('crea la cuenta, hashea la contraseña y devuelve token + usuario sin la contraseña', async () => {
    const res = await request(app).post('/api/auth/register').send(validUser);

    expect(res.status).toBe(201);
    expect(res.body.token).toEqual(expect.any(String));
    expect(res.body.user.email).toBe(validUser.email.toLowerCase());
    expect(res.body.user.password).toBeUndefined();

    // La contraseña sí quedó guardada, pero nunca en texto plano.
    const stored = await User.findOne({ email: validUser.email }).select('+password');
    expect(stored.password).not.toBe(validUser.password);
  });

  it('rechaza un correo ya registrado con 409', async () => {
    await request(app).post('/api/auth/register').send(validUser);
    const res = await request(app).post('/api/auth/register').send(validUser);

    expect(res.status).toBe(409);
    expect(res.body.message).toMatch(/ya existe/i);
  });

  it('rechaza un teléfono que no tenga exactamente 10 dígitos', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ ...validUser, phone: '123' });

    expect(res.status).toBe(400);
  });
});

describe('POST /api/auth/login', () => {
  beforeEach(async () => {
    await request(app).post('/api/auth/register').send(validUser);
  });

  it('con credenciales correctas, devuelve token + usuario', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: validUser.email, password: validUser.password });

    expect(res.status).toBe(200);
    expect(res.body.token).toEqual(expect.any(String));
  });

  it('con contraseña incorrecta, da 401 sin decir cuál de los dos datos falló', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: validUser.email, password: 'incorrecta' });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Credenciales inválidas');
  });

  it('con un correo que no existe, da el mismo 401 genérico (no filtra qué cuentas existen)', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'nadie@example.com', password: 'lo-que-sea' });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Credenciales inválidas');
  });
});
