import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function Login() {
  const { login } = useAuth();
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    mode: 'onTouched',
  });

  const onSubmit = async (v) => {
    setServerError('');
    try {
      await login(v.email, v.password);
      navigate('/');
    } catch (e) {
      setServerError(e.message || 'Login failed');
    }
  };

  return (
    <main style={{ padding: 16, maxWidth: 420 }}>
      <h1>Login</h1>
      {serverError && <p role="alert" style={{ color: 'red' }}>{serverError}</p>}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label>
          Email
          <input type="email" {...register('email')} aria-invalid={!!errors.email || undefined} aria-describedby={errors.email ? 'login-email-err' : undefined} />
        </label>
        {errors.email && <p id="login-email-err" role="alert" style={{ color: 'red' }}>{errors.email.message}</p>}

        <label>
          Password
          <input type="password" {...register('password')} aria-invalid={!!errors.password || undefined} aria-describedby={errors.password ? 'login-pass-err' : undefined} />
        </label>
        {errors.password && <p id="login-pass-err" role="alert" style={{ color: 'red' }}>{errors.password.message}</p>}

        <button disabled={isSubmitting} style={{ marginTop: 12 }}>
          {isSubmitting ? 'Logging in…' : 'Login'}
        </button>
      </form>

      <p style={{ marginTop: 12 }}>
        New here? <Link to="/register">Create an account</Link>
      </p>
    </main>
  );
}
