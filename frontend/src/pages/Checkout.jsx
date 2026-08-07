import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import BackButton from '../components/BackButton';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrderRequest } from '../api/orderApi';
import {
  addAddressRequest,
  updateAddressRequest,
  addPaymentMethodRequest,
  updatePaymentMethodRequest
} from '../api/userApi';
import {
  formatPrice,
  formatPhoneDisplay,
  formatCardNumberDisplay,
  formatExpiryDisplay,
  digitsOnly,
  detectCardBrand
} from '../utils/format';
import './Checkout.css';

export default function Checkout() {
  const { items: cartItems, totalItems: cartTotalItems, totalPrice: cartTotalPrice, refreshCart } = useCart();
  const { user, setUserData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // "Comprar ahora" llega con un producto puntual en el state de navegación:
  // el checkout se arma con eso en vez de con el carrito, y el carrito ni se
  // consulta ni se toca en todo el flujo.
  const buyNow = location.state?.buyNow || null;
  const items = buyNow ? [{ product: buyNow.product, quantity: buyNow.quantity }] : cartItems;
  const totalItems = buyNow ? buyNow.quantity : cartTotalItems;
  const totalPrice = buyNow ? buyNow.product.price * buyNow.quantity : cartTotalPrice;

  const savedAddresses = user.addresses || [];
  const initialDefaultAddress =
    savedAddresses.find((a) => a.isDefault) || savedAddresses[savedAddresses.length - 1] || null;

  const [addresses, setAddresses] = useState(savedAddresses);
  const [addressMode, setAddressMode] = useState(initialDefaultAddress ? 'selected' : 'new');
  const [selectedAddressId, setSelectedAddressId] = useState(initialDefaultAddress?._id || null);
  const [newAddress, setNewAddress] = useState({
    fullName: user.name || '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'México',
    phone: ''
  });

  const savedPaymentMethods = user.paymentMethods || [];
  const initialDefaultPayment =
    savedPaymentMethods.find((p) => p.isDefault) || savedPaymentMethods[savedPaymentMethods.length - 1] || null;

  const [paymentMethods, setPaymentMethods] = useState(savedPaymentMethods);
  const [paymentMode, setPaymentMode] = useState(initialDefaultPayment ? 'selected' : 'new');
  const [selectedPaymentId, setSelectedPaymentId] = useState(initialDefaultPayment?._id || null);
  const [newCard, setNewCard] = useState({
    cardholderName: user.name || '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const selectedAddress = addresses.find((a) => a._id === selectedAddressId) || null;
  const selectedPayment = paymentMethods.find((p) => p._id === selectedPaymentId) || null;

  function handleNewAddressChange(e) {
    const { name, value } = e.target;
    setNewAddress((a) => ({ ...a, [name]: value }));
  }

  function handleNewAddressPhoneChange(e) {
    setNewAddress((a) => ({ ...a, phone: digitsOnly(e.target.value, 10) }));
  }

  function handleChooseOtherAddress() {
    setAddressMode('choose');
  }

  function handleAddNewAddress() {
    setAddressMode('new');
    setSelectedAddressId(null);
  }

  function handleSelectSavedAddress(addr) {
    setSelectedAddressId(addr._id);
    setAddressMode('selected');
  }

  function handleCancelAddressEdit() {
    const fallback = addresses.find((a) => a.isDefault) || addresses[addresses.length - 1] || null;
    if (fallback) {
      setSelectedAddressId(fallback._id);
      setAddressMode('selected');
    }
  }

  function handleNewCardChange(e) {
    const { name, value } = e.target;
    setNewCard((c) => ({ ...c, [name]: value }));
  }

  function handleNewCardNumberChange(e) {
    setNewCard((c) => ({ ...c, cardNumber: digitsOnly(e.target.value, 16) }));
  }

  function handleNewCardExpiryChange(e) {
    setNewCard((c) => ({ ...c, expiry: digitsOnly(e.target.value, 4) }));
  }

  function handleNewCardCvvChange(e) {
    setNewCard((c) => ({ ...c, cvv: digitsOnly(e.target.value, 4) }));
  }

  function handleChooseOtherPayment() {
    setPaymentMode('choose');
  }

  function handleAddNewPayment() {
    setPaymentMode('new');
    setSelectedPaymentId(null);
  }

  function handleSelectSavedPayment(method) {
    setSelectedPaymentId(method._id);
    setPaymentMode('selected');
  }

  function handleCancelPaymentEdit() {
    const fallback = paymentMethods.find((p) => p.isDefault) || paymentMethods[paymentMethods.length - 1] || null;
    if (fallback) {
      setSelectedPaymentId(fallback._id);
      setPaymentMode('selected');
    }
  }

  async function handleConfirm() {
    setError('');

    let addressToUse;
    if (addressMode === 'new') {
      if (!newAddress.street || !newAddress.city || !newAddress.state || !newAddress.zipCode) {
        setError('Completa todos los campos de la dirección de envío.');
        return;
      }
      addressToUse = newAddress;
    } else {
      if (!selectedAddress) {
        setError('Selecciona o agrega una dirección de envío.');
        return;
      }
      addressToUse = selectedAddress;
    }

    if (paymentMode === 'new') {
      if (
        !newCard.cardholderName ||
        newCard.cardNumber.length !== 16 ||
        newCard.expiry.length !== 4 ||
        newCard.cvv.length < 3
      ) {
        setError('Completa todos los campos del método de pago (tarjeta de 16 dígitos, expiración MM/AA y CVV).');
        return;
      }
    } else if (!selectedPayment) {
      setError('Selecciona o agrega un método de pago.');
      return;
    }

    setLoading(true);
    try {
      const shippingAddress = {
        fullName: addressToUse.fullName,
        street: addressToUse.street,
        city: addressToUse.city,
        state: addressToUse.state,
        zipCode: addressToUse.zipCode,
        country: addressToUse.country || 'México',
        phone: addressToUse.phone || ''
      };

      let mergedUser = user;

      if (addressMode === 'new') {
        const { data: updatedAddresses } = await addAddressRequest({ ...shippingAddress, isDefault: true });
        setAddresses(updatedAddresses);
        mergedUser = { ...mergedUser, addresses: updatedAddresses };
      } else if (!selectedAddress.isDefault) {
        const { data: updatedAddresses } = await updateAddressRequest(selectedAddress._id, { isDefault: true });
        setAddresses(updatedAddresses);
        mergedUser = { ...mergedUser, addresses: updatedAddresses };
      }

      let orderPaymentMethod;
      if (paymentMode === 'new') {
        const { data: updatedMethods } = await addPaymentMethodRequest({
          cardholderName: newCard.cardholderName,
          brand: detectCardBrand(newCard.cardNumber),
          last4: newCard.cardNumber.slice(-4),
          expiry: formatExpiryDisplay(newCard.expiry),
          isDefault: true
        });
        setPaymentMethods(updatedMethods);
        mergedUser = { ...mergedUser, paymentMethods: updatedMethods };
        orderPaymentMethod = { brand: detectCardBrand(newCard.cardNumber), last4: newCard.cardNumber.slice(-4) };
      } else {
        if (!selectedPayment.isDefault) {
          const { data: updatedMethods } = await updatePaymentMethodRequest(selectedPayment._id, {
            isDefault: true
          });
          setPaymentMethods(updatedMethods);
          mergedUser = { ...mergedUser, paymentMethods: updatedMethods };
        }
        orderPaymentMethod = { brand: selectedPayment.brand, last4: selectedPayment.last4 };
      }

      if (mergedUser !== user) {
        setUserData(mergedUser);
      }

      const payload = { shippingAddress, paymentMethod: orderPaymentMethod };
      if (buyNow) {
        payload.items = [{ productId: buyNow.product._id, quantity: buyNow.quantity }];
      }

      const { data } = await createOrderRequest(payload);
      await refreshCart();
      navigate('/pedido-confirmado', { state: { order: data } });
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo procesar la compra');
    } finally {
      setLoading(false);
    }
  }

  if (!buyNow && items.length === 0) {
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

              {addressMode === 'selected' && selectedAddress && (
                <div className="address-summary">
                  <div className="address-card">
                    {selectedAddress.isDefault && (
                      <span className="badge address-default-badge">Predeterminada</span>
                    )}
                    <p className="address-card-name">{selectedAddress.fullName}</p>
                    <p>{selectedAddress.street}</p>
                    <p>
                      {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.zipCode}
                    </p>
                    <p>{selectedAddress.country}</p>
                    {selectedAddress.phone && <p>Tel: {formatPhoneDisplay(selectedAddress.phone)}</p>}
                  </div>
                  <div className="address-actions">
                    {addresses.length > 1 && (
                      <button type="button" className="btn btn-outline btn-sm" onClick={handleChooseOtherAddress}>
                        Elegir otra dirección
                      </button>
                    )}
                    <button type="button" className="btn btn-outline btn-sm" onClick={handleAddNewAddress}>
                      Agregar nueva dirección
                    </button>
                  </div>
                </div>
              )}

              {addressMode === 'choose' && (
                <div className="address-choose-list">
                  {addresses.map((addr) => (
                    <div
                      key={addr._id}
                      className={`address-card address-choice ${
                        selectedAddressId === addr._id ? 'selected' : ''
                      }`}
                      onClick={() => handleSelectSavedAddress(addr)}
                    >
                      {addr.isDefault && <span className="badge address-default-badge">Predeterminada</span>}
                      <p className="address-card-name">{addr.fullName}</p>
                      <p>{addr.street}</p>
                      <p>
                        {addr.city}, {addr.state}, {addr.zipCode}
                      </p>
                    </div>
                  ))}
                  <div className="address-actions">
                    <button type="button" className="btn btn-outline btn-sm" onClick={handleAddNewAddress}>
                      Agregar nueva dirección
                    </button>
                    <button type="button" className="btn btn-ghost btn-sm" onClick={handleCancelAddressEdit}>
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              {addressMode === 'new' && (
                <div className="address-new-form">
                  <div className="form-group">
                    <label htmlFor="fullName">Nombre completo</label>
                    <input
                      id="fullName"
                      name="fullName"
                      value={newAddress.fullName}
                      onChange={handleNewAddressChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="street">Calle y número</label>
                    <input id="street" name="street" value={newAddress.street} onChange={handleNewAddressChange} />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">Ciudad</label>
                      <input id="city" name="city" value={newAddress.city} onChange={handleNewAddressChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="state">Estado</label>
                      <input id="state" name="state" value={newAddress.state} onChange={handleNewAddressChange} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="zipCode">Código postal</label>
                      <input
                        id="zipCode"
                        name="zipCode"
                        value={newAddress.zipCode}
                        onChange={handleNewAddressChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Teléfono</label>
                      <input
                        id="phone"
                        type="tel"
                        inputMode="numeric"
                        placeholder="000 000 0000"
                        maxLength={12}
                        value={formatPhoneDisplay(newAddress.phone)}
                        onChange={handleNewAddressPhoneChange}
                      />
                    </div>
                  </div>
                  {addresses.length > 0 && (
                    <button type="button" className="btn btn-ghost btn-sm" onClick={handleCancelAddressEdit}>
                      Cancelar y usar una dirección guardada
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="checkout-section card">
              <h3>Método de pago</h3>

              {paymentMode === 'selected' && selectedPayment && (
                <div className="address-summary">
                  <div className="address-card">
                    {selectedPayment.isDefault && (
                      <span className="badge address-default-badge">Predeterminado</span>
                    )}
                    <p className="address-card-name">{selectedPayment.cardholderName}</p>
                    <p>
                      {selectedPayment.brand} •••• {selectedPayment.last4}
                    </p>
                    <p>Vence {selectedPayment.expiry}</p>
                  </div>
                  <div className="address-actions">
                    {paymentMethods.length > 1 && (
                      <button type="button" className="btn btn-outline btn-sm" onClick={handleChooseOtherPayment}>
                        Elegir otro método
                      </button>
                    )}
                    <button type="button" className="btn btn-outline btn-sm" onClick={handleAddNewPayment}>
                      Agregar nuevo método
                    </button>
                  </div>
                </div>
              )}

              {paymentMode === 'choose' && (
                <div className="address-choose-list">
                  {paymentMethods.map((method) => (
                    <div
                      key={method._id}
                      className={`address-card address-choice ${
                        selectedPaymentId === method._id ? 'selected' : ''
                      }`}
                      onClick={() => handleSelectSavedPayment(method)}
                    >
                      {method.isDefault && <span className="badge address-default-badge">Predeterminado</span>}
                      <p className="address-card-name">{method.cardholderName}</p>
                      <p>
                        {method.brand} •••• {method.last4}
                      </p>
                      <p>Vence {method.expiry}</p>
                    </div>
                  ))}
                  <div className="address-actions">
                    <button type="button" className="btn btn-outline btn-sm" onClick={handleAddNewPayment}>
                      Agregar nuevo método
                    </button>
                    <button type="button" className="btn btn-ghost btn-sm" onClick={handleCancelPaymentEdit}>
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              {paymentMode === 'new' && (
                <div className="address-new-form">
                  <div className="form-group">
                    <label htmlFor="cardholderName">Nombre en la tarjeta</label>
                    <input
                      id="cardholderName"
                      name="cardholderName"
                      value={newCard.cardholderName}
                      onChange={handleNewCardChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cardNumber">Número de tarjeta</label>
                    <input
                      id="cardNumber"
                      inputMode="numeric"
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      value={formatCardNumberDisplay(newCard.cardNumber)}
                      onChange={handleNewCardNumberChange}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="expiry">Expiración (MM/AA)</label>
                      <input
                        id="expiry"
                        inputMode="numeric"
                        placeholder="00/00"
                        maxLength={5}
                        value={formatExpiryDisplay(newCard.expiry)}
                        onChange={handleNewCardExpiryChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        id="cvv"
                        inputMode="numeric"
                        placeholder="123"
                        maxLength={4}
                        value={newCard.cvv}
                        onChange={handleNewCardCvvChange}
                      />
                    </div>
                  </div>
                  {paymentMethods.length > 0 && (
                    <button type="button" className="btn btn-ghost btn-sm" onClick={handleCancelPaymentEdit}>
                      Cancelar y usar un método guardado
                    </button>
                  )}
                </div>
              )}

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
                  <span>{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="checkout-summary-item">
              <span>Total de productos</span>
              <span>{totalItems}</span>
            </div>
            <div className="checkout-total">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            {error && <p className="error-text" style={{ marginTop: 14 }}>{error}</p>}

            <div className="checkout-actions">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => navigate(buyNow ? `/producto/${buyNow.product._id}` : '/carrito')}
              >
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
