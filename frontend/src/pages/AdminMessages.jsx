import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import AdminNav from '../components/AdminNav';
import { EmptyBoxIcon } from '../components/icons';
import { getContactMessagesRequest } from '../api/contactApi';
import './AdminMessages.css';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContactMessagesRequest()
      .then(({ data }) => setMessages(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <BackButton />
      <div className="container">
        <div className="admin-header">
          <h1>Mensajes de contacto</h1>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            {messages.length} {messages.length === 1 ? 'mensaje recibido' : 'mensajes recibidos'}
          </span>
        </div>

        <AdminNav />

        {loading ? (
          <div className="spinner-wrapper">
            <div className="spinner" />
          </div>
        ) : messages.length === 0 ? (
          <div className="empty-state card">
            <EmptyBoxIcon />
            <p>Aún no has recibido mensajes de contacto.</p>
          </div>
        ) : (
          <div className="admin-messages-list">
            {messages.map((msg) => (
              <div className="admin-message-card card" key={msg._id}>
                <div className="admin-message-header">
                  <div className="admin-message-sender">
                    <strong>{msg.name}</strong>
                    <a href={`mailto:${msg.email}`}>{msg.email}</a>
                  </div>
                  <span className="admin-message-date">{formatDate(msg.createdAt)}</span>
                </div>
                <p className="admin-message-body">{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
