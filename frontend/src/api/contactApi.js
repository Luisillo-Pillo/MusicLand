import axiosClient from './axiosClient';

export const sendContactMessageRequest = (data) => axiosClient.post('/contact', data);
export const getContactMessagesRequest = () => axiosClient.get('/contact');
