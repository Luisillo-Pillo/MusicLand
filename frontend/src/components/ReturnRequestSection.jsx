import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMyOrdersRequest, requestReturnRequest } from '../api/orderApi';
import { canRequestReturn } from '../utils/orderStatus';
import { formatPrice } from '../utils/format';
import { ReturnIcon } from './icons';
import './ReturnRequestSection.css';

const MAX_REASON = 1000;

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function ReturnRequestSection() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [reason, setReason] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    getMyOrdersRequest()
      .then(({ data }) => setOrders(data.filter(canRequestReturn)))
      .catch((err) => setLoadError(err.response?.data?.message || 'No se pudo cargar tu historial de compras.'))
      .finally(() => setLoading(false));
  }, [user]);

  const selectedOrder = useMemo(
    () => orders.find((o) => o._id === selectedOrderId) || null,
    [orders, selectedOrderId]
  );

  const allSelected = !!selectedOrder && selectedProductIds.length === selectedOrder.products.length;

  function handleSelectOrder(orderId) {
    setSelectedOrderId(orderId);
    setSelectedProductIds([]);
    setError('');
    setSuccess(false);
  }

  function toggleProduct(productId) {
    setSelectedProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }

  function toggleAll() {
    if (!selectedOrder) return;
    setSelectedProductIds(allSelected ? [] : selectedOrder.products.filter((p) => p.product).map((p) => p.product));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedOrder) {
      setError('Selecciona el pedido que quieres devolver.');
      return;
    }
    if (selectedProductIds.length === 0) {
      setError('Selecciona al menos un producto (o el pedido completo) para devolver.');
      return;
    }
    if (!reason.trim()) {
      setError('Cuéntanos el motivo de la devolución.');
      return;
    }

    setSending(true);
    setError('');
    try {
      await requestReturnRequest(selectedOrder._id, {
        items: selectedProductIds.map((productId) => ({ productId })),
        fullOrder: allSelected,
        reason: reason.trim()
      });
      setSuccess(true);
      setOrders((prev) => prev.filter((o) => o._id !== selectedOrder._id));
      setSelectedOrderId('');
      setSelectedProductIds([]);
      setReason('');
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo enviar la solicitud. Intenta de nuevo.');
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="card return-request">
      <h2>
        <ReturnIcon size={20} /> Solicitar una devolución
      </h2>

      {!user ? (
        <div className="return-request-guest">
          <p>Inicia sesión para solicitar la devolución de un pedido.</p>
          <Link to="/login" state={{ from: '/envios-y-devoluciones' }} className="btn btn-primary btn-sm">
            Iniciar sesión
          </Link>
        </div>
      ) : loading ? (
        <div className="spinner-wrapper">
          <div className="spinner" />
        </div>
      ) : loadError ? (
        <p className="error-text">{loadError}</p>
      ) : success ? (
        <div className="return-request-success">
          <p>
            <strong>Solicitud enviada.</strong> Revisaremos tu pedido y te contactaremos por correo para
            confirmar los siguientes pasos.
          </p>
          <button type="button" className="btn btn-outline btn-sm" onClick={() => setSuccess(false)}>
            Solicitar otra devolución
          </button>
        </div>
      ) : orders.length === 0 ? (
        <p className="return-request-empty">
          No tienes pedidos entregados disponibles para devolución en este momento. Puedes revisar tu{' '}
          <Link to="/historial-compras">historial de compras</Link>.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="return-order">Pedido</label>
            <select
              id="return-order"
              value={selectedOrderId}
              onChange={(e) => handleSelectOrder(e.target.value)}
            >
              <option value="">Selecciona un pedido...</option>
              {orders.map((order) => (
                <option key={order._id} value={order._id}>
                  #{order.orderNumber} — {formatDate(order.createdAt)} — {formatPrice(order.total)}
                </option>
              ))}
            </select>
          </div>

          {selectedOrder && (
            <div className="form-group">
              <label>Productos a devolver</label>
              <div className="return-request-items">
                <label className="return-request-item return-request-item-all">
                  <input type="checkbox" checked={allSelected} onChange={toggleAll} />
                  Todo el pedido
                </label>
                {selectedOrder.products.map((item, index) => (
                  <label className="return-request-item" key={`${item.product || 'x'}-${index}`}>
                    <input
                      type="checkbox"
                      disabled={!item.product}
                      checked={!!item.product && selectedProductIds.includes(item.product)}
                      onChange={() => item.product && toggleProduct(item.product)}
                    />
                    <span className="return-request-item-name">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="return-request-item-price">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="return-reason">Motivo de la devolución</label>
            <textarea
              id="return-reason"
              rows={4}
              maxLength={MAX_REASON}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Cuéntanos qué pasó con tu producto..."
            />
            <div className="return-request-meta">
              <span>{reason.length}/{MAX_REASON}</span>
            </div>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="btn btn-primary" disabled={sending}>
            {sending ? 'Enviando...' : 'Enviar solicitud'}
          </button>
        </form>
      )}
    </section>
  );
}
