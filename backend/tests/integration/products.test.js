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

function sampleProduct(overrides = {}) {
  return {
    name: 'Guitarra acústica Yamaha',
    price: 3000,
    stock: 5,
    description: 'Guitarra de prueba',
    category: 'Guitarras Acústicas',
    brand: 'Yamaha',
    image: 'https://example.com/img.jpg',
    ...overrides
  };
}

describe('GET /api/products', () => {
  it('sin sesión, devuelve el catálogo paginado (el catálogo es público)', async () => {
    await Product.create([sampleProduct({ name: 'A' }), sampleProduct({ name: 'B' })]);

    const res = await request(app).get('/api/products');

    expect(res.status).toBe(200);
    expect(res.body.total).toBe(2);
    expect(res.body.products).toHaveLength(2);
  });

  it('filtra por texto de búsqueda (?search=)', async () => {
    await Product.create([
      sampleProduct({ name: 'Guitarra eléctrica Fender' }),
      sampleProduct({ name: 'Teclado Casio' })
    ]);

    const res = await request(app).get('/api/products').query({ search: 'Fender' });

    expect(res.status).toBe(200);
    expect(res.body.products).toHaveLength(1);
    expect(res.body.products[0].name).toMatch(/Fender/);
  });
});

describe('GET /api/products/deals', () => {
  it('solo devuelve productos con descuento activo', async () => {
    await Product.create([
      sampleProduct({ name: 'Con oferta', discountPercent: 15 }),
      sampleProduct({ name: 'Sin oferta', discountPercent: 0 })
    ]);

    const res = await request(app).get('/api/products/deals');

    expect(res.status).toBe(200);
    expect(res.body.every((p) => p.discountPercent > 0)).toBe(true);
    expect(res.body.some((p) => p.name === 'Sin oferta')).toBe(false);
  });

  it('sin ninguna oferta activa, cae de vuelta a los productos más recientes (nunca queda vacío)', async () => {
    await Product.create([sampleProduct({ name: 'Reciente 1' }), sampleProduct({ name: 'Reciente 2' })]);

    const res = await request(app).get('/api/products/deals');

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('GET /api/products/:id', () => {
  it('devuelve el producto con su sellingPrice calculado', async () => {
    const product = await Product.create(sampleProduct({ price: 1000, discountPercent: 10 }));

    const res = await request(app).get(`/api/products/${product._id}`);

    expect(res.status).toBe(200);
    expect(res.body.sellingPrice).toBe(900);
  });

  it('con un id de formato inválido, da 400 (no un 500 ni un stack trace)', async () => {
    const res = await request(app).get('/api/products/no-es-un-id-valido');

    expect(res.status).toBe(400);
  });

  it('con un id válido pero inexistente, da 404', async () => {
    const res = await request(app).get('/api/products/507f1f77bcf86cd799439011');

    expect(res.status).toBe(404);
  });
});

describe('POST /api/products (crear producto)', () => {
  it('sin token, se rechaza con 401', async () => {
    const res = await request(app).post('/api/products').send(sampleProduct());
    expect(res.status).toBe(401);
  });
});
