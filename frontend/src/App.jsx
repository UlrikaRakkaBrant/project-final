import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Secret from './pages/Secret';

function Private({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <nav style={{ padding: 8, borderBottom: '1px solid #ddd' }}>
          <Link to="/">Home</Link> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link> | <Link to="/secret">Secret</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/secret" element={<Private><Secret /></Private>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<div style={{ padding: 16 }}>Not found</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
