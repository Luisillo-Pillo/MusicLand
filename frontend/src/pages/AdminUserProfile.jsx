import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import ConfirmModal from '../components/ConfirmModal';
import { PhoneIcon, ReceiptIcon, MailIcon, EditIcon, TrashIcon } from '../components/icons';
import { useAuth } from '../context/AuthContext';
import { getUserByIdRequest, updateUserRoleRequest, deleteUserRequest, contactUserRequest } from '../api/userApi';
import { formatPhoneDisplay } from '../utils/format';
import './Profile.css';
import './AdminUserProfile.css';

const roleLabels = {
  admin: 'Administrador',
  user: 'Cliente'
};

// Perfil de un cliente visto desde el panel de administración: cambio de
// rol, borrado de cuenta y un correo directo (contactUserRequest) al cliente.
export default function AdminUserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // notice: mensaje de éxito (verde/neutro) tras cambiar el rol, distinto de
  // error (rojo) — ambos pueden mostrarse en momentos distintos de la misma sesión.
  const [notice, setNotice] = useState('');

  // Estado del cambio de rol: confirmRole guarda A QUÉ rol se quiere cambiar
  // ('admin' | 'user') mientras el modal de confirmación está abierto; null = cerrado.
  const [savingRole, setSavingRole] = useState(false);
  const [confirmRole, setConfirmRole] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Estado del modal "Contactar" (correo directo al cliente).
  const [contactOpen, setContactOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [contactError, setContactError] = useState('');

  // Carga el usuario de nuevo si cambia el :id de la URL (navegar de un
  // perfil de cliente a otro sin pasar por la lista).
  useEffect(() => {
    setLoading(true);
    getUserByIdRequest(id)
      .then(({ data }) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [id]);

  // El admin puede estar viendo su propio perfil desde este panel (llegó
  // aquí navegando la lista de administradores): esto oculta/deshabilita las
  // acciones que no tendría sentido aplicarse a sí mismo.
  const isSelf = !!currentUser && currentUser._id === id;

  // Alterna admin <-> cliente (el modal de confirmación ya validó la
  // intención antes de llegar aquí, ver confirmRole).
  async function handleToggleRole() {
    const nextRole = user.role === 'admin' ? 'user' : 'admin';
    setConfirmRole(null);
    setError('');
    setNotice('');
    setSavingRole(true);
    try {
      const { data } = await updateUserRoleRequest(id, nextRole);
      setUser((prev) => ({ ...prev, ...data }));
      setNotice(
        nextRole === 'admin'
          ? `${data.name} ahora es administrador.`
          : `${data.name} ya no es administrador.`
      );
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo actualizar el rol del usuario');
    } finally {
      setSavingRole(false);
    }
  }

  async function handleDelete() {
    setConfirmDelete(false);
    setError('');
    try {
      await deleteUserRequest(id);
      navigate('/admin/usuarios');
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo eliminar el usuario');
    }
  }

  // Limpia el formulario del modal cada vez que se abre, para no arrastrar
  // el asunto/mensaje de un correo anterior a otro cliente.
  function openContact() {
    setSubject('');
    setMessage('');
    setContactError('');
    setContactOpen(true);
  }

  async function handleSendContact(e) {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    setSending(true);
    setContactError('');
    setNotice('');
    try {
      const { data } = await contactUserRequest(id, { subject: subject.trim(), message: message.trim() });
      setContactOpen(false);
      setNotice(data.message);
    } catch (err) {
      setContactError(err.response?.data?.message || 'No se pudo enviar el mensaje');
    } finally {
      setSending(false);
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

  if (!user) {
    return (
      <Layout>
        <BackButton />
        <div className="container empty-state">
          <p>No se encontró este usuario.</p>
        </div>
      </Layout>
    );
  }

  const isAdmin = user.role === 'admin';

  return (
    <Layout>
      <BackButton />
      <div className="container">
        <div className="profile-card card">
          <img className="profile-photo" src={user.profilePhoto} alt={user.name} />
          <h1>{user.name}</h1>
          <p className="profile-email">{user.email}</p>
          <span className="badge">{roleLabels[user.role] || user.role}</span>
          {isSelf && <span className="badge admin-user-you-badge">Tú</span>}

          <div className="profile-stats">
            <div className="profile-stat-item">
              <PhoneIcon size={16} />
              {user.phone ? formatPhoneDisplay(user.phone) : 'Sin teléfono registrado'}
            </div>
            <div className="profile-stat-item">
              <ReceiptIcon size={16} />
              {user.totalPurchases} {user.totalPurchases === 1 ? 'compra realizada' : 'compras realizadas'}
            </div>
          </div>

          {notice && <p className="admin-user-notice">{notice}</p>}
          {error && <p className="error-text" style={{ marginTop: 16 }}>{error}</p>}

          <div className="profile-actions">
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={() => navigate(`/admin/usuarios/${id}/compras`)}
            >
              <ReceiptIcon size={15} /> Ver compras
            </button>

            <button type="button" className="btn btn-outline btn-sm" onClick={openContact}>
              <MailIcon size={15} /> Contactar
            </button>

            <button
              type="button"
              className="btn btn-outline btn-sm"
              disabled={savingRole || (isSelf && isAdmin)}
              title={isSelf && isAdmin ? 'No puedes quitarte tu propio rol de administrador' : ''}
              onClick={() => setConfirmRole(isAdmin ? 'user' : 'admin')}
            >
              <EditIcon size={15} /> {isAdmin ? 'Quitar admin' : 'Hacer admin'}
            </button>

            <button
              type="button"
              className="btn btn-danger btn-sm"
              disabled={isSelf}
              title={isSelf ? 'No puedes borrar tu propia cuenta' : ''}
              onClick={() => setConfirmDelete(true)}
            >
              <TrashIcon size={15} /> Eliminar
            </button>
          </div>
        </div>
      </div>

      {contactOpen && (
        <div className="modal-overlay" onClick={() => setContactOpen(false)}>
          <div className="modal-box admin-user-contact-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Contactar a {user.name}</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: -8, marginBottom: 16 }}>
              Se enviará un correo a {user.email}
            </p>
            <form onSubmit={handleSendContact}>
              <div className="form-group">
                <label htmlFor="contact-subject">Asunto</label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-message">Mensaje</label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              {contactError && <p className="error-text">{contactError}</p>}
              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setContactOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" disabled={sending}>
                  {sending ? 'Enviando...' : 'Enviar mensaje'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        open={!!confirmRole}
        title={confirmRole === 'admin' ? 'Hacer administrador' : 'Quitar administrador'}
        message={
          confirmRole === 'admin'
            ? `¿Seguro que deseas darle permisos de administrador a "${user.name}"? Podrá gestionar productos, usuarios y mensajes.`
            : `¿Seguro que deseas quitarle los permisos de administrador a "${user.name}"?`
        }
        confirmLabel={confirmRole === 'admin' ? 'Hacer admin' : 'Quitar admin'}
        danger={confirmRole !== 'admin'}
        onConfirm={handleToggleRole}
        onCancel={() => setConfirmRole(null)}
      />

      <ConfirmModal
        open={confirmDelete}
        title="Eliminar usuario"
        message={`¿Seguro que deseas eliminar la cuenta de "${user.name}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
      />
    </Layout>
  );
}
