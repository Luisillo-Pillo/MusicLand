const mongoose = require('mongoose');

// Un mensaje enviado desde el formulario público de Contacto. Se guarda en la
// base de datos (para el panel de administración en /admin/mensajes) además
// de mandarse por correo, así que sigue existiendo aunque ese correo falle.
const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true },
    replied: { type: Boolean, default: false },
    reply: { type: String, default: '' },
    repliedAt: { type: Date, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
