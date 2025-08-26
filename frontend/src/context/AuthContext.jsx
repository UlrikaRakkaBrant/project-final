import { createContext, useContext, useMemo, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import api, { setAuthToken } from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useLocalStorage('token', null);
  const [user, setUser] = useLocalStorage('user', null);

  // Whenever token changes (or on page refresh), apply/remove it on axios
  useEffect(() => { setAuthToken(token); }, [token]);

  const register = async (name, email, password) => {
    const { data } = await api.post('/api/auth/register', { name, email, password });
    // server returns { message: 'User created' }
    return data?.message === 'User created';
  };

  const login = async (email, password) => {
    const { data } = await api.post('/api/auth/login', { email, password });
    // data = { token, user }
    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setAuthToken(null); // remove Authorization header from axios
  };

  const value = useMemo(() => ({
    token, user, isLoggedIn: !!token, register, login, logout
  }), [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
