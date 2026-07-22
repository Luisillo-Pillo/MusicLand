import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import { EmptyBoxIcon } from '../components/icons';
import { getMyOrdersRequest } from '../api/orderApi';
import './OrderHistory.css';

const statusLabels = {
  pendiente: 'Pendiente',
  procesando: 'Procesando',
  enviado: 'Enviado',
  entregado: 'Entregado'
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyOrdersRequest()
      .then(({ data }) => setOrders(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <BackButton />
      <div className="container">
        <h1 style={{ marginBottom: 24 }}>Historial de compras</h1>

        {loading ? (
          <div className="spinner-wrapper">
            <div className="spinner" />
          </div>
        ) : orders.length === 0 ? (
          <div className="empty-state card">
            <EmptyBoxIcon />
            <p>Aún no has realizado ninguna compra.</p>
            <Link to="/" className="btn btn-primary">
              Ir a comprar
            </Link>
          </div>
        ) : (
          <div className="order-history-list">
            {orders.map((order) => (
              <div className="order-history-card card" key={order._id}>
                <div className="order-history-header">
                  <div>
                    <div className="order-history-number">Pedido #{order.orderNumber}</div>
                    <div className="order-history-date">{formatDate(order.createdAt)}</div>
                  </div>
                  <span className="badge">{statusLabels[order.status] || order.status}</span>
                </div>

                <div className="order-history-items">
                  {order.products.map((item, index) => (
                    <div className="order-history-item" key={`${order._id}-${index}`}>
                      <img src={item.image} alt={item.name} />
                      <span className="order-history-item-name">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="order-history-item-price">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="order-history-footer">
                  <span>Total</span>
                  <span className="order-history-total">${order.total.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
