import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useLocalStorage('token', null);
  const [user, setUser] = useLocalStorage('user', null);
  const api = import.meta.env.VITE_API_URL;

  const register = async (name, email, password) => {
    const r = await fetch(`${api}/api/auth/register`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const d = await r.json(); if (!r.ok) throw new Error(d.error || 'Register failed');
    return true;
  };

  const login = async (email, password) => {
    const r = await fetch(`${api}/api/auth/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const d = await r.json(); if (!r.ok) throw new Error(d.error || 'Login failed');
    setToken(d.token); setUser(d.user);
  };

  const logout = () => { setToken(null); setUser(null); };

  const value = useMemo(() => ({ token, user, isLoggedIn: !!token, register, login, logout }), [token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
