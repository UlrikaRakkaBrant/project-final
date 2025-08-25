import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { register: reg, handleSubmit } = useForm();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (v) => {
    setError('');
    try { await login(v.email, v.password); navigate('/'); }
    catch (e) { setError(e.message); }
  };

  return (
    <main style={{ padding: 16 }}>
      <h1>Login</h1>
      {error && <p style={{ color:'red' }}>{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Email" {...reg('email', { required: true })} /><br />
        <input placeholder="Password" type="password" {...reg('password', { required: true })} /><br />
        <button>Login</button>
      </form>
      <p>New here? <Link to="/register">Create an account</Link></p>
    </main>
  );
}
