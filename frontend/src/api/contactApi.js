import axiosClient from './axiosClient';

export const sendContactMessageRequest = (data) => axiosClient.post('/contact', data);
export const getContactMessagesRequest = () => axiosClient.get('/contact');
export const replyContactMessageRequest = (id, reply) => axiosClient.post(`/contact/${id}/reply`, { reply });
export const deleteContactMessageRequest = (id) => axiosClient.delete(`/contact/${id}`);
