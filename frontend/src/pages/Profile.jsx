import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import ConfirmModal from '../components/ConfirmModal';
import { useAuth } from '../context/AuthContext';
import { EditIcon, LogoutIcon, PhoneIcon, ReceiptIcon, LocationIcon, TrashIcon } from '../components/icons';
import { getMyOrdersRequest } from '../api/orderApi';
import { deleteAddressRequest, deletePaymentMethodRequest } from '../api/userApi';
import { digitsOnly, formatPhoneDisplay } from '../utils/format';
import './Profile.css';

const roleLabels = {
  admin: 'Administrador',
  user: 'Cliente'
};

// Perfil del usuario: datos personales (editables), conteo de compras y las
// direcciones/métodos de pago que se fueron guardando en cada checkout
// (aquí solo se pueden borrar; agregar uno nuevo se hace desde Checkout).
export default function Profile() {
  const { user, updateProfile, logout, setUserData } = useAuth();
  const navigate = useNavigate();

  // editing alterna entre la vista de solo lectura y el formulario de edición.
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // null mientras se cargan los pedidos: distinto de 0 (que sí es "ninguna
  // compra"), así el contador puede mostrar "—" en vez de "0" durante la carga.
  const [totalPurchases, setTotalPurchases] = useState(null);
  const [savedError, setSavedError] = useState('');
  // deleteTarget: qué se va a borrar (una dirección o un método de pago) al
  // confirmar en el ConfirmModal — ver su forma exacta en handleConfirmDelete.
  const [deleteTarget, setDeleteTarget] = useState(null);

  // El total de compras no viene con el usuario; se pide aparte a /orders y
  // solo se usa su longitud (no se guardan los pedidos en sí en esta página).
  useEffect(() => {
    getMyOrdersRequest()
      .then(({ data }) => setTotalPurchases(data.length))
      .catch(() => setTotalPurchases(null));
  }, []);

  // deleteTarget guarda tipo ('address' | 'payment') + id, para que un solo
  // ConfirmModal sirva para confirmar el borrado de cualquiera de los dos.
  async function handleConfirmDelete() {
    if (!deleteTarget) return;
    const { type, id } = deleteTarget;
    setDeleteTarget(null);
    setSavedError('');
    try {
      if (type === 'address') {
        const { data } = await deleteAddressRequest(id);
        setUserData({ ...user, addresses: data });
      } else {
        const { data } = await deletePaymentMethodRequest(id);
        setUserData({ ...user, paymentMethods: data });
      }
    } catch (err) {
      setSavedError(
        err.response?.data?.message ||
          (type === 'address' ? 'No se pudo eliminar la dirección' : 'No se pudo eliminar el método de pago')
      );
    }
  }

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handlePhoneChange(e) {
    setForm((f) => ({ ...f, phone: digitsOnly(e.target.value, 10) }));
  }

  // Solo manda `password` si el usuario escribió una nueva (dejarlo en
  // blanco significa "no la cambies").
  async function handleSave(e) {
    e.preventDefault();
    setError('');
    if (form.phone.length !== 10) {
      setError('El teléfono debe tener exactamente 10 dígitos');
      return;
    }
    setLoading(true);
    try {
      const payload = { name: form.name, phone: form.phone };
      if (form.password) payload.password = form.password;
      await updateProfile(payload);
      setEditing(false);
      setForm((f) => ({ ...f, password: '' }));
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo actualizar el perfil');
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    logout();
    navigate('/');
  }

  if (!user) return null;

  const addresses = user.addresses || [];
  const paymentMethods = user.paymentMethods || [];

  return (
    <Layout>
      <BackButton />
      <div className="container">
        <div className="profile-card card">
          <img className="profile-photo" src={user.profilePhoto} alt={user.name} />
          <h1>{user.name}</h1>
          <p className="profile-email">{user.email}</p>
          <span className="badge">{roleLabels[user.role] || user.role}</span>

          <div className="profile-stats">
            <div className="profile-stat-item">
              <PhoneIcon size={16} />
              {user.phone ? formatPhoneDisplay(user.phone) : 'Sin teléfono registrado'}
            </div>
            <div className="profile-stat-item">
              <ReceiptIcon size={16} />
              {totalPurchases === null
                ? '—'
                : `${totalPurchases} ${totalPurchases === 1 ? 'compra realizada' : 'compras realizadas'}`}
            </div>
          </div>

          {!editing ? (
            <div className="profile-actions">
              <button type="button" className="btn btn-outline" onClick={() => navigate('/historial-compras')}>
                <ReceiptIcon size={16} /> Ver historial de compras
              </button>
              <button type="button" className="btn btn-primary" onClick={() => setEditing(true)}>
                <EditIcon size={16} /> Editar información
              </button>
              <button type="button" className="btn btn-danger" onClick={handleLogout}>
                <LogoutIcon size={16} /> Cerrar sesión
              </button>
            </div>
          ) : (
            <form className="profile-edit-form" onSubmit={handleSave}>
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input id="name" name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Número de teléfono</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="000 000 0000"
                  maxLength={12}
                  value={formatPhoneDisplay(form.phone)}
                  onChange={handlePhoneChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Nueva contraseña (opcional)</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Dejar en blanco para no cambiarla"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
              {error && <p className="error-text">{error}</p>}
              <div className="profile-actions">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => {
                    setEditing(false);
                    setError('');
                  }}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Guardando...' : 'Guardar cambios'}
                </button>
              </div>
            </form>
          )}
        </div>

        {!editing && (
          <>
            {savedError && (
              <p className="error-text" style={{ textAlign: 'center', marginTop: 20 }}>
                {savedError}
              </p>
            )}

            <div className="saved-data-card card">
              <h3>
                <LocationIcon size={17} /> Mis direcciones
              </h3>
              {addresses.length === 0 ? (
                <p className="saved-data-empty">
                  Aún no tienes direcciones guardadas. Se guardan automáticamente al finalizar una compra.
                </p>
              ) : (
                <div className="saved-data-list">
                  {addresses.map((addr) => (
                    <div className="saved-data-item" key={addr._id}>
                      <div className="saved-data-info">
                        {addr.isDefault && <span className="badge saved-data-badge">Predeterminada</span>}
                        <strong>{addr.fullName}</strong>
                        <span>{addr.street}</span>
                        <span>
                          {addr.city}, {addr.state}, {addr.zipCode}
                        </span>
                        <span>{addr.country}</span>
                        {addr.phone && <span>Tel: {formatPhoneDisplay(addr.phone)}</span>}
                      </div>
                      <button
                        type="button"
                        className="saved-data-delete"
                        aria-label={`Eliminar la dirección de ${addr.street}`}
                        title="Eliminar dirección"
                        onClick={() => setDeleteTarget({ type: 'address', id: addr._id, label: addr.street })}
                      >
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="saved-data-card card">
              <h3>
                <ReceiptIcon size={17} /> Mis métodos de pago
              </h3>
              {paymentMethods.length === 0 ? (
                <p className="saved-data-empty">
                  Aún no tienes métodos de pago guardados. Se guardan automáticamente al finalizar una compra.
                </p>
              ) : (
                <div className="saved-data-list">
                  {paymentMethods.map((method) => (
                    <div className="saved-data-item" key={method._id}>
                      <div className="saved-data-info">
                        {method.isDefault && (
                          <span className="badge saved-data-badge">Predeterminado</span>
                        )}
                        <strong>{method.cardholderName}</strong>
                        <span>
                          {method.brand} •••• {method.last4}
                        </span>
                        <span>Vence {method.expiry}</span>
                      </div>
                      <button
                        type="button"
                        className="saved-data-delete"
                        aria-label={`Eliminar la tarjeta terminada en ${method.last4}`}
                        title="Eliminar método de pago"
                        onClick={() =>
                          setDeleteTarget({
                            type: 'payment',
                            id: method._id,
                            label: `${method.brand} •••• ${method.last4}`
                          })
                        }
                      >
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title={deleteTarget?.type === 'address' ? 'Eliminar dirección' : 'Eliminar método de pago'}
        message={
          deleteTarget?.type === 'address'
            ? `¿Seguro que deseas eliminar la dirección "${deleteTarget?.label}"?`
            : `¿Seguro que deseas eliminar la tarjeta ${deleteTarget?.label}?`
        }
        confirmLabel="Eliminar"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </Layout>
  );
}
