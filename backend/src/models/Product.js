const mongoose = require('mongoose');

// Un artículo del catálogo (guitarra, teclado, micrófono, etc.). No tiene
// variantes (talla/color) ni SKU: cada documento es un producto vendible por
// sí mismo, con su propio stock.
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    // Precio de lista: lo que cuesta el producto SIN descuento. Cuando hay
    // una oferta, el precio real a pagar es este * (1 - discountPercent/100)
    // — ver getSellingPrice() más abajo — nunca se sobreescribe `price` al
    // aplicar un descuento, así se puede quitar la oferta y el precio
    // original queda intacto.
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    description: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    image: { type: String, required: true },
    // 0 = sin oferta (precio normal). Un producto con discountPercent > 0
    // es lo que alimenta el carrusel de ofertas del Home — ver
    // getDeals en productController — así que basta con ponerle un
    // descuento desde el panel de admin para que aparezca ahí, sin
    // necesidad de un campo aparte para "destacar" el producto.
    discountPercent: { type: Number, min: 0, max: 90, default: 0 }
  },
  { timestamps: true }
);

productSchema.index({ name: 'text', description: 'text', brand: 'text', category: 'text' });

// El precio que en verdad se cobra: el de lista si no hay descuento, o el de
// lista menos el porcentaje si lo hay. Se calcula siempre a partir de estos
// dos campos (nunca se guarda un "precio con descuento" aparte) para que
// nunca queden desincronizados entre sí. Redondeado a centavos igual que el
// resto de los precios de la app.
productSchema.methods.getSellingPrice = function getSellingPrice() {
  if (!this.discountPercent) return this.price;
  return Math.round(this.price * (1 - this.discountPercent / 100) * 100) / 100;
};

module.exports = mongoose.model('Product', productSchema);
