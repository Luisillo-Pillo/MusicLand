import axiosClient from './axiosClient';

export const getProductsRequest = (params) => axiosClient.get('/products', { params });
export const getFeaturedProductsRequest = () => axiosClient.get('/products/featured');
export const getFiltersRequest = () => axiosClient.get('/products/filters');
export const getProductByIdRequest = (id) => axiosClient.get(`/products/${id}`);
export const createProductRequest = (data) => axiosClient.post('/products', data);
export const updateProductRequest = (id, data) => axiosClient.put(`/products/${id}`, data);
export const deleteProductRequest = (id) => axiosClient.delete(`/products/${id}`);
