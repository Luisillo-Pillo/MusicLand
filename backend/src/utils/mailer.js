// Envoltorio delgado sobre nodemailer, usado por todos los correos de la app
// (contacto, confirmación de compra, cancelaciones, devoluciones, etc. — ver
// los `require('../utils/mailer')` en cada controlador). Centraliza tres
// cosas: la configuración de la cuenta Gmail, el escapado HTML anti-XSS de
// los correos y el comportamiento "silencioso" cuando SMTP no está configurado.
const nodemailer = require('nodemailer');

// Se crea una sola vez y se reutiliza en cada envío (perezoso: no se conecta
// a Gmail hasta el primer correo real), en vez de abrir una conexión SMTP nueva
// por cada mensaje.
let transporter = null;

function getTransporter() {
  if (!transporter) {
    // service: 'gmail' hace que nodemailer complete host/puerto/TLS solo;
    // basta con user/pass (una contraseña de aplicación de Gmail, no la
    // contraseña normal de la cuenta — Gmail no acepta SMTP con esa).
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
  return transporter;
}

// Escapa los 5 caracteres que tienen significado especial en HTML. Todo
// contenido que viene de un usuario (nombre, mensaje, motivo de cancelación,
// etc.) pasa por aquí antes de insertarse en el HTML del correo — sin esto,
// alguien podría escribir '<img src=x onerror=...>' como "nombre" y ejecutar
// script en el cliente de correo de quien lo reciba (XSS reflejado por correo).
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Envía un correo desde la cuenta de MusicLand. Devuelve true si el correo se
// envió, false si se omitió por falta de configuración SMTP.
//
// Diseño clave: si SMTP_USER/SMTP_PASS no están puestos en .env, esto NO
// lanza una excepción — solo avisa por consola y devuelve false. Así, en un
// entorno de desarrollo sin credenciales de correo configuradas, el resto de
// la app (crear pedidos, contacto, etc.) sigue funcionando con normalidad; el
// correo es siempre una notificación secundaria, nunca un requisito para que
// la acción principal (la compra, el mensaje) se complete. Quien llama a
// sendMail() decide qué hacer con el `false` (normalmente: nada, o loguearlo).
async function sendMail({ subject, html, replyTo, to }) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('SMTP no configurado (SMTP_USER/SMTP_PASS); se omite el envío de correo.');
    return false;
  }
  const transport = getTransporter();
  await transport.sendMail({
    from: `"MusicLand" <${process.env.SMTP_USER}>`,
    // Sin un destinatario explícito, el correo es una notificación INTERNA
    // (nueva compra, nueva solicitud de devolución, etc.): va a NOTIFY_EMAIL
    // si está configurado, o si no, a la propia cuenta de envío.
    to: to || process.env.NOTIFY_EMAIL || process.env.SMTP_USER,
    subject,
    html,
    replyTo
  });
  return true;
}

module.exports = { sendMail, escapeHtml };
