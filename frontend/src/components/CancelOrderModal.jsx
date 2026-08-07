import { useEffect, useState } from 'react';
import './CancelOrderModal.css';

const MAX_REASON = 1000;

export default function CancelOrderModal({ order, sending, error, byAdmin = false, onConfirm, onClose }) {
  const [reason, setReason] = useState('');
  const [touched, setTouched] = useState(false);

  // Limpia el motivo al abrir para otro pedido, para no arrastrar el texto anterior.
  useEffect(() => {
    setReason('');
    setTouched(false);
  }, [order?._id]);

  if (!order) return null;

  const units = order.products.reduce((sum, p) => sum + p.quantity, 0);
  const trimmedReason = reason.trim();
  const reasonMissing = touched && !trimmedReason;

  function handleSubmit(e) {
    e.preventDefault();
    if (!trimmedReason) {
      setTouched(true);
      return;
    }
    onConfirm(trimmedReason);
  }

  return (
    <div className="modal-overlay" onClick={sending ? undefined : onClose}>
      <div className="modal-box cancel-order-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Cancelar pedido #{order.orderNumber}</h3>
        <p className="cancel-order-lead">
          {units} {units === 1 ? 'unidad volverá' : 'unidades volverán'} al inventario y la cancelación
          no se puede deshacer.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cancel-reason">Motivo de la cancelación</label>
            <textarea
              id="cancel-reason"
              rows={4}
              maxLength={MAX_REASON}
              required
              value={reason}
              disabled={sending}
              placeholder={
                byAdmin
                  ? 'Ej. Producto sin existencias en almacén. Se incluirá en el correo al cliente.'
                  : 'Ej. Me equivoqué de talla o ya no lo necesito.'
              }
              onChange={(e) => setReason(e.target.value)}
              onBlur={() => setTouched(true)}
              aria-invalid={reasonMissing}
            />
            <div className="cancel-order-meta">
              <span>
                {byAdmin
                  ? 'Se enviará un correo al cliente con este motivo.'
                  : 'Se avisará a la tienda con este motivo.'}
              </span>
              <span className={reason.length > MAX_REASON - 50 ? 'near-limit' : ''}>
                {reason.length}/{MAX_REASON}
              </span>
            </div>
            {reasonMissing && <p className="error-text">Cuéntanos el motivo antes de cancelar el pedido.</p>}
          </div>

          {error && <p className="error-text">{error}</p>}

          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" disabled={sending} onClick={onClose}>
              Volver
            </button>
            <button type="submit" className="btn btn-danger" disabled={sending}>
              {sending ? 'Cancelando...' : 'Cancelar pedido'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
