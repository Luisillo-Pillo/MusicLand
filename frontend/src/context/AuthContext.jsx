import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { loginRequest, registerRequest, getMeRequest, updateMeRequest } from '../api/authApi';

const AuthContext = createContext(null);

// Guarda la sesión (usuario actual + funciones para iniciar/cerrar sesión) en
// un solo lugar, accesible desde cualquier componente con useAuth(). El JWT
// en sí vive en localStorage (lo agrega axiosClient a cada petición); aquí
// solo se guarda el usuario ya resuelto para pintar la interfaz.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // Empieza en true: evita que, por ejemplo, ProtectedRoute mande a /login a
  // alguien que sí tiene sesión válida solo porque loadUser todavía no responde.
  const [loading, setLoading] = useState(true);

  // Al montar la app: si hay un token guardado de una visita anterior, intenta
  // recuperar el usuario que le corresponde. Un token inválido o vencido se
  // descarta en silencio (queda como si nunca hubiera iniciado sesión).
  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('musicland_token');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await getMeRequest();
      setUser(data);
    } catch (error) {
      localStorage.removeItem('musicland_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Inicia sesión, guarda el token y deja al usuario listo en el contexto.
  async function login(email, password) {
    const { data } = await loginRequest({ email, password });
    localStorage.setItem('musicland_token', data.token);
    setUser(data.user);
    return data.user;
  }

  // Igual que login, pero crea la cuenta primero (el backend ya la deja logueada).
  async function register(payload) {
    const { data } = await registerRequest(payload);
    localStorage.setItem('musicland_token', data.token);
    setUser(data.user);
    return data.user;
  }

  // Cierra la sesión localmente: no hay endpoint de logout en el backend (un
  // JWT no se puede "invalidar" en el servidor sin una lista negra), así que
  // basta con borrar el token guardado para que deje de mandarse.
  function logout() {
    localStorage.removeItem('musicland_token');
    setUser(null);
  }

  // Guarda cambios de perfil (nombre, teléfono, contraseña) y refleja la
  // respuesta del servidor en el contexto para que la interfaz se actualice sola.
  async function updateProfile(payload) {
    const { data } = await updateMeRequest(payload);
    setUser(data);
    return data;
  }

  // Vía de escape para actualizar el usuario en memoria sin llamar al backend
  // (p. ej. tras agregar/borrar una dirección, que ya devuelve el usuario actualizado).
  function setUserData(nextUser) {
    setUser(nextUser);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, updateProfile, setUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
