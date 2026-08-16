import axios from 'axios';

// Cliente axios único para toda la app: centraliza la URL base del backend
// (configurable por variable de entorno) y la autenticación.
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

// Adjunta el JWT guardado en localStorage a cada petición saliente, si existe.
// Así ningún archivo api/*.js necesita preocuparse por la sesión: basta con
// haber iniciado sesión una vez para que todas las peticiones vayan autenticadas.
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('musicland_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Cuando el servidor SÍ responde (400/401/403/404/409/500...), axios trae ese
// error en err.response.data.message y cada página ya lo muestra con su
// propio texto de repuesto (`err.response?.data?.message || '...'`). Pero si
// la petición ni siquiera llegó a completarse — sin internet, el backend
// caído, CORS, tiempo de espera agotado — err.response es undefined, y sin
// esto cada una de esas casi 30 pantallas mostraría su mensaje genérico de
// "no se pudo cargar/guardar/enviar" como si el problema fuera de datos, no
// de conexión (justo la distinción que sitios como Amazon o MercadoLibre sí
// marcan: "No se pudo completar tu pedido" vs. "Revisa tu conexión a
// internet"). Este interceptor rellena esa respuesta faltante con un mensaje
// de conexión en el mismo formato (`response.data.message`) que ya esperan
// todos los `catch`, así que ninguna pantalla necesita un caso especial.
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      const timedOut = error.code === 'ECONNABORTED';
      error.response = {
        data: {
          message: timedOut
            ? 'La solicitud está tardando más de lo normal. Revisa tu conexión e inténtalo de nuevo.'
            : 'No pudimos conectar con el servidor. Revisa tu conexión a internet e inténtalo de nuevo.'
        }
      };
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
