import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { loginRequest, registerRequest, getMeRequest, updateMeRequest } from '../api/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  async function login(email, password) {
    const { data } = await loginRequest({ email, password });
    localStorage.setItem('musicland_token', data.token);
    setUser(data.user);
    return data.user;
  }

  async function register(payload) {
    const { data } = await registerRequest(payload);
    localStorage.setItem('musicland_token', data.token);
    setUser(data.user);
    return data.user;
  }

  function logout() {
    localStorage.removeItem('musicland_token');
    setUser(null);
  }

  async function updateProfile(payload) {
    const { data } = await updateMeRequest(payload);
    setUser(data);
    return data;
  }

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
