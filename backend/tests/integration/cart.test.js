const request = require('supertest');
const app = require('../../src/app');
const db = require('../helpers/db');
const Product = require('../../src/models/Product');

beforeAll(async () => {
  await db.connect();
});

afterEach(async () => {
  await db.clearDatabase();
});

afterAll(async () => {
  await db.closeDatabase();
});

// El carrito requiere sesión: se registra un usuario nuevo y se usa su token
// en cada prueba, igual que haría el frontend (header Authorization: Bearer).
async function registerAndGetToken() {
  const res = await request(app).post('/api/auth/register').send({
    name: 'Cliente de prueba',
    email: 'cliente@example.com',
    phone: '4491234567',
    password: 'Segura123!'
  });
  return res.body.token;
}

describe('Carrito (requiere sesión)', () => {
  it('sin token, cualquier operación de carrito se rechaza con 401', async () => {
    const res = await request(app).get('/api/cart');
    expect(res.status).toBe(401);
  });

  it('agrega un producto y lo refleja con los datos completos del producto (populate)', async () => {
    const token = await registerAndGetToken();
    const product = await Product.create({
      name: 'Bajo eléctrico',
      price: 5000,
      stock: 10,
      description: 'x',
      category: 'Bajos Eléctricos',
      brand: 'Fender',
      image: 'https://example.com/x.jpg'
    });

    const res = await request(app)
      .post('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId: product._id, quantity: 2 });

    expect(res.status).toBe(201);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].quantity).toBe(2);
    expect(res.body[0].product.name).toBe('Bajo eléctrico');
  });

  it('agregar el mismo producto dos veces SUMA la cantidad en vez de duplicar la línea', async () => {
    const token = await registerAndGetToken();
    const product = await Product.create({
      name: 'Micrófono',
      price: 800,
      stock: 10,
      description: 'x',
      category: 'Micrófonos',
      brand: 'Shure',
      image: 'https://example.com/x.jpg'
    });

    await request(app)
      .post('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId: product._id, quantity: 1 });
    const res = await request(app)
      .post('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId: product._id, quantity: 1 });

    expect(res.status).toBe(201);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].quantity).toBe(2);
  });

  it('no deja agregar más unidades de las que hay en stock', async () => {
    const token = await registerAndGetToken();
    const product = await Product.create({
      name: 'Platillo',
      price: 1200,
      stock: 3,
      description: 'x',
      category: 'Platillos',
      brand: 'Zildjian',
      image: 'https://example.com/x.jpg'
    });

    const res = await request(app)
      .post('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId: product._id, quantity: 4 });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/quedan 3/i);
  });

  it('poner la cantidad en 0 quita el producto del carrito', async () => {
    const token = await registerAndGetToken();
    const product = await Product.create({
      name: 'Amplificador',
      price: 2500,
      stock: 5,
      description: 'x',
      category: 'Amplificadores',
      brand: 'Marshall',
      image: 'https://example.com/x.jpg'
    });
    await request(app)
      .post('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId: product._id, quantity: 2 });

    const res = await request(app)
      .put(`/api/cart/${product._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ quantity: 0 });

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(0);
  });
});
