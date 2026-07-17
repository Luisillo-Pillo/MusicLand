import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import { useAuth } from '../context/AuthContext';
import { EditIcon, LogoutIcon } from '../components/icons';
import './Profile.css';

const roleLabels = {
  admin: 'Administrador',
  user: 'Cliente'
};

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    profilePhoto: user?.profilePhoto || '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = { name: form.name, profilePhoto: form.profilePhoto };
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

  return (
    <Layout>
      <BackButton />
      <div className="container">
        <div className="profile-card card">
          <img className="profile-photo" src={user.profilePhoto} alt={user.name} />
          <h1>{user.name}</h1>
          <p className="profile-email">{user.email}</p>
          <span className="badge">{roleLabels[user.role] || user.role}</span>

          {!editing ? (
            <div className="profile-actions">
              <button type="button" className="btn btn-outline" onClick={() => navigate(-1)}>
                Volver
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
                <label htmlFor="profilePhoto">URL de foto de perfil</label>
                <input
                  id="profilePhoto"
                  name="profilePhoto"
                  value={form.profilePhoto}
                  onChange={handleChange}
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
      </div>
    </Layout>
  );
}
