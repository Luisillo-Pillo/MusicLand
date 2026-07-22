import axiosClient from './axiosClient';

export const getAllUsersRequest = () => axiosClient.get('/users');
export const getUserByIdRequest = (id) => axiosClient.get(`/users/${id}`);
export const updateUserRoleRequest = (id, role) => axiosClient.put(`/users/${id}/role`, { role });
export const deleteUserRequest = (id) => axiosClient.delete(`/users/${id}`);

export const addAddressRequest = (data) => axiosClient.post('/users/me/addresses', data);
export const updateAddressRequest = (id, data) => axiosClient.put(`/users/me/addresses/${id}`, data);
export const deleteAddressRequest = (id) => axiosClient.delete(`/users/me/addresses/${id}`);

export const addPaymentMethodRequest = (data) => axiosClient.post('/users/me/payment-methods', data);
export const deletePaymentMethodRequest = (id) =>
  axiosClient.delete(`/users/me/payment-methods/${id}`);
