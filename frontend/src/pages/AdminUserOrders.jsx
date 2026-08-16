import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import { EmptyBoxIcon, EyeIcon, SearchIcon } from '../components/icons';
import { getUserOrdersRequest } from '../api/orderApi';
import { getUserByIdRequest } from '../api/userApi';
import { formatPrice } from '../utils/format';
import { ORDER_STATUSES as STATUSES, statusLabels } from '../utils/orderStatus';
import './OrderHistory.css';
import './AdminProducts.css';
import './AdminOrders.css';
import './AdminUserOrders.css';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Historial de compras de un cliente puntual, visto desde el panel de
// administración: mismos filtros que AdminOrders pero acotados a un solo
// usuario, más el total gastado (sin contar pedidos cancelados).
export default function AdminUserOrders() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Se piden el usuario y sus pedidos en paralelo (no hace falta esperar uno
  // para pedir el otro, ambos solo dependen del mismo :id de la URL).
  useEffect(() => {
    setLoading(true);
    setError('');
    Promise.all([getUserByIdRequest(id), getUserOrdersRequest(id)])
      .then(([userRes, ordersRes]) => {
        setUser(userRes.data);
        setOrders(ordersRes.data);
      })
      .catch((err) => setError(err.response?.data?.message || 'No se pudieron cargar las compras'))
      .finally(() => setLoading(false));
  }, [id]);

  const term = search.trim().toLowerCase();
  const filteredOrders = orders.filter((order) => {
    if (statusFilter && order.status !== statusFilter) return false;
    if (!term) return true;
    return (
      order.orderNumber.toLowerCase().includes(term) ||
      order.products.some((p) => p.name.toLowerCase().includes(term))
    );
  });

  // Cuántos pedidos de este cliente hay en cada estatus, para las pestañas de filtro.
  const countByStatus = STATUSES.reduce((acc, s) => {
    acc[s] = orders.filter((o) => o.status === s).length;
    return acc;
  }, {});

  // Un pedido cancelado no cuenta como dinero gastado.
  const totalSpent = orders
    .filter((o) => o.status !== 'cancelado')
    .reduce((sum, o) => sum + o.total, 0);

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

  if (error && !user) {
    return (
      <Layout>
        <BackButton />
        <div className="container empty-state">
          <p>{error}</p>
          <Link to="/admin/usuarios" className="btn btn-primary">
            Volver a clientes
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <BackButton />
      <div className="container">
        <div className="user-orders-head card">
          {user?.profilePhoto && <img src={user.profilePhoto} alt={user.name} />}
          <div className="user-orders-head-info">
            <h1>Compras de {user?.name}</h1>
            <p>{user?.email}</p>
            <Link to={`/admin/usuarios/${id}`} className="user-orders-profile-link">
              Ver perfil completo
            </Link>
          </div>
          <div className="user-orders-totals">
            <div>
              <strong>{orders.length}</strong>
              <span>{orders.length === 1 ? 'pedido' : 'pedidos'}</span>
            </div>
            <div>
              <strong>{formatPrice(totalSpent)}</strong>
              <span>gastado (sin cancelados)</span>
            </div>
          </div>
        </div>

        {error && <p className="error-text" style={{ marginBottom: 16 }}>{error}</p>}

        {orders.length === 0 ? (
          <div className="empty-state card">
            <EmptyBoxIcon />
            <p>Este usuario aún no ha realizado ninguna compra.</p>
          </div>
        ) : (
          <>
            <div className="admin-orders-filters">
              <div className="admin-search-box">
                <SearchIcon size={16} />
                <input
                  type="text"
                  placeholder="Buscar por nº de pedido o producto..."
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
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <p className="admin-search-empty">No se encontraron pedidos que coincidan con los filtros.</p>
            ) : (
              <div className="order-history-list">
                {filteredOrders.map((order) => (
                  <div className="order-history-card card" key={order._id}>
                    <div className="order-history-header">
                      <div>
                        <div className="order-history-number">Pedido #{order.orderNumber}</div>
                        <div className="order-history-date">{formatDate(order.createdAt)}</div>
                      </div>
                      <span className={`badge user-orders-badge status-${order.status}`}>
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

                    <div className="order-history-actions">
                      <button
                        type="button"
                        className="btn btn-outline btn-sm"
                        onClick={() => navigate(`/admin/pedidos/${order._id}`)}
                      >
                        <EyeIcon size={15} /> Ver detalles del pedido
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
