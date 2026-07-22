import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import PasswordInput from '../components/PasswordInput';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handlePhoneChange(e) {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
    setForm((f) => ({ ...f, phone: digitsOnly }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (form.phone.length !== 10) {
      setError('El teléfono debe tener exactamente 10 dígitos');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    setLoading(true);
    try {
      await register({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password
      });
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo completar el registro');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <BackButton />
      <div className="auth-wrapper">
        <div className="auth-card card">
          <h1>Crea tu cuenta</h1>
          <p className="auth-subtitle">Regístrate para comprar tus instrumentos favoritos</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre completo</label>
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
              <label htmlFor="phone">Número de teléfono</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                placeholder="10 dígitos"
                required
                value={form.phone}
                onChange={handlePhoneChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <PasswordInput
                id="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar contraseña</label>
              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>
            {error && <p className="error-text">{error}</p>}
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creando cuenta...' : 'Registrarse'}
            </button>
          </form>

          <p className="auth-switch">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
