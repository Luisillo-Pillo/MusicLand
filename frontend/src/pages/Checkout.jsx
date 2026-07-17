import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrderRequest } from '../api/orderApi';
import './Checkout.css';

const cardBrands = ['Visa', 'Mastercard', 'American Express'];

export default function Checkout() {
  const { items, totalItems, totalPrice, refreshCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: user?.name || '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'México',
    phone: ''
  });
  const [cardBrand, setCardBrand] = useState('Visa');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState(user?.name || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleAddressChange(e) {
    setAddress((a) => ({ ...a, [e.target.name]: e.target.value }));
  }

  async function handleConfirm() {
    setError('');
    if (!address.street || !address.city || !address.state || !address.zipCode) {
      setError('Completa todos los campos de la dirección de envío.');
      return;
    }
    if (cardNumber.replace(/\s/g, '').length < 4) {
      setError('Ingresa un número de tarjeta válido (método de pago simulado).');
      return;
    }
    setLoading(true);
    try {
      const last4 = cardNumber.replace(/\s/g, '').slice(-4);
      const { data } = await createOrderRequest({
        shippingAddress: address,
        paymentMethod: { brand: cardBrand, last4 }
      });
      await refreshCart();
      navigate('/pedido-confirmado', { state: { order: data } });
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo procesar la compra');
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <Layout>
        <BackButton />
        <div className="container empty-state">
          <p>No tienes productos en el carrito para pagar.</p>
          <button type="button" className="btn btn-primary" onClick={() => navigate('/')}>
            Ir a comprar
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <BackButton />
      <div className="container">
        <h1 style={{ marginBottom: 24 }}>Finalizar compra</h1>

        <div className="checkout-layout">
          <div>
            <div className="checkout-section card">
              <h3>Dirección de envío</h3>
              <div className="form-group">
                <label htmlFor="fullName">Nombre completo</label>
                <input id="fullName" name="fullName" value={address.fullName} onChange={handleAddressChange} />
              </div>
              <div className="form-group">
                <label htmlFor="street">Calle y número</label>
                <input id="street" name="street" value={address.street} onChange={handleAddressChange} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">Ciudad</label>
                  <input id="city" name="city" value={address.city} onChange={handleAddressChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="state">Estado</label>
                  <input id="state" name="state" value={address.state} onChange={handleAddressChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="zipCode">Código postal</label>
                  <input id="zipCode" name="zipCode" value={address.zipCode} onChange={handleAddressChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Teléfono</label>
                  <input id="phone" name="phone" value={address.phone} onChange={handleAddressChange} />
                </div>
              </div>
            </div>

            <div className="checkout-section card">
              <h3>Método de pago</h3>
              <div className="payment-options">
                {cardBrands.map((brand) => (
                  <div
                    key={brand}
                    className={`payment-option ${cardBrand === brand ? 'selected' : ''}`}
                    onClick={() => setCardBrand(brand)}
                  >
                    {brand}
                  </div>
                ))}
              </div>
              <div className="form-group">
                <label htmlFor="cardName">Nombre en la tarjeta</label>
                <input id="cardName" value={cardName} onChange={(e) => setCardName(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="cardNumber">Número de tarjeta</label>
                <input
                  id="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                Este método de pago es simulado, no se realizará ningún cobro real.
              </p>
            </div>
          </div>

          <div className="checkout-section card">
            <h3>Resumen de compra</h3>
            <div className="checkout-summary-items">
              {items.map((item) => (
                <div className="checkout-summary-item" key={item.product._id}>
                  <span>
                    {item.product.name} x{item.quantity}
                  </span>
                  <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="checkout-summary-item">
              <span>Total de productos</span>
              <span>{totalItems}</span>
            </div>
            <div className="checkout-total">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            {error && <p className="error-text" style={{ marginTop: 14 }}>{error}</p>}

            <div className="checkout-actions">
              <button type="button" className="btn btn-outline" onClick={() => navigate('/carrito')}>
                Volver
              </button>
              <button type="button" className="btn btn-primary" onClick={handleConfirm} disabled={loading}>
                {loading ? 'Procesando...' : 'Finalizar compra'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
