import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import PasswordInput from '../components/PasswordInput';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { digitsOnly, formatPhoneDisplay } from '../utils/format';
import './Auth.css';

// Formulario de creación de cuenta. Comparte con Login.jsx la misma lógica
// de "volver a donde el usuario quería ir" (from/pendingCartAdd/pendingBuyNow
// en location.state): se llega aquí también desde el enlace "Regístrate
// aquí" de Login, que reenvía ese mismo state.
export default function Register() {
  const { register } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  const pendingCartAdd = location.state?.pendingCartAdd || null;
  const pendingBuyNow = location.state?.pendingBuyNow || null;

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

  // El campo se muestra formateado ("000 000 0000") pero el estado guarda
  // solo dígitos: formatPhoneDisplay se encarga de re-formatear al renderizar.
  function handlePhoneChange(e) {
    setForm((f) => ({ ...f, phone: digitsOnly(e.target.value, 10) }));
  }

  // Validaciones del lado del cliente antes de llamar al backend (que las
  // vuelve a hacer de todas formas): evita un viaje de red solo para
  // enterarse de un error que ya se podía detectar aquí mismo.
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

      // Mismo comportamiento que Login.jsx tras iniciar sesión: si se llegó
      // aquí queriendo comprar o agregar algo al carrito, se completa esa
      // intención ahora que la cuenta ya existe y quedó logueada.
      if (pendingBuyNow) {
        navigate('/checkout', { state: { buyNow: pendingBuyNow }, replace: true });
        return;
      }
      if (pendingCartAdd) {
        try {
          await addToCart(pendingCartAdd.productId, pendingCartAdd.quantity);
        } catch (cartErr) {
          setError(
            cartErr.response?.data?.message ||
              'Creamos tu cuenta, pero no se pudo agregar el producto al carrito. Inténtalo de nuevo.'
          );
          return;
        }
      }

      navigate(from, { replace: true });
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
                placeholder="000 000 0000"
                maxLength={12}
                required
                value={formatPhoneDisplay(form.phone)}
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
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" state={location.state}>
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
