import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Secret from './pages/Secret';

import { ThemeProvider } from 'styled-components';
import { getTheme } from './ui/theme';
import { GlobalStyle } from './ui/GlobalStyle';
import { Nav, NavGroup, NavLink, GhostButton } from './ui/components';
import { useLocalStorage } from './hooks/useLocalStorage';

function Private({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [mode, setMode] = useLocalStorage('mode', 'light');
  const theme = getTheme(mode);
  const toggleMode = () => setMode(mode === 'light' ? 'dark' : 'light');

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>
        <BrowserRouter>
          <Nav>
            <NavGroup>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
              <NavLink to="/secret">Secret</NavLink>
            </NavGroup>
            <GhostButton onClick={toggleMode} aria-pressed={mode === 'dark'}>
              {mode === 'dark' ? '🌙 Dark' : '☀️ Light'}
            </GhostButton>
          </Nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/secret" element={<Private><Secret /></Private>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<div style={{ padding: 16 }}>Not found</div>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
