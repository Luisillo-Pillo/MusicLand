import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import CancelOrderModal from '../components/CancelOrderModal';
import { UserIcon, LocationIcon, ReceiptIcon, TrashIcon } from '../components/icons';
import { getOrderByIdRequest, updateOrderStatusRequest, cancelOrderRequest } from '../api/orderApi';
import { formatPrice, formatPhoneDisplay } from '../utils/format';
import {
  ORDER_STATUSES,
  statusLabels,
  canCancel,
  isCancelled,
  canChangeStatus
} from '../utils/orderStatus';
import './OrderHistory.css';
import './AdminOrders.css';
import './AdminOrderDetail.css';

// Fecha larga con hora ("17 de agosto de 2026, 10:30") para el encabezado del
// pedido y el aviso de cancelación; distinta del formato corto que usa la
// tabla de AdminOrders, que no necesita tanto detalle en una fila.
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Vista de un solo pedido para el admin: mismo cambio de estatus/cancelación
// que en la tabla de AdminOrders, pero con el detalle completo (cliente,
// dirección, pago) que ahí no cabe.
export default function AdminOrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // saving: cambio de estatus normal (select) en curso. confirmCancel guarda
  // si el modal de cancelación está abierto; cancelling/cancelError son el
  // estado de ESE modal en específico, separados de saving/error de arriba.
  const [saving, setSaving] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [cancelError, setCancelError] = useState('');
  const [cancelling, setCancelling] = useState(false);

  // Carga (o recarga) el pedido cada vez que cambia el :id de la URL.
  useEffect(() => {
    setLoading(true);
    setError('');
    getOrderByIdRequest(id)
      .then(({ data }) => setOrder(data))
      .catch((err) => setError(err.response?.data?.message || 'No se pudo cargar el pedido'))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleStatusChange(status) {
    if (!order || status === order.status) return;

    // Cancelar devuelve stock al inventario: confirma y usa su propio endpoint.
    if (status === 'cancelado') {
      setConfirmCancel(true);
      return;
    }

    setSaving(true);
    setError('');
    try {
      const { data } = await updateOrderStatusRequest(order._id, status);
      // La respuesta de actualizar solo trae nombre y correo del cliente; se conserva
      // el objeto user completo que ya se había cargado en el detalle.
      setOrder((prev) => ({ ...data, user: prev.user }));
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo actualizar el estado del pedido');
    } finally {
      setSaving(false);
    }
  }

  // Confirmación del modal de CancelOrderModal: cancela con el motivo que
  // escribió el admin. Mismo truco de conservar order.user que arriba, por
  // la misma razón (la respuesta de cancelar tampoco trae el cliente completo).
  async function handleCancel(reason) {
    setCancelling(true);
    setCancelError('');
    try {
      const { data } = await cancelOrderRequest(order._id, reason);
      setOrder((prev) => ({ ...data, user: prev.user }));
      setConfirmCancel(false);
    } catch (err) {
      setCancelError(err.response?.data?.message || 'No se pudo cancelar el pedido');
    } finally {
      setCancelling(false);
    }
  }

  if (loading) {
    return (
      <Layout>
        <BackButton />
        <div className="spinner-wrapper">
          <div className="spinner" />
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <BackButton />
        <div className="container empty-state">
          <p>{error || 'No se encontró este pedido.'}</p>
          <Link to="/admin/pedidos" className="btn btn-primary">
            Ver todos los pedidos
          </Link>
        </div>
      </Layout>
    );
  }

  // Suma de unidades de todas las líneas, para el "(N artículos)" del título
  // de la sección de productos — no es lo mismo que order.products.length
  // (número de líneas distintas) si algún producto se compró en cantidad > 1.
  const totalUnits = order.products.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <Layout>
      <BackButton />
      <div className="container">
        {/* Encabezado: número de pedido + fecha a la izquierda, control de
            estatus a la derecha (selector editable, o una insignia fija si
            el pedido ya llegó a un estado final — ver canChangeStatus). */}
        <div className="order-detail-head">
          <div>
            <h1>Pedido #{order.orderNumber}</h1>
            <p className="order-detail-date">{formatDate(order.createdAt)}</p>
          </div>
          <div className="order-detail-status">
            {!canChangeStatus(order) ? (
              <span
                className={`badge admin-orders-final-badge status-${order.status}`}
                title="Este estado ya no puede modificarse"
              >
                {statusLabels[order.status]}
              </span>
            ) : (
              <>
                <label htmlFor="status">Estado</label>
                <select
                  id="status"
                  className={`admin-orders-status-select status-${order.status}`}
                  value={order.status}
                  disabled={saving}
                  onChange={(e) => handleStatusChange(e.target.value)}
                >
                  {ORDER_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {statusLabels[s]}
                    </option>
                  ))}
                </select>
                {canCancel(order, true) && (
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    disabled={saving}
                    onClick={() => setConfirmCancel(true)}
                  >
                    <TrashIcon size={14} /> Cancelar pedido
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Aviso fijo de cancelación: quién canceló y cuándo, más el motivo si
            se dio uno (el cliente siempre escribe uno; un admin puede cancelar
            sin él). Solo se muestra si el pedido está cancelado. */}
        {isCancelled(order) && (
          <div className="order-detail-cancelled-notice">
            <p>
              Pedido cancelado
              {order.cancelledAt && ` el ${formatDate(order.cancelledAt)}`}
              {order.cancelledBy === 'cliente' ? ' por el cliente' : ' desde administración'}. Las
              unidades volvieron al inventario y el estado ya no puede modificarse.
            </p>
            {order.cancellationReason && (
              <p className="order-detail-cancel-reason">
                <strong>Motivo:</strong> {order.cancellationReason}
              </p>
            )}
          </div>
        )}

        {/* Mismo tipo de aviso, pero para "entregado": explica por qué no hay
            selector de estatus ni botón de cancelar en este caso (ver arriba,
            canChangeStatus/canCancel ya los ocultan; esto es solo el porqué). */}
        {order.status === 'entregado' && (
          <div className="order-detail-delivered-notice">
            Pedido entregado. Su estado ya no puede modificarse y tampoco puede cancelarse; si el
            cliente necesita devolverlo, gestiónalo como una devolución.
          </div>
        )}

        {error && <p className="error-text" style={{ marginBottom: 16 }}>{error}</p>}

        <div className="order-detail-grid">
          {/* Columna principal: cada línea del pedido (imagen, nombre —
              enlazado al producto si todavía existe, precio unitario y
              subtotal) y el total al final. */}
          <div className="card order-detail-section">
            <h3>
              <ReceiptIcon size={17} /> Productos ({totalUnits} {totalUnits === 1 ? 'artículo' : 'artículos'})
            </h3>
            <div className="order-history-items">
              {order.products.map((item, index) => (
                <div className="order-history-item" key={`${order._id}-${index}`}>
                  <img src={item.image} alt={item.name} />
                  <span className="order-history-item-name">
                    {/* item.product es el id del producto original; puede faltar
                        si ese producto se borró del catálogo después de la compra
                        — en ese caso se muestra el nombre guardado sin enlace. */}
                    {item.product ? (
                      <Link to={`/producto/${item.product}`}>{item.name}</Link>
                    ) : (
                      item.name
                    )}
                    <span className="order-detail-unit">
                      {item.quantity} × {formatPrice(item.price)}
                    </span>
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
          </div>

          {/* Columna lateral: quién compró, a dónde se envía y con qué se
              pagó. Cada bloque es opcional por su cuenta (la cuenta del
              cliente pudo borrarse, y en teoría el pedido podría no traer
              dirección/pago si viniera de datos antiguos). */}
          <div className="order-detail-aside">
            <div className="card order-detail-section">
              <h3>
                <UserIcon size={17} /> Cliente
              </h3>
              {order.user ? (
                <div className="order-detail-customer">
                  {order.user.profilePhoto && (
                    <img src={order.user.profilePhoto} alt={order.user.name} />
                  )}
                  <div>
                    <Link to={`/admin/usuarios/${order.user._id}`} className="order-detail-customer-name">
                      {order.user.name}
                    </Link>
                    <p>{order.user.email}</p>
                    {order.user.phone && <p>{formatPhoneDisplay(order.user.phone)}</p>}
                  </div>
                </div>
              ) : (
                <p className="order-detail-muted">La cuenta de este cliente fue eliminada.</p>
              )}
              {order.user && (
                <Link
                  to={`/admin/usuarios/${order.user._id}/compras`}
                  className="btn btn-outline btn-sm"
                  style={{ marginTop: 12 }}
                >
                  Ver todas sus compras
                </Link>
              )}
            </div>

            {order.shippingAddress && (
              <div className="card order-detail-section">
                <h3>
                  <LocationIcon size={17} /> Envío
                </h3>
                <p>{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state},{' '}
                  {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
                {order.shippingAddress.phone && (
                  <p>Tel: {formatPhoneDisplay(order.shippingAddress.phone)}</p>
                )}
              </div>
            )}

            {/* Solo la marca y los últimos 4 dígitos: es lo único que este
                proyecto guarda del método de pago (nunca el número completo
                ni el CVV, ver paymentMethodSchema en el backend). */}
            {order.paymentMethod && (
              <div className="card order-detail-section">
                <h3>Pago</h3>
                <p>
                  {order.paymentMethod.brand} •••• {order.paymentMethod.last4}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <CancelOrderModal
        order={confirmCancel ? order : null}
        byAdmin
        sending={cancelling}
        error={cancelError}
        onConfirm={handleCancel}
        onClose={() => setConfirmCancel(false)}
      />
    </Layout>
  );
}
