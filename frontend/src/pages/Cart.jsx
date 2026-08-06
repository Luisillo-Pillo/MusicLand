import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import QuantitySelector from '../components/QuantitySelector';
import ConfirmModal from '../components/ConfirmModal';
import { useCart } from '../context/CartContext';
import { TrashIcon, EmptyBoxIcon } from '../components/icons';
import { formatPrice } from '../utils/format';
import './Cart.css';

function CartItemRow({ item, onQuantityChange, onRequestRemove }) {
  const [localQty, setLocalQty] = useState(item.quantity);
  const lastNonZeroRef = useRef(item.quantity || 1);

  useEffect(() => {
    setLocalQty(item.quantity);
    if (item.quantity > 0) lastNonZeroRef.current = item.quantity;
  }, [item.quantity]);

  function handleChange(newQty) {
    setLocalQty(newQty);
    if (newQty === 0) {
      onRequestRemove(item.product._id, () => setLocalQty(lastNonZeroRef.current));
    } else {
      onQuantityChange(item.product._id, newQty);
    }
  }

  const product = item.product;

  return (
    <div className="cart-item card">
      <div className="cart-item-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="cart-item-info">
        <h4>{product.name}</h4>
        <p className="unit-price">{formatPrice(product.price)} c/u</p>
        <QuantitySelector value={localQty} onChange={handleChange} min={0} max={product.stock} />
      </div>
      <div className="cart-item-price">{formatPrice(product.price * item.quantity)}</div>
      <button
        type="button"
        className="cart-item-remove"
        onClick={() => onRequestRemove(item.product._id)}
        aria-label="Eliminar producto"
        title="Eliminar producto"
      >
        <TrashIcon />
      </button>
    </div>
  );
}

export default function Cart() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart, refreshCart, loading } =
    useCart();
  const navigate = useNavigate();

  const [confirmState, setConfirmState] = useState(null);
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false);
  const [error, setError] = useState('');

  function requestRemove(productId, revert) {
    setConfirmState({ productId, revert });
  }

  async function handleConfirmRemove() {
    if (!confirmState) return;
    const { productId, revert } = confirmState;
    setConfirmState(null);
    setError('');
    try {
      await removeItem(productId);
    } catch (err) {
      if (revert) revert();
      setError(err.response?.data?.message || 'No se pudo eliminar el producto del carrito.');
    }
  }

  function handleCancelRemove() {
    if (confirmState?.revert) confirmState.revert();
    setConfirmState(null);
  }

  async function handleConfirmClear() {
    setClearConfirmOpen(false);
    setError('');
    try {
      await clearCart();
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo vaciar el carrito.');
    }
  }

  async function handleQuantityChange(productId, quantity) {
    setError('');
    try {
      await updateQuantity(productId, quantity);
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo actualizar la cantidad.');
      await refreshCart();
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

  return (
    <Layout>
      <BackButton />
      <div className="container">
        <h1 style={{ marginBottom: 24 }}>Tu carrito</h1>

        {error && <p className="error-text" style={{ marginBottom: 16 }}>{error}</p>}

        {items.length === 0 ? (
          <div className="empty-state card">
            <EmptyBoxIcon />
            <p>Tu carrito está vacío.</p>
            <Link to="/" className="btn btn-primary">
              Ir a comprar
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-list">
              {items.map((item) => (
                <CartItemRow
                  key={item.product._id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRequestRemove={requestRemove}
                />
              ))}
            </div>

            <div className="cart-summary card">
              <h3>Resumen del pedido</h3>
              <div className="cart-summary-row">
                <span>Total de productos</span>
                <span>{totalItems}</span>
              </div>
              <div className="cart-summary-total">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <button type="button" className="btn btn-primary" onClick={() => navigate('/checkout')}>
                Proceder al pago
              </button>
              <button
                type="button"
                className="btn btn-outline cart-empty-clear"
                onClick={() => setClearConfirmOpen(true)}
              >
                Vaciar carrito
              </button>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        open={!!confirmState}
        title="Eliminar producto"
        message="¿Deseas eliminar este producto de tu carrito?"
        confirmLabel="Eliminar"
        onConfirm={handleConfirmRemove}
        onCancel={handleCancelRemove}
      />

      <ConfirmModal
        open={clearConfirmOpen}
        title="Vaciar carrito"
        message="Esta acción eliminará todos los productos de tu carrito. ¿Deseas continuar?"
        confirmLabel="Vaciar carrito"
        onConfirm={handleConfirmClear}
        onCancel={() => setClearConfirmOpen(false)}
      />
    </Layout>
  );
}
