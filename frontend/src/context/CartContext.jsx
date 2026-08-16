import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import {
  getCartRequest,
  addToCartRequest,
  updateCartItemRequest,
  removeCartItemRequest,
  clearCartRequest
} from '../api/cartApi';
import { getSellingPrice } from '../utils/format';

const CartContext = createContext(null);

// Carrito global de la app, accesible desde cualquier componente con
// useCart(). Vive en el servidor (un carrito por usuario, ver cartController
// en el backend); este contexto solo mantiene una copia en memoria y la
// sincroniza después de cada acción, para no tener que recargar la página.
export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Vuelve a pedir el carrito completo al backend. Sin usuario logueado no
  // hay carrito que traer (se vacía en memoria); se re-ejecuta automáticamente
  // cada vez que cambia `user` (login/logout) gracias al useEffect de abajo.
  const refreshCart = useCallback(async () => {
    if (!user) {
      setItems([]);
      return;
    }
    setLoading(true);
    try {
      const { data } = await getCartRequest();
      setItems(data);
    } catch (error) {
      // El carrito es accesorio: si no carga, la app sigue siendo usable vacía.
      console.error('No se pudo cargar el carrito:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  // Agrega un producto (o suma cantidad si ya estaba); el backend valida
  // stock y devuelve el carrito completo ya actualizado, que reemplaza al local.
  async function addToCart(productId, quantity = 1) {
    const { data } = await addToCartRequest(productId, quantity);
    setItems(data);
  }

  // Cambia la cantidad de un producto ya en el carrito (0 lo elimina, lo valida el backend).
  async function updateQuantity(productId, quantity) {
    const { data } = await updateCartItemRequest(productId, quantity);
    setItems(data);
  }

  // Quita un producto por completo.
  async function removeItem(productId) {
    const { data } = await removeCartItemRequest(productId);
    setItems(data);
  }

  // Vacía el carrito (usado, por ejemplo, tras completar una compra).
  async function clearCart() {
    await clearCartRequest();
    setItems([]);
  }

  // Totales derivados en cada render, no guardados en estado aparte: así
  // nunca pueden desincronizarse de `items`, que es la única fuente de verdad.
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  // getSellingPrice (no item.product.price directo): si un producto tiene
  // oferta, el total del carrito debe reflejar el precio con descuento —
  // que es justo el que orderController cobra al confirmar la compra — no
  // el de lista, o el badge del carrito (header) y el total de Checkout no
  // coincidirían con lo que en verdad se paga.
  const totalPrice = items.reduce((sum, item) => sum + getSellingPrice(item.product) * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        totalItems,
        totalPrice,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        refreshCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider');
  return ctx;
}
