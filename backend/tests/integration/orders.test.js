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

async function registerAndGetToken() {
  const res = await request(app).post('/api/auth/register').send({
    name: 'Comprador de prueba',
    email: 'comprador@example.com',
    phone: '4491234567',
    password: 'Segura123!'
  });
  return res.body.token;
}

const shippingAddress = {
  fullName: 'Comprador de prueba',
  street: 'Calle Falsa 123',
  city: 'Rincón de Romos',
  state: 'Ags',
  zipCode: '20400',
  country: 'México',
  phone: '4491234567'
};

const paymentMethod = { brand: 'Visa', last4: '4242' };

describe('POST /api/orders — el precio y el total SIEMPRE se calculan en el servidor', () => {
  it('ignora un precio manipulado que mande el cliente y cobra el precio real del producto', async () => {
    const token = await registerAndGetToken();
    const product = await Product.create({
      name: 'Piano digital',
      price: 10000,
      discountPercent: 20, // precio real de venta: 8000
      stock: 5,
      description: 'x',
      category: 'Pianos Digitales',
      brand: 'Casio',
      image: 'https://example.com/x.jpg'
    });

    // "Comprar ahora" (items) es el atajo más directo para probar esto: el
    // cliente manda un `price` falso de $1 que el backend debe ignorar por
    // completo, calculando el total a partir del producto real en la base de
    // datos (10000 * 0.8 = 8000), nunca de lo que venga en el body.
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        items: [{ productId: product._id, quantity: 2, price: 1 }],
        shippingAddress,
        paymentMethod
      });

    expect(res.status).toBe(201);
    expect(res.body.products[0].price).toBe(8000);
    expect(res.body.total).toBe(16000); // 8000 * 2, nunca 1 * 2
  });

  it('descuenta el stock exacto de lo comprado', async () => {
    const token = await registerAndGetToken();
    const product = await Product.create({
      name: 'Batería acústica',
      price: 15000,
      stock: 5,
      description: 'x',
      category: 'Baterías',
      brand: 'Pearl',
      image: 'https://example.com/x.jpg'
    });

    await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ items: [{ productId: product._id, quantity: 2 }], shippingAddress, paymentMethod });

    const updated = await Product.findById(product._id);
    expect(updated.stock).toBe(3);
  });

  it('con stock insuficiente, rechaza la compra con 400 y NO toca el stock', async () => {
    const token = await registerAndGetToken();
    const product = await Product.create({
      name: 'Sintetizador',
      price: 20000,
      stock: 1,
      description: 'x',
      category: 'Sintetizadores',
      brand: 'Roland',
      image: 'https://example.com/x.jpg'
    });

    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ items: [{ productId: product._id, quantity: 5 }], shippingAddress, paymentMethod });

    expect(res.status).toBe(400);
    const unchanged = await Product.findById(product._id);
    expect(unchanged.stock).toBe(1);
  });

  it('sin dirección de envío ni método de pago, rechaza con 400', async () => {
    const token = await registerAndGetToken();
    const product = await Product.create({
      name: 'Clarinete',
      price: 3000,
      stock: 5,
      description: 'x',
      category: 'Instrumentos de Viento',
      brand: 'Selmer',
      image: 'https://example.com/x.jpg'
    });

    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ items: [{ productId: product._id, quantity: 1 }] });

    expect(res.status).toBe(400);
  });

  it('sin token, se rechaza con 401 (no se puede comprar sin sesión)', async () => {
    const res = await request(app).post('/api/orders').send({ shippingAddress, paymentMethod });
    expect(res.status).toBe(401);
  });
});
