// Prueba unitaria pura: no toca la base de datos (new Product(...) sin
// .save() no necesita conexión), solo el método del schema. Cubre el cálculo
// de precio con descuento, que es la base de todo el sistema de ofertas —
// carrusel, tarjetas, checkout y el total real que se cobra dependen de que
// esta cuenta salga bien.
const Product = require('../../src/models/Product');

describe('Product.getSellingPrice', () => {
  it('sin descuento, devuelve el precio de lista tal cual', () => {
    const product = new Product({ price: 1500, discountPercent: 0 });
    expect(product.getSellingPrice()).toBe(1500);
  });

  it('con descuento, aplica el porcentaje sobre el precio de lista', () => {
    const product = new Product({ price: 1000, discountPercent: 20 });
    expect(product.getSellingPrice()).toBe(800);
  });

  it('redondea a centavos en vez de arrastrar decimales largos', () => {
    const product = new Product({ price: 999.99, discountPercent: 15 });
    // 999.99 * 0.85 = 849.9915 -> redondeado a 849.99
    expect(product.getSellingPrice()).toBe(849.99);
  });

  it('nunca modifica el precio de lista original al calcular el de oferta', () => {
    const product = new Product({ price: 2000, discountPercent: 50 });
    product.getSellingPrice();
    expect(product.price).toBe(2000);
  });
});
