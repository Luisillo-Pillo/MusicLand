import axiosClient from './axiosClient';

export const createOrderRequest = (data) => axiosClient.post('/orders', data);
export const getMyOrdersRequest = () => axiosClient.get('/orders');
export const getOrderByIdRequest = (id) => axiosClient.get(`/orders/${id}`);
