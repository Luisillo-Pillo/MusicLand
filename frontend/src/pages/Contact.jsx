import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import {
  MailIcon,
  PhoneIcon,
  LocationIcon,
  HelpIcon,
  TruckIcon,
  UserIcon,
  ReceiptIcon,
  ChevronRightIcon
} from '../components/icons';
import StoreMap from '../components/StoreMap';
import { sendContactMessageRequest } from '../api/contactApi';
import { useAuth } from '../context/AuthContext';
import { siteInfo, addressLine, hoursLine } from '../config/siteInfo';
import './Contact.css';

// Accesos rápidos a otras páginas de ayuda del sitio: si alguien llega a
// Contáctanos con una duda que ya está resuelta en otro lado (FAQ, envíos,
// su propia cuenta), esto le ahorra escribir el formulario y esperar
// respuesta. Los íconos y las rutas ya existen en el resto de la app (ver
// App.jsx y Footer.jsx); aquí solo se reutilizan.
const helpLinks = [
  {
    to: '/preguntas-frecuentes',
    icon: HelpIcon,
    title: 'Preguntas frecuentes',
    description: 'Pagos, cuentas y dudas comunes'
  },
  {
    to: '/envios-y-devoluciones',
    icon: TruckIcon,
    title: 'Envíos y devoluciones',
    description: 'Tiempos de entrega, cancelaciones y devoluciones'
  },
  {
    to: '/historial-compras',
    icon: ReceiptIcon,
    title: 'Mis pedidos',
    description: 'Da seguimiento, cancela o solicita una devolución'
  },
  {
    to: '/perfil',
    icon: UserIcon,
    title: 'Mi cuenta',
    description: 'Direcciones, métodos de pago y tus datos'
  }
];

// Página pública de contacto: datos de la tienda + mapa + formulario que
// llega al backend (sendContactMessageRequest) y de ahí, por correo, al equipo.
export default function Contact() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Si hay sesión iniciada, precarga nombre y correo (sin pisar lo que el
  // usuario ya haya escrito a mano) para ahorrarle tecleo.
  useEffect(() => {
    if (!user) return;
    setForm((f) => ({
      ...f,
      name: f.name || user.name,
      email: f.email || user.email
    }));
  }, [user]);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  // Envía el mensaje y muestra un "enviado" temporal (3s) antes de volver al
  // botón normal, dejando el formulario listo para otro mensaje.
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await sendContactMessageRequest(form);
      setSent(true);
      setForm({ name: user?.name || '', email: user?.email || '', message: '' });
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo enviar el mensaje. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <BackButton />
      <div className="container">
        <h1 style={{ marginBottom: 24 }}>Contáctanos</h1>

        <div className="contact-layout">
          <div className="contact-info-card card">
            <div className="contact-info-item">
              <LocationIcon />
              <div>
                <strong>Dirección</strong>
                {addressLine()}
                <br />
                C.P. {siteInfo.address.zipCode}
              </div>
            </div>
            <div className="contact-info-item">
              <PhoneIcon />
              <div>
                <strong>Teléfono</strong>
                <a href={`tel:${siteInfo.phoneTel}`}>{siteInfo.phone}</a>
              </div>
            </div>
            <div className="contact-info-item">
              <MailIcon />
              <div>
                <strong>Correo</strong>
                <a href={`mailto:${siteInfo.email}`}>{siteInfo.email}</a>
              </div>
            </div>
            <div className="contact-info-item">
              <div>
                <strong>Horario de atención</strong>
                {hoursLine()}
              </div>
            </div>
          </div>

          <div className="contact-form-card card">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input id="name" name="name" required value={form.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange}
                />
              </div>
              {error && <p className="error-text">{error}</p>}
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Enviando...' : sent ? 'Mensaje enviado' : 'Enviar mensaje'}
              </button>
            </form>
          </div>
        </div>

        <div className="contact-map-section">
          <StoreMap title="Visítanos en la tienda" />

          {/* Junto al mapa (que ya no ocupa el ancho completo) para no dejar
              esa columna vacía: enlaces a las otras páginas de ayuda del sitio. */}
          <div className="contact-help-card card">
            <h3>
              <HelpIcon size={17} /> ¿Tienes dudas?
            </h3>
            <p>Antes de escribirnos, puede que ya tengamos la respuesta:</p>
            <div className="contact-help-links">
              {helpLinks.map(({ to, icon: Icon, title, description }) => (
                <Link key={to} to={to} className="contact-help-link">
                  <Icon size={18} />
                  <div>
                    <strong>{title}</strong>
                    <span>{description}</span>
                  </div>
                  <ChevronRightIcon size={16} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
