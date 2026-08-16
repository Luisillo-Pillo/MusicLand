// Envoltorios delgados sobre axiosClient para los endpoints de sesión: cada
// función arma la llamada HTTP a una ruta puntual del backend y devuelve la
// promesa de axios tal cual (quien llama es quien lee response.data).
import axiosClient from './axiosClient';

export const registerRequest = (data) => axiosClient.post('/auth/register', data); // crea la cuenta y devuelve { token, user }
export const loginRequest = (data) => axiosClient.post('/auth/login', data); // valida credenciales y devuelve { token, user }
export const getMeRequest = () => axiosClient.get('/users/me'); // datos del usuario ya autenticado (según el token enviado)
export const updateMeRequest = (data) => axiosClient.put('/users/me', data); // edita nombre/teléfono/contraseña propios
