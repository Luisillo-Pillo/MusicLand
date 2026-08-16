const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Una dirección de envío guardada por el usuario (se van acumulando en
// checkout, ver Checkout.jsx). Lleva su propio _id (por defecto en Mongoose)
// para poder editar/borrar una puntual sin tocar las demás.
const addressSchema = new mongoose.Schema(
  {
    label: { type: String, default: 'Casa' },
    fullName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true, default: 'México' },
    phone: { type: String },
    isDefault: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// Un método de pago guardado. El proyecto no procesa pagos reales: solo se
// guarda el nombre en la tarjeta, la marca (detectada por el primer dígito,
// ver detectCardBrand en el frontend) y los últimos 4 dígitos — nunca el
// número completo ni el CVV, que ni siquiera llegan al backend.
const paymentMethodSchema = new mongoose.Schema(
  {
    cardholderName: { type: String, required: true },
    brand: {
      type: String,
      enum: ['Visa', 'Mastercard', 'American Express'],
      default: 'Visa'
    },
    last4: { type: String, required: true },
    expiry: { type: String, required: true, match: /^\d{2}\/\d{2}$/ },
    isDefault: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// Una línea del carrito: solo la referencia al producto y la cantidad (no una
// copia del precio/nombre, a diferencia de orderProductSchema en Order.js —
// el carrito siempre debe reflejar el precio ACTUAL del producto, mientras
// que un pedido ya pagado debe conservar el precio de cuando se compró).
const cartItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 }
  },
  { timestamps: true }
);

// El usuario: cuenta + todo lo que le pertenece embebido en el mismo
// documento (direcciones, métodos de pago, carrito). No hay colecciones
// separadas para eso porque siempre se leen/escriben junto con el usuario,
// nunca de forma independiente entre distintos usuarios.
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    phone: { type: String, trim: true, default: '' },
    // select: false → nunca viaja en un User.find() normal; hay que pedirlo
    // explícito con .select('+password') (lo hace login, ver authController).
    password: { type: String, required: true, minlength: 6, select: false },
    profilePhoto: {
      type: String,
      default:
        'https://api.dicebear.com/7.x/initials/svg?seed=User&backgroundColor=6d28d9'
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    lastLogin: { type: Date, default: null },
    addresses: [addressSchema],
    paymentMethods: [paymentMethodSchema],
    cart: [cartItemSchema]
  },
  { timestamps: true }
);

// Hashea la contraseña automáticamente antes de guardar, tanto al crear el
// usuario como al cambiarla desde Profile/AdminUserProfile — nunca se guarda
// en texto plano. isModified evita volver a hashear un hash ya guardado
// cuando el documento se resave por otra razón (p. ej. actualizar lastLogin).
userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compara una contraseña en texto plano (la que escribe el usuario al hacer
// login) contra el hash guardado. bcrypt.compare vuelve a hashear el
// candidato con la misma sal y compara los hashes, nunca "deshashea" nada.
userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

// Vista completa del usuario para el propio dueño de la cuenta (perfil,
// respuesta de login/registro): todo menos la contraseña.
userSchema.methods.toSafeObject = function toSafeObject() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// Vista reducida para los listados de administración: expone solo lo que la interfaz
// muestra, sin arrastrar direcciones, métodos de pago ni el carrito de cada cliente.
userSchema.methods.toAdminObject = function toAdminObject() {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    phone: this.phone,
    profilePhoto: this.profilePhoto,
    role: this.role,
    lastLogin: this.lastLogin,
    createdAt: this.createdAt
  };
};

module.exports = mongoose.model('User', userSchema);
