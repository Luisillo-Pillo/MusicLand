import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import { PhoneIcon, ReceiptIcon } from '../components/icons';
import { getUserByIdRequest } from '../api/userApi';
import './Profile.css';

const roleLabels = {
  admin: 'Administrador',
  user: 'Cliente'
};

export default function AdminUserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getUserByIdRequest(id)
      .then(({ data }) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [id]);

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
              {user.phone || 'Sin teléfono registrado'}
            </div>
            <div className="profile-stat-item">
              <ReceiptIcon size={16} />
              {user.totalPurchases} {user.totalPurchases === 1 ? 'compra realizada' : 'compras realizadas'}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
