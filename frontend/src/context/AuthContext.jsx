// frontend/src/context/AuthContext.jsx
import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import api from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useLocalStorage('token', null);
  const [user, setUser] = useLocalStorage('user', null);

  const register = async (name, email, password) => {
    const { data } = await api.post('/api/auth/register', { name, email, password });
    return data?.message === 'User created';
  };

  const login = async (email, password) => {
    const { data } = await api.post('/api/auth/login', { email, password });
    // server returns { token, user }
    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    // No setAuthToken(null) anymore — the interceptor just won't find a token
  };

  const value = useMemo(
    () => ({ token, user, isLoggedIn: !!token, register, login, logout }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

