const ContactMessage = require('../models/ContactMessage');
const { sendMail, escapeHtml } = require('../utils/mailer');

async function sendContactMessage(req, res) {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Nombre, correo y mensaje son obligatorios' });
    }

    await ContactMessage.create({ name, email, message });

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
    res.status(500).json({ message: 'Error al enviar el mensaje', error: error.message });
  }
}

async function getContactMessages(req, res) {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los mensajes', error: error.message });
  }
}

module.exports = { sendContactMessage, getContactMessages };
