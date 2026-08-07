const mongoose = require('mongoose');

const orderProductSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  },
  { _id: false }
);

// Línea de producto dentro de una solicitud de devolución: guarda su propia
// copia de nombre/cantidad (igual que orderProductSchema) para que la
// solicitud siga siendo legible aunque el producto cambie o se borre después.
const returnItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: { type: String, required: true },
    quantity: { type: Number, required: true }
  },
  { _id: false }
);

// Cada solicitud es una entrada de este arreglo (no un campo único en el
// pedido): un pedido con varios productos puede devolverse por partes, cada
// una con su propio motivo y estatus. Con _id propio para poder
// aprobar/rechazar/borrar una solicitud puntual sin afectar las demás.
const returnRequestSchema = new mongoose.Schema(
  {
    items: [returnItemSchema],
    // true si esta solicitud cubrió todo lo que quedaba pendiente de devolver
    // en ese momento, para no perder ese matiz en el correo/detalle.
    fullOrder: { type: Boolean, default: false },
    reason: { type: String, required: true, trim: true },
    status: { type: String, enum: ['pendiente', 'aprobada', 'rechazada'], default: 'pendiente' },
    requestedAt: { type: Date, default: Date.now }
  },
  { timestamps: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [orderProductSchema],
    total: { type: Number, required: true },
    shippingAddress: {
      fullName: String,
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
      phone: String
    },
    paymentMethod: {
      brand: String,
      last4: String
    },
    status: {
      type: String,
      enum: ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'],
      default: 'procesando'
    },
    cancelledAt: { type: Date, default: null },
    // 'cliente' o 'admin': quién originó la cancelación.
    cancelledBy: { type: String, enum: ['cliente', 'admin', null], default: null },
    cancellationReason: { type: String, default: '', trim: true },
    // Fecha (sin hora, medianoche local) en que el pedido pasó a "entregado".
    // Es la base de la ventana de 15 días para poder solicitar devolución.
    deliveredAt: { type: Date, default: null },
    // Un producto que ya aparece en alguna de estas solicitudes (sin importar
    // su estatus) no se puede volver a solicitar — ver requestReturn.
    returnRequests: { type: [returnRequestSchema], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
