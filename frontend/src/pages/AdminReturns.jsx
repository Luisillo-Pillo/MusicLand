import { useEffect, useMemo, useState } from 'react';
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
  // 'returns' guarda los pedidos tal cual los da la API (cada uno con su
  // arreglo returnRequests); 'rows' los aplana a una fila por solicitud, que
  // es la unidad real de esta pantalla — un pedido con devoluciones parciales
  // aparece varias veces, una por cada solicitud.
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

  const rows = useMemo(
    () =>
      returns.flatMap((order) =>
        (order.returnRequests || []).map((request) => ({
          rowId: request._id,
          order,
          request
        }))
      ),
    [returns]
  );

  function replaceOrder(updatedOrder) {
    setReturns((prev) => prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o)));
  }

  async function handleStatusChange(row, status) {
    if (status === row.request.status) return;
    setSavingId(row.rowId);
    setError('');
    try {
      const { data } = await updateReturnRequestStatusRequest(row.order._id, row.request._id, status);
      replaceOrder(data);
      setDetailTarget((prev) => {
        if (!prev || prev.rowId !== row.rowId) return prev;
        const updatedRequest = data.returnRequests.find((r) => r._id === row.request._id);
        return updatedRequest ? { rowId: row.rowId, order: data, request: updatedRequest } : null;
      });
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
      await deleteReturnRequestRequest(target.order._id, target.request._id);
      setReturns((prev) =>
        prev
          .map((o) =>
            o._id === target.order._id
              ? { ...o, returnRequests: o.returnRequests.filter((r) => r._id !== target.request._id) }
              : o
          )
          .filter((o) => o.returnRequests.length > 0)
      );
      setDetailTarget((prev) => (prev && prev.rowId === target.rowId ? null : prev));
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo eliminar la solicitud de devolución');
    }
  }

  const term = search.trim().toLowerCase();
  const filteredRows = rows
    .filter((row) => {
      if (statusFilter && row.request.status !== statusFilter) return false;
      if (!term) return true;
      return (
        row.order.orderNumber.toLowerCase().includes(term) ||
        (row.order.user?.name || '').toLowerCase().includes(term) ||
        (row.order.user?.email || '').toLowerCase().includes(term)
      );
    })
    .sort((a, b) => new Date(b.request.requestedAt) - new Date(a.request.requestedAt));

  const countByStatus = RETURN_STATUSES.reduce((acc, s) => {
    acc[s] = rows.filter((row) => row.request.status === s).length;
    return acc;
  }, {});

  return (
    <Layout>
      <BackButton />
      <div className="container">
        <div className="admin-header">
          <h1>Devoluciones</h1>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            {rows.length} {rows.length === 1 ? 'solicitud registrada' : 'solicitudes registradas'}
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
              Todas ({rows.length})
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
        ) : rows.length === 0 ? (
          <div className="empty-state card">
            <EmptyBoxIcon />
            <p>Todavía no hay solicitudes de devolución.</p>
          </div>
        ) : filteredRows.length === 0 ? (
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
                {filteredRows.map((row) => (
                  <tr key={row.rowId}>
                    <td className="admin-orders-number" data-label="Pedido">
                      #{row.order.orderNumber}
                    </td>
                    <td data-label="Cliente">
                      {row.order.user ? (
                        <Link to={`/admin/usuarios/${row.order.user._id}`} className="admin-orders-user-link">
                          {row.order.user.name}
                          <span>{row.order.user.email}</span>
                        </Link>
                      ) : (
                        <span style={{ color: 'var(--color-text-muted)' }}>Usuario eliminado</span>
                      )}
                    </td>
                    <td className="order-history-date" data-label="Solicitada">
                      {formatDate(row.request.requestedAt)}
                    </td>
                    <td data-label="Alcance">
                      {row.request.fullOrder ? 'Pedido completo' : 'Productos específicos'}
                    </td>
                    <td data-label="Estado">
                      <select
                        className={`admin-returns-status-select status-${row.request.status}`}
                        value={row.request.status}
                        disabled={savingId === row.rowId}
                        onChange={(e) => handleStatusChange(row, e.target.value)}
                        aria-label={`Estado de la devolución del pedido ${row.order.orderNumber}`}
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
                        <button type="button" className="btn btn-outline btn-sm" onClick={() => setDetailTarget(row)}>
                          <EyeIcon size={14} /> Ver detalle
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => setDeleteTarget(row)}
                          aria-label={`Eliminar la solicitud de devolución del pedido ${row.order.orderNumber}`}
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
            <h3>Devolución del pedido #{detailTarget.order.orderNumber}</h3>

            <div className="admin-returns-modal-meta">
              <span>
                {detailTarget.order.user
                  ? `${detailTarget.order.user.name} (${detailTarget.order.user.email})`
                  : 'Usuario eliminado'}
              </span>
              <span>Solicitada el {formatDate(detailTarget.request.requestedAt)}</span>
            </div>

            <p className="admin-returns-modal-scope">
              <strong>Alcance:</strong>{' '}
              {detailTarget.request.fullOrder ? 'Pedido completo' : 'Productos específicos'}
            </p>

            <div className="order-history-items">
              {detailTarget.request.items.map((item, index) => (
                <div className="order-history-item" key={`${item.product || 'x'}-${index}`}>
                  <span className="order-history-item-name">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="order-history-item-price">
                    {formatPrice(
                      (detailTarget.order.products.find((p) => p.product?.toString() === item.product)?.price || 0) *
                        item.quantity
                    )}
                  </span>
                </div>
              ))}
            </div>

            <p className="admin-returns-modal-reason-label">
              <strong>Motivo:</strong>
            </p>
            <p className="admin-returns-modal-reason">{detailTarget.request.reason}</p>

            <div className="form-group">
              <label htmlFor="return-detail-status">Estado</label>
              <select
                id="return-detail-status"
                className={`admin-returns-status-select status-${detailTarget.request.status}`}
                value={detailTarget.request.status}
                disabled={savingId === detailTarget.rowId}
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
        message={`¿Seguro que deseas eliminar esta solicitud de devolución del pedido #${deleteTarget?.order.orderNumber}? El pedido se conserva, solo se borra la solicitud. Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </Layout>
  );
}
