// Endpoints del formulario público de Contacto y su bandeja en el panel admin.
import axiosClient from './axiosClient';

export const sendContactMessageRequest = (data) => axiosClient.post('/contact', data); // público, sin sesión
export const getContactMessagesRequest = () => axiosClient.get('/contact'); // solo admin
export const replyContactMessageRequest = (id, reply) => axiosClient.post(`/contact/${id}/reply`, { reply }); // solo admin
export const deleteContactMessageRequest = (id) => axiosClient.delete(`/contact/${id}`); // solo admin
