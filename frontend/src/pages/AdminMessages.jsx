import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import AdminNav from '../components/AdminNav';
import ConfirmModal from '../components/ConfirmModal';
import { EmptyBoxIcon, MailIcon, TrashIcon, SearchIcon } from '../components/icons';
import {
  getContactMessagesRequest,
  replyContactMessageRequest,
  deleteContactMessageRequest
} from '../api/contactApi';
import './AdminProducts.css';
import './AdminMessages.css';

// Fecha corta con hora, para el encabezado de cada tarjeta de mensaje.
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Convierte una fecha a "YYYY-MM-DD" en hora LOCAL (no UTC, a diferencia de
// toISOString) para poder compararla tal cual contra el valor de un <input
// type="date">, que también trabaja en fecha local sin hora.
function toLocalDateInputValue(dateStr) {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Una tarjeta de mensaje de contacto, con su respuesta anterior visible si ya se contestó.
function MessageCard({ msg, onReply, onDelete }) {
  return (
    <div className="admin-message-card card">
      <div className="admin-message-header">
        <div className="admin-message-sender">
          <strong>{msg.name}</strong>
          <a href={`mailto:${msg.email}`}>{msg.email}</a>
        </div>
        <div className="admin-message-header-right">
          {msg.replied && <span className="badge admin-message-replied-badge">Respondido</span>}
          <span className="admin-message-date">{formatDate(msg.createdAt)}</span>
        </div>
      </div>
      <p className="admin-message-body">{msg.message}</p>

      {msg.replied && (
        <div className="admin-message-reply-preview">
          <strong>Tu respuesta ({formatDate(msg.repliedAt)}):</strong>
          <p>{msg.reply}</p>
        </div>
      )}

      <div className="admin-message-actions">
        <button type="button" className="btn btn-outline btn-sm" onClick={() => onReply(msg)}>
          <MailIcon size={14} /> {msg.replied ? 'Responder de nuevo' : 'Responder'}
        </button>
        <button type="button" className="btn btn-danger btn-sm" onClick={() => onDelete(msg)}>
          <TrashIcon size={14} /> Eliminar
        </button>
      </div>
    </div>
  );
}

// Un grupo de mensajes con su título y contador (se usa para "Nuevos" y "Respondidos").
function MessageSection({ title, messages, onReply, onDelete }) {
  return (
    <>
      <h3 className="admin-messages-section-title">
        {title} ({messages.length})
      </h3>
      {messages.length === 0 ? (
        <p className="admin-messages-section-empty">No hay mensajes en esta categoría.</p>
      ) : (
        <div className="admin-messages-list">
          {messages.map((msg) => (
            <MessageCard key={msg._id} msg={msg} onReply={onReply} onDelete={onDelete} />
          ))}
        </div>
      )}
    </>
  );
}

// Bandeja de mensajes de contacto del panel de administración: separados en
// "Nuevos"/"Respondidos", con búsqueda por texto y filtro por fecha (exacta o
// rango), y un modal para responder por correo sin salir de la página.
export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [replyTarget, setReplyTarget] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [sending, setSending] = useState(false);
  const [replyError, setReplyError] = useState('');
  const [search, setSearch] = useState('');
  const [listError, setListError] = useState('');
  // El filtro de fecha tiene dos modos mutuamente excluyentes: 'exact' (un
  // solo día) o 'range' (desde/hasta). Cambiar de modo limpia los campos del
  // otro (ver switchDateMode) para no dejar un filtro fantasma aplicado.
  const [dateMode, setDateMode] = useState('exact');
  const [exactDate, setExactDate] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  function loadMessages() {
    setLoading(true);
    setListError('');
    return getContactMessagesRequest()
      .then(({ data }) => setMessages(data))
      .catch((err) => setListError(err.response?.data?.message || 'No se pudieron cargar los mensajes'))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadMessages();
  }, []);

  // Abre el modal de responder. Si el mensaje ya se había respondido antes
  // ("Responder de nuevo"), precarga esa respuesta anterior como punto de
  // partida en vez de empezar el textarea vacío.
  function openReply(msg) {
    setReplyTarget(msg);
    setReplyText(msg.reply || '');
    setReplyError('');
  }

  // Envía la respuesta: el backend la manda por correo al remitente original
  // (replyTo del formulario de contacto) y marca el mensaje como respondido.
  // Recarga toda la lista al terminar para que se mueva de "Nuevos" a
  // "Respondidos" con el texto de la respuesta ya guardado.
  async function handleSendReply(e) {
    e.preventDefault();
    if (!replyTarget || !replyText.trim()) return;
    setSending(true);
    setReplyError('');
    try {
      await replyContactMessageRequest(replyTarget._id, replyText.trim());
      setReplyTarget(null);
      setReplyText('');
      await loadMessages();
    } catch (err) {
      setReplyError(err.response?.data?.message || 'No se pudo enviar la respuesta');
    } finally {
      setSending(false);
    }
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return;
    const target = deleteTarget;
    setDeleteTarget(null);
    setListError('');
    try {
      await deleteContactMessageRequest(target._id);
      await loadMessages();
    } catch (err) {
      setListError(err.response?.data?.message || 'No se pudo eliminar el mensaje');
    }
  }

  const term = search.trim().toLowerCase();
  const hasActiveDateFilter =
    dateMode === 'exact' ? !!exactDate : !!(dateFrom || dateTo);
  const hasActiveFilters = !!(term || hasActiveDateFilter);

  // Un mensaje pasa el filtro si coincide con el texto buscado (nombre,
  // correo o contenido) Y con la fecha (exacta o dentro del rango) — ambos
  // criterios son independientes y se combinan con Y, no con O.
  const filteredMessages = messages.filter((msg) => {
    const matchesSearch =
      !term ||
      msg.name.toLowerCase().includes(term) ||
      msg.email.toLowerCase().includes(term) ||
      msg.message.toLowerCase().includes(term);

    const msgDate = toLocalDateInputValue(msg.createdAt);
    const matchesDate =
      dateMode === 'exact'
        ? !exactDate || msgDate === exactDate
        : (!dateFrom || msgDate >= dateFrom) && (!dateTo || msgDate <= dateTo);

    return matchesSearch && matchesDate;
  });

  const newMessages = filteredMessages.filter((msg) => !msg.replied);
  const repliedMessages = filteredMessages.filter((msg) => msg.replied);

  function switchDateMode(mode) {
    setDateMode(mode);
    setExactDate('');
    setDateFrom('');
    setDateTo('');
  }

  function clearFilters() {
    setSearch('');
    setExactDate('');
    setDateFrom('');
    setDateTo('');
  }

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

        <div className="admin-messages-filters">
          <div className="admin-search-box">
            <SearchIcon size={16} />
            <input
              type="text"
              placeholder="Buscar por nombre, correo o contenido..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="admin-date-mode-toggle">
            <button
              type="button"
              className={dateMode === 'exact' ? 'active' : ''}
              onClick={() => switchDateMode('exact')}
            >
              Fecha específica
            </button>
            <button
              type="button"
              className={dateMode === 'range' ? 'active' : ''}
              onClick={() => switchDateMode('range')}
            >
              Rango de fechas
            </button>
          </div>

          {dateMode === 'exact' ? (
            <input
              type="date"
              className="admin-date-filter"
              value={exactDate}
              onChange={(e) => setExactDate(e.target.value)}
              aria-label="Fecha específica"
            />
          ) : (
            <div className="admin-date-range">
              <input
                type="date"
                className="admin-date-filter"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                aria-label="Desde"
              />
              <span>—</span>
              <input
                type="date"
                className="admin-date-filter"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                aria-label="Hasta"
              />
            </div>
          )}

          {hasActiveFilters && (
            <button type="button" className="admin-messages-clear-filters" onClick={clearFilters}>
              Quitar filtros
            </button>
          )}
        </div>

        {listError && <p className="error-text" style={{ marginBottom: 16 }}>{listError}</p>}

        {loading ? (
          <div className="spinner-wrapper">
            <div className="spinner" />
          </div>
        ) : messages.length === 0 ? (
          <div className="empty-state card">
            <EmptyBoxIcon />
            <p>Aún no has recibido mensajes de contacto.</p>
          </div>
        ) : filteredMessages.length === 0 ? (
          <p className="admin-search-empty">No se encontraron mensajes que coincidan con tu búsqueda.</p>
        ) : (
          <>
            <MessageSection title="Nuevos" messages={newMessages} onReply={openReply} onDelete={setDeleteTarget} />
            <MessageSection
              title="Respondidos"
              messages={repliedMessages}
              onReply={openReply}
              onDelete={setDeleteTarget}
            />
          </>
        )}
      </div>

      {replyTarget && (
        <div className="modal-overlay" onClick={() => setReplyTarget(null)}>
          <div className="modal-box admin-form-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Responder a {replyTarget.name}</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: -8, marginBottom: 16 }}>
              Se enviará un correo a {replyTarget.email}
            </p>
            <form onSubmit={handleSendReply}>
              <div className="form-group">
                <label htmlFor="reply">Tu respuesta</label>
                <textarea
                  id="reply"
                  rows={5}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  required
                />
              </div>
              {replyError && <p className="error-text">{replyError}</p>}
              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setReplyTarget(null)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" disabled={sending}>
                  {sending ? 'Enviando...' : 'Enviar respuesta'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title="Eliminar mensaje"
        message={`¿Seguro que deseas eliminar el mensaje de "${deleteTarget?.name}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </Layout>
  );
}
