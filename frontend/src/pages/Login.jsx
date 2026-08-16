import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import PasswordInput from '../components/PasswordInput';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Auth.css';

// Formulario de inicio de sesión.
export default function Login() {
  const { login } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  // A dónde volver tras iniciar sesión: lo deja ProtectedRoute (o un botón de
  // "Agregar al carrito"/"Comprar ahora" sin sesión, ver ProductCard y
  // ProductDetail) en location.state cuando redirige aquí; si se llegó
  // directo a /login sin venir de ningún lado en particular, vuelve al inicio.
  const from = location.state?.from || '/';
  // Si el motivo de venir a login fue querer agregar un producto al carrito o
  // comprarlo directo, se guarda aquí la intención para completarla en
  // cuanto la sesión se inicie (ver handleSubmit).
  const pendingCartAdd = location.state?.pendingCartAdd || null;
  const pendingBuyNow = location.state?.pendingBuyNow || null;

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);

      // "Comprar ahora" sin sesión: la página a la que el usuario quería ir
      // era checkout con ese producto, no la página del producto — así que
      // se salta directo ahí en vez de pasar por `from`.
      if (pendingBuyNow) {
        navigate('/checkout', { state: { buyNow: pendingBuyNow }, replace: true });
        return;
      }

      // "Agregar al carrito" sin sesión: se agrega ahora que ya hay sesión
      // (el token ya quedó guardado por login()) y se vuelve a la página
      // donde el usuario estaba, con el producto ya en el carrito. Si el
      // agregado falla (p. ej. se acabó el stock mientras iniciaba sesión),
      // se queda en login mostrando el motivo en vez de navegar como si nada:
      // así el usuario no cree que se agregó cuando en realidad no pasó.
      if (pendingCartAdd) {
        try {
          await addToCart(pendingCartAdd.productId, pendingCartAdd.quantity);
        } catch (cartErr) {
          setError(
            cartErr.response?.data?.message ||
              'Iniciaste sesión, pero no se pudo agregar el producto al carrito. Inténtalo de nuevo.'
          );
          return;
        }
      }

      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo iniciar sesión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <BackButton />
      <div className="auth-wrapper">
        <div className="auth-card card">
          <h1>Bienvenido de nuevo</h1>
          <p className="auth-subtitle">Inicia sesión para continuar comprando</p>

          <form onSubmit={handleSubmit}>
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
              <label htmlFor="password">Contraseña</label>
              <PasswordInput
                id="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
            </div>
            {error && <p className="error-text">{error}</p>}
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Ingresando...' : 'Iniciar sesión'}
            </button>
          </form>

          <p className="auth-switch">
            ¿No tienes cuenta?{' '}
            <Link to="/registro" state={location.state}>
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
