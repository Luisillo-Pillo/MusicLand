// Endpoints de pedidos: creación, consulta propia/ajena, cancelación y devoluciones.
import axiosClient from './axiosClient';

export const createOrderRequest = (data) => axiosClient.post('/orders', data);
export const getMyOrdersRequest = () => axiosClient.get('/orders'); // pedidos del usuario autenticado
export const getUserOrdersRequest = (userId) => axiosClient.get(`/orders/user/${userId}`); // solo admin, pedidos de un cliente puntual
export const getOrderByIdRequest = (id) => axiosClient.get(`/orders/${id}`);
export const getAllOrdersRequest = (params) => axiosClient.get('/orders/all', { params }); // solo admin, con filtro opcional por estatus
export const updateOrderStatusRequest = (id, status) =>
  axiosClient.put(`/orders/${id}/status`, { status });
export const cancelOrderRequest = (id, reason = '') =>
  axiosClient.put(`/orders/${id}/cancel`, { reason });
export const requestReturnRequest = (id, { items, fullOrder, reason }) =>
  axiosClient.post(`/orders/${id}/return-request`, { items, fullOrder, reason });
export const getReturnRequestsRequest = () => axiosClient.get('/orders/returns');
export const updateReturnRequestStatusRequest = (id, requestId, status) =>
  axiosClient.put(`/orders/${id}/return-request/${requestId}/status`, { status });
export const deleteReturnRequestRequest = (id, requestId) =>
  axiosClient.delete(`/orders/${id}/return-request/${requestId}`);
export const deleteOrderRequest = (id) => axiosClient.delete(`/orders/${id}`);
