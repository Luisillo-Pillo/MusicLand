// Endpoints de usuarios: gestión de cuentas ajenas (admin) y de los propios
// datos/direcciones/métodos de pago del usuario autenticado ("/me/*").
import axiosClient from './axiosClient';

export const getAllUsersRequest = () => axiosClient.get('/users'); // solo admin
export const getUserByIdRequest = (id) => axiosClient.get(`/users/${id}`); // solo admin
export const updateUserRoleRequest = (id, role) => axiosClient.put(`/users/${id}/role`, { role }); // solo admin
export const deleteUserRequest = (id) => axiosClient.delete(`/users/${id}`); // solo admin
export const contactUserRequest = (id, data) => axiosClient.post(`/users/${id}/contact`, data); // solo admin, correo directo a un cliente

export const addAddressRequest = (data) => axiosClient.post('/users/me/addresses', data);
export const updateAddressRequest = (id, data) => axiosClient.put(`/users/me/addresses/${id}`, data);
export const deleteAddressRequest = (id) => axiosClient.delete(`/users/me/addresses/${id}`);

export const addPaymentMethodRequest = (data) => axiosClient.post('/users/me/payment-methods', data);
export const updatePaymentMethodRequest = (id, data) =>
  axiosClient.put(`/users/me/payment-methods/${id}`, data);
export const deletePaymentMethodRequest = (id) =>
  axiosClient.delete(`/users/me/payment-methods/${id}`);
