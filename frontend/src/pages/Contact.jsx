import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import { MailIcon, PhoneIcon, LocationIcon } from '../components/icons';
import StoreMap from '../components/StoreMap';
import { sendContactMessageRequest } from '../api/contactApi';
import { useAuth } from '../context/AuthContext';
import { siteInfo, addressLine, hoursLine } from '../config/siteInfo';
import './Contact.css';

export default function Contact() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
        </div>
      </div>
    </Layout>
  );
}
