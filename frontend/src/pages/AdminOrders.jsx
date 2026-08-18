import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import AdminNav from '../components/AdminNav';
import ConfirmModal from '../components/ConfirmModal';
import CancelOrderModal from '../components/CancelOrderModal';
import { EmptyBoxIcon, SearchIcon, ReceiptIcon, TrashIcon, ChevronDownIcon } from '../components/icons';
import {
  getAllOrdersRequest,
  updateOrderStatusRequest,
  cancelOrderRequest,
  deleteOrderRequest
} from '../api/orderApi';
import { formatPrice } from '../utils/format';
import {
  ORDER_STATUSES as STATUSES,
  statusLabels,
  canChangeStatus,
  canDelete
} from '../utils/orderStatus';
import './AdminProducts.css';
import './OrderHistory.css';
import './AdminOrders.css';

// Fecha corta con hora ("17 ago 2026, 10:30 a.m.") para que quepa en una
// columna de tabla; AdminOrderDetail usa una versión más larga para su
// encabezado, donde sí hay espacio de sobra.
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Panel de administración de pedidos: tabla de todos los pedidos, agrupada y
// plegable por estatus, con cambio de estatus en línea, cancelación (con
// motivo) y borrado de los que ya cerraron su ciclo.
export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [savingId, setSavingId] = useState(null);

  const [cancelTarget, setCancelTarget] = useState(null);
  const [cancelError, setCancelError] = useState('');
  const [cancelling, setCancelling] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState(null);

  // Estatus plegados. Se guarda lo colapsado (no lo expandido) para que un estatus
  // nuevo aparezca abierto por defecto.
  const [collapsed, setCollapsed] = useState(() => new Set());

  // Trae TODOS los pedidos de la tienda de una vez (sin paginar en el
  // servidor): el filtrado por estatus/búsqueda de abajo se hace en el
  // cliente sobre ese arreglo completo, así cambiar de filtro es instantáneo.
  function loadOrders() {
    setLoading(true);
    setError('');
    return getAllOrdersRequest()
      .then(({ data }) => setOrders(data))
      .catch((err) => setError(err.response?.data?.message || 'No se pudieron cargar los pedidos'))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadOrders();
  }, []);

  // Pliega/expande el grupo de la tabla correspondiente a un estatus.
  function toggleGroup(status) {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(status)) next.delete(status);
      else next.add(status);
      return next;
    });
  }

  async function handleStatusChange(order, status) {
    if (status === order.status) return;

    // Cancelar devuelve stock al inventario, así que pasa por su propio flujo con
    // motivo y confirmación en vez de asignarse como un estatus cualquiera.
    if (status === 'cancelado') {
      setCancelError('');
      setCancelTarget(order);
      return;
    }

    setSavingId(order._id);
    setError('');
    try {
      const { data } = await updateOrderStatusRequest(order._id, status);
      setOrders((prev) => prev.map((o) => (o._id === data._id ? data : o)));
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo actualizar el estado del pedido');
    } finally {
      setSavingId(null);
    }
  }

  async function handleConfirmCancel(reason) {
    if (!cancelTarget) return;
    setCancelling(true);
    setCancelError('');
    try {
      const { data } = await cancelOrderRequest(cancelTarget._id, reason);
      setOrders((prev) => prev.map((o) => (o._id === data._id ? data : o)));
      setCancelTarget(null);
    } catch (err) {
      setCancelError(err.response?.data?.message || 'No se pudo cancelar el pedido');
    } finally {
      setCancelling(false);
    }
  }

  // Confirmación del modal de borrado. Solo aplica a pedidos ya en un estatus
  // final (canDelete lo exige antes de mostrar el botón, ver más abajo en el
  // JSX): borrar uno activo perdería el rastro de mercancía comprometida.
  async function handleConfirmDelete() {
    if (!deleteTarget) return;
    const target = deleteTarget;
    setDeleteTarget(null);
    setError('');
    try {
      await deleteOrderRequest(target._id);
      setOrders((prev) => prev.filter((o) => o._id !== target._id));
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo eliminar el pedido');
    }
  }

  const term = search.trim().toLowerCase();
  const filteredOrders = orders
    .filter((order) => {
      if (statusFilter && order.status !== statusFilter) return false;
      if (!term) return true;
      return (
        order.orderNumber.toLowerCase().includes(term) ||
        (order.user?.name || '').toLowerCase().includes(term) ||
        (order.user?.email || '').toLowerCase().includes(term)
      );
    })
    // Se agrupan por estatus siguiendo el avance del pedido (pendiente primero,
    // cancelado al final) y, dentro de cada grupo, del más reciente al más antiguo.
    .sort((a, b) => {
      const rank = STATUSES.indexOf(a.status) - STATUSES.indexOf(b.status);
      if (rank !== 0) return rank;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const countByStatus = STATUSES.reduce((acc, s) => {
    acc[s] = orders.filter((o) => o.status === s).length;
    return acc;
  }, {});

  // Cuántos pedidos de cada estatus quedan tras aplicar los filtros, para que la
  // cabecera del grupo diga cuántos oculta al plegarse.
  const visibleByStatus = filteredOrders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});

  // Con un filtro de estatus activo solo hay un grupo posible (no tendría
  // sentido plegar/expandir uno solo); sin filtro, se listan los estatus que
  // de verdad tienen al menos un pedido visible tras la búsqueda.
  const groupsShown = statusFilter ? [statusFilter] : STATUSES.filter((s) => visibleByStatus[s]);
  const allCollapsed = groupsShown.length > 0 && groupsShown.every((s) => collapsed.has(s));

  return (
    <Layout>
      <BackButton />
      <div className="container">
        <div className="admin-header">
          <h1>Administración de pedidos</h1>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            {orders.length} {orders.length === 1 ? 'pedido registrado' : 'pedidos registrados'}
          </span>
        </div>

        <AdminNav />

        <div className="admin-orders-filters">
          <div className="admin-search-box">
            <SearchIcon size={16} />
            <input
              type="text"
              placeholder="Buscar por nº de pedido, cliente o correo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="admin-orders-status-tabs">
            <button
              type="button"
              className={statusFilter === '' ? 'active' : ''}
              onClick={() => setStatusFilter('')}
            >
              Todos ({orders.length})
            </button>
            {STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                className={statusFilter === s ? 'active' : ''}
                onClick={() => setStatusFilter(s)}
              >
                {statusLabels[s]} ({countByStatus[s]})
              </button>
            ))}

            {groupsShown.length > 1 && (
              <button
                type="button"
                className="admin-orders-collapse-all"
                onClick={() => setCollapsed(allCollapsed ? new Set() : new Set(groupsShown))}
              >
                {allCollapsed ? 'Expandir todo' : 'Contraer todo'}
              </button>
            )}
          </div>
        </div>

        {error && <p className="error-text" style={{ marginBottom: 16 }}>{error}</p>}

        {loading ? (
          <div className="spinner-wrapper">
            <div className="spinner" />
          </div>
        ) : orders.length === 0 ? (
          <div className="empty-state card">
            <EmptyBoxIcon />
            <p>Todavía no hay pedidos registrados.</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <p className="admin-search-empty">No se encontraron pedidos que coincidan con los filtros.</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Pedido</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Artículos</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {/* filteredOrders ya viene ordenado por estatus (ver el .sort()
                    de arriba), así que basta comparar cada fila con la anterior
                    para saber si empieza un grupo nuevo — no hace falta un
                    segundo recorrido para armar los grupos por separado.
                    Fragment (no <>) porque hace falta la prop `key` en el nivel
                    del .map(), y cada "fila" en realidad son dos <tr> (la del
                    encabezado plegable + la del pedido) que deben ir sueltas
                    dentro de <tbody>, no envueltas en un contenedor. */}
                {filteredOrders.map((order, index) => {
                  const startsGroup = order.status !== filteredOrders[index - 1]?.status;
                  const isCollapsed = collapsed.has(order.status);

                  return (
                    <Fragment key={order._id}>
                      {startsGroup && (
                        <tr className="admin-orders-group-row">
                          <td colSpan={7}>
                            <button
                              type="button"
                              className="admin-orders-group-toggle"
                              aria-expanded={!isCollapsed}
                              onClick={() => toggleGroup(order.status)}
                            >
                              <ChevronDownIcon
                                size={14}
                                className={`admin-orders-chevron ${isCollapsed ? 'collapsed' : ''}`}
                              />
                              <span className={`admin-orders-group-dot status-${order.status}`} />
                              {statusLabels[order.status]}
                              <span className="admin-orders-group-count">
                                {visibleByStatus[order.status]}
                              </span>
                              {isCollapsed && (
                                <span className="admin-orders-group-hint">
                                  {visibleByStatus[order.status] === 1
                                    ? '1 pedido oculto'
                                    : `${visibleByStatus[order.status]} pedidos ocultos`}
                                </span>
                              )}
                            </button>
                          </td>
                        </tr>
                      )}

                      {!isCollapsed && (
                        <tr>
                          <td className="admin-orders-number" data-label="Pedido">#{order.orderNumber}</td>
                          <td data-label="Cliente">
                            {order.user ? (
                              <Link
                                to={`/admin/usuarios/${order.user._id}`}
                                className="admin-orders-user-link"
                              >
                                {order.user.name}
                                <span>{order.user.email}</span>
                              </Link>
                            ) : (
                              <span style={{ color: 'var(--color-text-muted)' }}>Usuario eliminado</span>
                            )}
                          </td>
                          <td className="order-history-date" data-label="Fecha">{formatDate(order.createdAt)}</td>
                          <td data-label="Artículos">{order.products.reduce((sum, p) => sum + p.quantity, 0)}</td>
                          <td style={{ fontWeight: 700 }} data-label="Total">{formatPrice(order.total)}</td>
                          <td data-label="Estado">
                            {canChangeStatus(order) ? (
                              <select
                                className={`admin-orders-status-select status-${order.status}`}
                                value={order.status}
                                disabled={savingId === order._id}
                                onChange={(e) => handleStatusChange(order, e.target.value)}
                                aria-label={`Estado del pedido ${order.orderNumber}`}
                              >
                                {STATUSES.map((s) => (
                                  <option key={s} value={s}>
                                    {statusLabels[s]}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <span
                                className={`badge admin-orders-final-badge status-${order.status}`}
                                title="Este estado ya no puede modificarse"
                              >
                                {statusLabels[order.status]}
                              </span>
                            )}
                          </td>
                          <td data-label="Acciones">
                            <div className="admin-table-actions">
                              <Link
                                to={`/admin/pedidos/${order._id}`}
                                className="btn btn-outline btn-sm"
                              >
                                <ReceiptIcon size={14} /> Detalles
                              </Link>
                              {canDelete(order) && (
                                <button
                                  type="button"
                                  className="btn btn-danger btn-sm"
                                  onClick={() => setDeleteTarget(order)}
                                  aria-label={`Eliminar el pedido ${order.orderNumber}`}
                                  title="Eliminar pedido"
                                >
                                  <TrashIcon size={14} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <CancelOrderModal
        order={cancelTarget}
        byAdmin
        sending={cancelling}
        error={cancelError}
        onConfirm={handleConfirmCancel}
        onClose={() => setCancelTarget(null)}
      />

      <ConfirmModal
        open={!!deleteTarget}
        title="Eliminar pedido"
        message={`¿Seguro que deseas eliminar el pedido #${deleteTarget?.orderNumber} de ${
          deleteTarget?.user?.name || 'un usuario eliminado'
        }? Desaparecerá del historial del cliente y no se puede deshacer.`}
        confirmLabel="Eliminar"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </Layout>
  );
}
