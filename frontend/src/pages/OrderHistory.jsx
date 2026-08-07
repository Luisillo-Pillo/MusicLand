import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import CancelOrderModal from '../components/CancelOrderModal';
import { EmptyBoxIcon, EyeIcon, TrashIcon } from '../components/icons';
import { getMyOrdersRequest, cancelOrderRequest } from '../api/orderApi';
import { formatPrice, formatPhoneDisplay } from '../utils/format';
import { statusLabels, canCancel, isCancelled, returnStatusLabels } from '../utils/orderStatus';
import './OrderHistory.css';

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
  const [error, setError] = useState('');
  const [detailsOrder, setDetailsOrder] = useState(null);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState('');

  async function handleConfirmCancel(reason) {
    if (!cancelTarget) return;
    setCancelling(true);
    setCancelError('');
    try {
      const { data } = await cancelOrderRequest(cancelTarget._id, reason);
      setOrders((prev) => prev.map((o) => (o._id === data._id ? data : o)));
      setDetailsOrder((prev) => (prev && prev._id === data._id ? data : prev));
      setCancelTarget(null);
    } catch (err) {
      setCancelError(err.response?.data?.message || 'No se pudo cancelar el pedido');
    } finally {
      setCancelling(false);
    }
  }

  useEffect(() => {
    getMyOrdersRequest()
      .then(({ data }) => setOrders(data))
      .catch((err) => setError(err.response?.data?.message || 'No se pudo cargar tu historial de compras.'))
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
        ) : error ? (
          <p className="error-text">{error}</p>
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
                  <span className={`badge order-history-badge status-${order.status}`}>
                    {statusLabels[order.status] || order.status}
                  </span>
                </div>

                <div className="order-history-items">
                  {order.products.map((item, index) => (
                    <div className="order-history-item" key={`${order._id}-${index}`}>
                      <img src={item.image} alt={item.name} />
                      <span className="order-history-item-name">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="order-history-item-price">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="order-history-footer">
                  <span>Total</span>
                  <span className="order-history-total">{formatPrice(order.total)}</span>
                </div>

                {isCancelled(order) && (
                  <div className="order-history-cancelled">
                    <p>
                      {order.cancelledBy === 'admin'
                        ? 'La tienda canceló este pedido'
                        : 'Cancelaste este pedido'}
                      {order.cancelledAt && ` el ${formatDate(order.cancelledAt)}`}.
                    </p>
                    {order.cancellationReason && (
                      <p className="order-history-cancel-reason">
                        <strong>Motivo:</strong> {order.cancellationReason}
                      </p>
                    )}
                  </div>
                )}

                {order.returnRequest && (
                  <div className="order-history-cancelled order-history-return">
                    <p>
                      Solicitud de devolución{' '}
                      {order.returnRequest.fullOrder ? 'del pedido completo' : 'de los productos seleccionados'}{' '}
                      enviada el {formatDate(order.returnRequest.requestedAt)} —{' '}
                      <strong>{returnStatusLabels[order.returnRequest.status]}</strong>.
                    </p>
                  </div>
                )}

                <div className="order-history-actions">
                  {canCancel(order, false) && (
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      disabled={cancelling}
                      onClick={() => setCancelTarget(order)}
                    >
                      <TrashIcon size={15} /> Cancelar pedido
                    </button>
                  )}
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setDetailsOrder(order)}>
                    <EyeIcon size={15} /> Ver detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {detailsOrder && (
        <div className="modal-overlay" onClick={() => setDetailsOrder(null)}>
          <div className="modal-box order-details-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Pedido #{detailsOrder.orderNumber}</h3>
            <div className="order-details-meta">
              <span className={`badge order-history-badge status-${detailsOrder.status}`}>
                {statusLabels[detailsOrder.status] || detailsOrder.status}
              </span>
              <span className="order-history-date">{formatDate(detailsOrder.createdAt)}</span>
            </div>

            <div className="order-details-section">
              <h4>Productos</h4>
              <div className="order-history-items">
                {detailsOrder.products.map((item, index) => (
                  <div className="order-history-item" key={`${detailsOrder._id}-${index}`}>
                    <img src={item.image} alt={item.name} />
                    <span className="order-history-item-name">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="order-history-item-price">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="order-history-footer">
                <span>Total</span>
                <span className="order-history-total">{formatPrice(detailsOrder.total)}</span>
              </div>
            </div>

            {detailsOrder.shippingAddress && (
              <div className="order-details-section">
                <h4>Dirección de envío</h4>
                <p>{detailsOrder.shippingAddress.fullName}</p>
                <p>{detailsOrder.shippingAddress.street}</p>
                <p>
                  {detailsOrder.shippingAddress.city}, {detailsOrder.shippingAddress.state},{' '}
                  {detailsOrder.shippingAddress.zipCode}
                </p>
                <p>{detailsOrder.shippingAddress.country}</p>
                {detailsOrder.shippingAddress.phone && (
                  <p>Tel: {formatPhoneDisplay(detailsOrder.shippingAddress.phone)}</p>
                )}
              </div>
            )}

            {detailsOrder.paymentMethod && (
              <div className="order-details-section">
                <h4>Método de pago</h4>
                <p>
                  {detailsOrder.paymentMethod.brand} •••• {detailsOrder.paymentMethod.last4}
                </p>
              </div>
            )}

            <div className="modal-actions">
              <button type="button" className="btn btn-primary" onClick={() => setDetailsOrder(null)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <CancelOrderModal
        order={cancelTarget}
        sending={cancelling}
        error={cancelError}
        onConfirm={handleConfirmCancel}
        onClose={() => setCancelTarget(null)}
      />
    </Layout>
  );
}
