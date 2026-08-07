import { useEffect, useMemo, useState } from 'react';
import { formatPrice } from '../utils/format';
import { returnableProducts } from '../utils/orderStatus';
import './ReturnRequestSection.css';
import './RequestReturnModal.css';

const MAX_REASON = 1000;

// Igual que ReturnRequestSection pero para un solo pedido ya conocido (el de
// la tarjeta desde la que se abrió): sin selector de pedido, solo productos +
// motivo. Se usa desde el historial de compras para pedidos entregados.
export default function RequestReturnModal({ order, sending, error, onConfirm, onClose }) {
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [reason, setReason] = useState('');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    setSelectedProductIds([]);
    setReason('');
    setTouched(false);
  }, [order?._id]);

  // Solo los productos que todavía no se hayan incluido en una solicitud
  // anterior pueden volver a solicitarse.
  const eligibleProducts = useMemo(() => returnableProducts(order), [order]);

  if (!order) return null;

  const alreadyRequestedCount = order.products.length - eligibleProducts.length;
  const allSelected = selectedProductIds.length === eligibleProducts.length;
  const trimmedReason = reason.trim();
  const noProductsSelected = touched && selectedProductIds.length === 0;
  const reasonMissing = touched && !trimmedReason;

  function toggleProduct(productId) {
    setSelectedProductIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  }

  function toggleAll() {
    setSelectedProductIds(allSelected ? [] : eligibleProducts.map((p) => p.product));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (selectedProductIds.length === 0 || !trimmedReason) {
      setTouched(true);
      return;
    }
    onConfirm({
      items: selectedProductIds.map((productId) => ({ productId })),
      fullOrder: allSelected,
      reason: trimmedReason
    });
  }

  return (
    <div className="modal-overlay" onClick={sending ? undefined : onClose}>
      <div className="modal-box request-return-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Solicitar devolución del pedido #{order.orderNumber}</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Productos a devolver</label>
            <div className="return-request-items">
              <label className="return-request-item return-request-item-all">
                <input type="checkbox" checked={allSelected} disabled={sending} onChange={toggleAll} />
                Todo lo disponible para devolver
              </label>
              {eligibleProducts.map((item, index) => (
                <label className="return-request-item" key={`${item.product || 'x'}-${index}`}>
                  <input
                    type="checkbox"
                    disabled={sending || !item.product}
                    checked={!!item.product && selectedProductIds.includes(item.product)}
                    onChange={() => item.product && toggleProduct(item.product)}
                  />
                  <span className="return-request-item-name">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="return-request-item-price">{formatPrice(item.price * item.quantity)}</span>
                </label>
              ))}
            </div>
            {alreadyRequestedCount > 0 && (
              <p className="return-request-hint">
                {alreadyRequestedCount === 1
                  ? 'Ya se solicitó la devolución de 1 producto de este pedido; no aparece aquí.'
                  : `Ya se solicitó la devolución de ${alreadyRequestedCount} productos de este pedido; no aparecen aquí.`}
              </p>
            )}
            {noProductsSelected && (
              <p className="error-text">Selecciona al menos un producto (o todo lo disponible).</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="request-return-reason">Motivo de la devolución</label>
            <textarea
              id="request-return-reason"
              rows={4}
              maxLength={MAX_REASON}
              required
              value={reason}
              disabled={sending}
              placeholder="Cuéntanos qué pasó con tu producto..."
              onChange={(e) => setReason(e.target.value)}
              onBlur={() => setTouched(true)}
            />
            <div className="cancel-order-meta">
              <span>{reason.length}/{MAX_REASON}</span>
            </div>
            {reasonMissing && <p className="error-text">Cuéntanos el motivo antes de enviar la solicitud.</p>}
          </div>

          {error && <p className="error-text">{error}</p>}

          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" disabled={sending} onClick={onClose}>
              Volver
            </button>
            <button type="submit" className="btn btn-primary" disabled={sending}>
              {sending ? 'Enviando...' : 'Enviar solicitud'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
