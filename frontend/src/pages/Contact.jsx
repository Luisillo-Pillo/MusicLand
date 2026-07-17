import { useState } from 'react';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import { MailIcon, PhoneIcon, LocationIcon } from '../components/icons';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 3000);
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
                Av. de la Música 123, Ciudad de México
              </div>
            </div>
            <div className="contact-info-item">
              <PhoneIcon />
              <div>
                <strong>Teléfono</strong>
                +52 55 1234 5678
              </div>
            </div>
            <div className="contact-info-item">
              <MailIcon />
              <div>
                <strong>Correo</strong>
                contacto@musicland.com
              </div>
            </div>
            <div className="contact-info-item">
              <strong style={{ display: 'block' }}>Horario de atención</strong>
              Lunes a sábado, 9:00 - 19:00
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
              <button type="submit" className="btn btn-primary">
                {sent ? 'Mensaje enviado' : 'Enviar mensaje'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
