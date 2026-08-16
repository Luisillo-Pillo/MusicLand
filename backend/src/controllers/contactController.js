const ContactMessage = require('../models/ContactMessage');
const { sendMail, escapeHtml } = require('../utils/mailer');
const handleError = require('../utils/handleError');

// Formulario público de Contacto: guarda el mensaje en la base de datos (así
// queda registrado aunque el correo falle) y de paso intenta avisar por
// correo a la tienda.
async function sendContactMessage(req, res) {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Nombre, correo y mensaje son obligatorios' });
    }

    await ContactMessage.create({ name, email, message });

    // El envío del correo es secundario: si falla, el mensaje ya quedó
    // guardado en la base de datos y visible en /admin/mensajes, así que solo
    // se registra el error sin hacer fallar la petición completa.
    try {
      await sendMail({
        subject: `Nuevo mensaje de contacto de ${name}`,
        replyTo: email,
        html: `
          <h2>Nuevo mensaje de contacto - MusicLand</h2>
          <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
          <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
        `
      });
    } catch (mailError) {
      console.error('Error al enviar el correo de contacto:', mailError.message);
    }

    res.status(200).json({ message: 'Mensaje enviado correctamente' });
  } catch (error) {
    handleError(res, error, 'No pudimos enviar tu mensaje');
  }
}

// Listado completo para /admin/mensajes (más recientes primero).
async function getContactMessages(req, res) {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    handleError(res, error, 'No pudimos cargar los mensajes');
  }
}

// Borra un mensaje de contacto ya atendido.
async function deleteContactMessage(req, res) {
  try {
    const deleted = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Mensaje no encontrado' });
    res.json({ message: 'Mensaje eliminado' });
  } catch (error) {
    handleError(res, error, 'No pudimos eliminar el mensaje');
  }
}

// El admin responde por correo (con el mensaje original citado) y la
// respuesta queda guardada en el propio ContactMessage para consultarla después.
async function replyContactMessage(req, res) {
  try {
    const { reply } = req.body;
    if (!reply || !reply.trim()) {
      return res.status(400).json({ message: 'La respuesta no puede estar vacía' });
    }

    const contactMessage = await ContactMessage.findById(req.params.id);
    if (!contactMessage) return res.status(404).json({ message: 'Mensaje no encontrado' });

    await sendMail({
      to: contactMessage.email,
      subject: 'Respuesta a tu mensaje - MusicLand',
      html: `
        <p>Hola ${escapeHtml(contactMessage.name)},</p>
        <p>Gracias por escribirnos. Este es tu mensaje original:</p>
        <blockquote style="margin:0;padding-left:12px;border-left:3px solid #6d28d9;color:#555;">
          ${escapeHtml(contactMessage.message).replace(/\n/g, '<br>')}
        </blockquote>
        <p><strong>Nuestra respuesta:</strong></p>
        <p>${escapeHtml(reply).replace(/\n/g, '<br>')}</p>
        <p>— Equipo MusicLand</p>
      `
    });

    contactMessage.replied = true;
    contactMessage.reply = reply;
    contactMessage.repliedAt = new Date();
    await contactMessage.save();

    res.json(contactMessage);
  } catch (error) {
    handleError(res, error, 'No pudimos enviar tu respuesta');
  }
}

module.exports = { sendContactMessage, getContactMessages, deleteContactMessage, replyContactMessage };
