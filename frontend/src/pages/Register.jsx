import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const { register: reg, handleSubmit } = useForm();
  const { register: doRegister } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async ({ name, email, password }) => {
    setError('');
    try { await doRegister(name, email, password); navigate('/login'); }
    catch (e) { setError(e.message); }
  };

  return (
    <main style={{ padding: 16 }}>
      <h1>Register</h1>
      {error && <p style={{ color:'red' }}>{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Name" {...reg('name', { required: true })} /><br />
        <input placeholder="Email" {...reg('email', { required: true })} /><br />
        <input placeholder="Password" type="password" {...reg('password', { required: true })} /><br />
        <button>Create account</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </main>
  );
}
