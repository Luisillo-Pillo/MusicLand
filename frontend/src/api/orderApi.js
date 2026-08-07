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
export const requestReturnRequest = (id, { items, fullOrder, reason }) =>
  axiosClient.post(`/orders/${id}/return-request`, { items, fullOrder, reason });
export const getReturnRequestsRequest = () => axiosClient.get('/orders/returns');
export const updateReturnRequestStatusRequest = (id, status) =>
  axiosClient.put(`/orders/${id}/return-request/status`, { status });
export const deleteReturnRequestRequest = (id) => axiosClient.delete(`/orders/${id}/return-request`);
export const deleteOrderRequest = (id) => axiosClient.delete(`/orders/${id}`);
