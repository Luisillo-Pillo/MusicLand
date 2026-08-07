import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import AdminNav from '../components/AdminNav';
import ConfirmModal from '../components/ConfirmModal';
import { EmptyBoxIcon, SearchIcon, EyeIcon, TrashIcon } from '../components/icons';
import {
  getReturnRequestsRequest,
  updateReturnRequestStatusRequest,
  deleteReturnRequestRequest
} from '../api/orderApi';
import { formatPrice } from '../utils/format';
import { returnStatusLabels } from '../utils/orderStatus';
import './AdminProducts.css';
import './AdminReturns.css';

const RETURN_STATUSES = ['pendiente', 'aprobada', 'rechazada'];

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default function AdminReturns() {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [savingId, setSavingId] = useState(null);
  const [detailTarget, setDetailTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  function loadReturns() {
    setLoading(true);
    setError('');
    return getReturnRequestsRequest()
      .then(({ data }) => setReturns(data))
      .catch((err) => setError(err.response?.data?.message || 'No se pudieron cargar las devoluciones'))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadReturns();
  }, []);

  async function handleStatusChange(order, status) {
    if (status === order.returnRequest.status) return;
    setSavingId(order._id);
    setError('');
    try {
      const { data } = await updateReturnRequestStatusRequest(order._id, status);
      setReturns((prev) => prev.map((o) => (o._id === data._id ? data : o)));
      setDetailTarget((prev) => (prev && prev._id === data._id ? data : prev));
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo actualizar el estado de la devolución');
    } finally {
      setSavingId(null);
    }
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return;
    const target = deleteTarget;
    setDeleteTarget(null);
    setError('');
    try {
      await deleteReturnRequestRequest(target._id);
      setReturns((prev) => prev.filter((o) => o._id !== target._id));
      setDetailTarget((prev) => (prev && prev._id === target._id ? null : prev));
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo eliminar la solicitud de devolución');
    }
  }

  const term = search.trim().toLowerCase();
  const filteredReturns = returns
    .filter((order) => {
      if (statusFilter && order.returnRequest.status !== statusFilter) return false;
      if (!term) return true;
      return (
        order.orderNumber.toLowerCase().includes(term) ||
        (order.user?.name || '').toLowerCase().includes(term) ||
        (order.user?.email || '').toLowerCase().includes(term)
      );
    })
    .sort((a, b) => new Date(b.returnRequest.requestedAt) - new Date(a.returnRequest.requestedAt));

  const countByStatus = RETURN_STATUSES.reduce((acc, s) => {
    acc[s] = returns.filter((o) => o.returnRequest.status === s).length;
    return acc;
  }, {});

  return (
    <Layout>
      <BackButton />
      <div className="container">
        <div className="admin-header">
          <h1>Devoluciones</h1>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            {returns.length} {returns.length === 1 ? 'solicitud registrada' : 'solicitudes registradas'}
          </span>
        </div>

        <AdminNav />

        <div className="admin-returns-filters">
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
            <button type="button" className={statusFilter === '' ? 'active' : ''} onClick={() => setStatusFilter('')}>
              Todas ({returns.length})
            </button>
            {RETURN_STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                className={statusFilter === s ? 'active' : ''}
                onClick={() => setStatusFilter(s)}
              >
                {returnStatusLabels[s]} ({countByStatus[s]})
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="error-text" style={{ marginBottom: 16 }}>
            {error}
          </p>
        )}

        {loading ? (
          <div className="spinner-wrapper">
            <div className="spinner" />
          </div>
        ) : returns.length === 0 ? (
          <div className="empty-state card">
            <EmptyBoxIcon />
            <p>Todavía no hay solicitudes de devolución.</p>
          </div>
        ) : filteredReturns.length === 0 ? (
          <p className="admin-search-empty">No se encontraron devoluciones que coincidan con los filtros.</p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Pedido</th>
                  <th>Cliente</th>
                  <th>Solicitada</th>
                  <th>Alcance</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredReturns.map((order) => (
                  <tr key={order._id}>
                    <td className="admin-orders-number" data-label="Pedido">
                      #{order.orderNumber}
                    </td>
                    <td data-label="Cliente">
                      {order.user ? (
                        <Link to={`/admin/usuarios/${order.user._id}`} className="admin-orders-user-link">
                          {order.user.name}
                          <span>{order.user.email}</span>
                        </Link>
                      ) : (
                        <span style={{ color: 'var(--color-text-muted)' }}>Usuario eliminado</span>
                      )}
                    </td>
                    <td className="order-history-date" data-label="Solicitada">
                      {formatDate(order.returnRequest.requestedAt)}
                    </td>
                    <td data-label="Alcance">
                      {order.returnRequest.fullOrder ? 'Pedido completo' : 'Productos específicos'}
                    </td>
                    <td data-label="Estado">
                      <select
                        className={`admin-returns-status-select status-${order.returnRequest.status}`}
                        value={order.returnRequest.status}
                        disabled={savingId === order._id}
                        onChange={(e) => handleStatusChange(order, e.target.value)}
                        aria-label={`Estado de la devolución del pedido ${order.orderNumber}`}
                      >
                        {RETURN_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {returnStatusLabels[s]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td data-label="Acciones">
                      <div className="admin-table-actions">
                        <button
                          type="button"
                          className="btn btn-outline btn-sm"
                          onClick={() => setDetailTarget(order)}
                        >
                          <EyeIcon size={14} /> Ver detalle
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => setDeleteTarget(order)}
                          aria-label={`Eliminar la solicitud de devolución del pedido ${order.orderNumber}`}
                          title="Eliminar solicitud"
                        >
                          <TrashIcon size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {detailTarget && (
        <div className="modal-overlay" onClick={() => setDetailTarget(null)}>
          <div className="modal-box admin-returns-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Devolución del pedido #{detailTarget.orderNumber}</h3>

            <div className="admin-returns-modal-meta">
              <span>
                {detailTarget.user ? `${detailTarget.user.name} (${detailTarget.user.email})` : 'Usuario eliminado'}
              </span>
              <span>Solicitada el {formatDate(detailTarget.returnRequest.requestedAt)}</span>
            </div>

            <p className="admin-returns-modal-scope">
              <strong>Alcance:</strong>{' '}
              {detailTarget.returnRequest.fullOrder ? 'Pedido completo' : 'Productos específicos'}
            </p>

            <div className="order-history-items">
              {detailTarget.returnRequest.items.map((item, index) => (
                <div className="order-history-item" key={`${item.product || 'x'}-${index}`}>
                  <span className="order-history-item-name">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="order-history-item-price">
                    {formatPrice((detailTarget.products.find((p) => p.product?.toString() === item.product)?.price || 0) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <p className="admin-returns-modal-reason-label">
              <strong>Motivo:</strong>
            </p>
            <p className="admin-returns-modal-reason">{detailTarget.returnRequest.reason}</p>

            <div className="form-group">
              <label htmlFor="return-detail-status">Estado</label>
              <select
                id="return-detail-status"
                className={`admin-returns-status-select status-${detailTarget.returnRequest.status}`}
                value={detailTarget.returnRequest.status}
                disabled={savingId === detailTarget._id}
                onChange={(e) => handleStatusChange(detailTarget, e.target.value)}
              >
                {RETURN_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {returnStatusLabels[s]}
                  </option>
                ))}
              </select>
            </div>

            <div className="modal-actions">
              <button type="button" className="btn btn-primary" onClick={() => setDetailTarget(null)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title="Eliminar solicitud de devolución"
        message={`¿Seguro que deseas eliminar la solicitud de devolución del pedido #${deleteTarget?.orderNumber}? El pedido se conserva, solo se borra la solicitud. Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </Layout>
  );
}
