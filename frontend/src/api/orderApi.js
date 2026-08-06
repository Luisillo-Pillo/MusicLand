import axiosClient from './axiosClient';

export const createOrderRequest = (data) => axiosClient.post('/orders', data);
export const getMyOrdersRequest = () => axiosClient.get('/orders');
export const getUserOrdersRequest = (userId) => axiosClient.get(`/orders/user/${userId}`);
export const getOrderByIdRequest = (id) => axiosClient.get(`/orders/${id}`);
export const getAllOrdersRequest = (params) => axiosClient.get('/orders/all', { params });
export const updateOrderStatusRequest = (id, status) =>
  axiosClient.put(`/orders/${id}/status`, { status });
export const cancelOrderRequest = (id, reason = '') =>
  axiosClient.put(`/orders/${id}/cancel`, { reason });
export const deleteOrderRequest = (id) => axiosClient.delete(`/orders/${id}`);
