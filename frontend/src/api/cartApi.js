import axiosClient from './axiosClient';

export const getCartRequest = () => axiosClient.get('/cart');
export const addToCartRequest = (productId, quantity = 1) =>
  axiosClient.post('/cart', { productId, quantity });
export const updateCartItemRequest = (productId, quantity) =>
  axiosClient.put(`/cart/${productId}`, { quantity });
export const removeCartItemRequest = (productId) => axiosClient.delete(`/cart/${productId}`);
export const clearCartRequest = () => axiosClient.delete('/cart/clear');
