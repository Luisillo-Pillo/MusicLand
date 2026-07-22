import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import AdminNav from '../components/AdminNav';
import ConfirmModal from '../components/ConfirmModal';
import { MenuIcon, UserIcon, EditIcon, TrashIcon, SearchIcon } from '../components/icons';
import { useAuth } from '../context/AuthContext';
import { getAllUsersRequest, updateUserRoleRequest, deleteUserRequest } from '../api/userApi';
import './AdminProducts.css';
import './AdminUsers.css';

const roleLabels = {
  admin: 'Administrador',
  user: 'Cliente'
};

function formatLastLogin(dateStr) {
  if (!dateStr) return 'Nunca';
  return new Date(dateStr).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function RowActionsMenu({ items }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target) &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    function updatePosition() {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      const menuHeight = menuRef.current ? menuRef.current.offsetHeight : 0;
      const spaceBelow = window.innerHeight - rect.bottom;
      const openUpward = menuHeight > 0 && spaceBelow < menuHeight + 12;
      const top = openUpward ? Math.max(8, rect.top - menuHeight - 6) : rect.bottom + 6;
      setPosition({ top, left: rect.left });
    }
    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        className="row-actions-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-label="Abrir acciones"
      >
        <MenuIcon size={18} />
      </button>
      {open &&
        createPortal(
          <div
            className="row-actions-dropdown"
            ref={menuRef}
            style={{ top: position.top, left: position.left }}
          >
            {items.map((item) => (
              <button
                key={item.label}
                type="button"
                disabled={item.disabled}
                title={item.title || ''}
                className={item.danger ? 'row-actions-danger' : ''}
                onClick={() => {
                  setOpen(false);
                  item.onClick();
                }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}

function UsersTable({ users, currentUserId, onToggleRole, onRequestDelete, onViewProfile }) {
  if (!users.length) {
    return <p className="admin-users-empty">No hay usuarios en esta categoría.</p>;
  }

  return (
    <div className="admin-table-wrapper">
      <table className="admin-table admin-table-fixed">
        <colgroup>
          <col style={{ width: '6%' }} />
          <col style={{ width: '17%' }} />
          <col style={{ width: '21%' }} />
          <col style={{ width: '12%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '9%' }} />
          <col style={{ width: '12%' }} />
          <col style={{ width: '13%' }} />
        </colgroup>
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Rol</th>
            <th>Compras</th>
            <th>Conexión</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const isSelf = user._id === currentUserId;
            const items = [
              {
                label: 'Ver perfil',
                icon: <UserIcon size={15} />,
                onClick: () => onViewProfile(user)
              },
              user.role === 'admin'
                ? {
                    label: 'Quitar admin',
                    icon: <EditIcon size={15} />,
                    disabled: isSelf,
                    title: isSelf ? 'No puedes quitarte tu propio rol de administrador' : '',
                    onClick: () => onToggleRole(user, 'user')
                  }
                : {
                    label: 'Hacer admin',
                    icon: <EditIcon size={15} />,
                    onClick: () => onToggleRole(user, 'admin')
                  },
              {
                label: 'Eliminar usuario',
                icon: <TrashIcon size={15} />,
                disabled: isSelf,
                title: isSelf ? 'No puedes borrar tu propia cuenta' : '',
                danger: true,
                onClick: () => onRequestDelete(user)
              }
            ];

            return (
              <tr key={user._id}>
                <td>
                  <img className="admin-user-thumb" src={user.profilePhoto} alt={user.name} />
                </td>
                <td title={user.name}>
                  {user.name}
                  {isSelf && <span className="badge admin-users-you-badge">Tú</span>}
                </td>
                <td title={user.email}>{user.email}</td>
                <td title={user.phone || ''}>{user.phone || '—'}</td>
                <td>
                  <span className="badge">{roleLabels[user.role] || user.role}</span>
                </td>
                <td>{user.totalPurchases}</td>
                <td>{formatLastLogin(user.lastLogin)}</td>
                <td>
                  <RowActionsMenu items={items} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminUsers() {
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState('');

  function loadUsers() {
    setLoading(true);
    return getAllUsersRequest()
      .then(({ data }) => setUsers(data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function handleToggleRole(user, role) {
    setError('');
    try {
      await updateUserRoleRequest(user._id, role);
      await loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo actualizar el rol del usuario');
    }
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return;
    setError('');
    try {
      await deleteUserRequest(deleteTarget._id);
      setDeleteTarget(null);
      await loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo eliminar el usuario');
      setDeleteTarget(null);
    }
  }

  function handleViewProfile(user) {
    navigate(`/admin/usuarios/${user._id}`);
  }

  const term = search.trim().toLowerCase();
  const filteredUsers = users.filter((user) => {
    if (!term) return true;
    return (
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      (user.phone || '').toLowerCase().includes(term)
    );
  });

  const admins = filteredUsers
    .filter((user) => user.role === 'admin')
    .sort((a, b) => (a._id === currentUser?._id ? -1 : b._id === currentUser?._id ? 1 : 0));
  const clients = filteredUsers.filter((user) => user.role !== 'admin');

  return (
    <Layout>
      <BackButton />
      <div className="container">
        <div className="admin-header">
          <h1>Administración de clientes</h1>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            {users.length} usuarios registrados
          </span>
        </div>

        <AdminNav />

        <div className="admin-search-box">
          <SearchIcon size={16} />
          <input
            type="text"
            placeholder="Buscar por nombre, correo o teléfono..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {error && <p className="error-text" style={{ marginBottom: 16 }}>{error}</p>}

        {loading ? (
          <div className="spinner-wrapper">
            <div className="spinner" />
          </div>
        ) : (
          <>
            <h3 className="admin-users-section-title">Administradores ({admins.length})</h3>
            <UsersTable
              users={admins}
              currentUserId={currentUser?._id}
              onToggleRole={handleToggleRole}
              onRequestDelete={setDeleteTarget}
              onViewProfile={handleViewProfile}
            />

            <h3 className="admin-users-section-title">Clientes ({clients.length})</h3>
            <UsersTable
              users={clients}
              currentUserId={currentUser?._id}
              onToggleRole={handleToggleRole}
              onRequestDelete={setDeleteTarget}
              onViewProfile={handleViewProfile}
            />
          </>
        )}
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="Eliminar usuario"
        message={`¿Seguro que deseas eliminar la cuenta de "${deleteTarget?.name}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </Layout>
  );
}
