import { Link, Navigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import { CheckCircleIcon } from '../components/icons';
import { formatPrice } from '../utils/format';
import './Checkout.css';

// Pantalla de "gracias por tu compra" a la que redirige Checkout justo
// después de crear el pedido con éxito, pasándolo por location.state.
export default function OrderConfirmation() {
  const location = useLocation();
  const order = location.state?.order;

  // Sin un pedido en el state (p. ej. si se llega escribiendo la URL
  // directamente, o al recargar la página) no hay nada que mostrar, así que
  // se manda de vuelta al inicio en vez de romper con datos vacíos.
  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <BackButton />
      <div className="container">
        <div className="confirmation-card card">
          <CheckCircleIcon size={64} className="success-icon" />
          <h1>¡Gracias por tu compra!</h1>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Tu pedido ha sido registrado con éxito. Te avisaremos cuando esté en camino.
          </p>
          <div className="confirmation-order-number">Pedido #{order.orderNumber}</div>

          <div className="confirmation-summary">
            {order.products.map((item) => (
              <div className="confirmation-summary-item" key={item.product}>
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="confirmation-summary-item" style={{ fontWeight: 800, border: 'none' }}>
              <span>Total pagado</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>

          <div className="profile-actions" style={{ marginTop: 28 }}>
            <Link to="/" className="btn btn-primary">
              Volver al inicio
            </Link>
            <Link to="/historial-compras" className="btn btn-outline">
              Ver mis compras
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
