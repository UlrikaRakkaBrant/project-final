import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm your password'),
}).refine(v => v.password === v.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword'],
});

export default function Register() {
  const { register: doRegister } = useAuth();
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    mode: 'onTouched',
  });

  const onSubmit = async ({ name, email, password }) => {
    setServerError('');
    try {
      await doRegister(name, email, password);
      navigate('/login');
    } catch (e) {
      setServerError(e.message || 'Register failed');
    }
  };

  return (
    <main style={{ padding: 16, maxWidth: 420 }}>
      <h1>Register</h1>
      {serverError && <p role="alert" style={{ color: 'red' }}>{serverError}</p>}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label>
          Name
          <input {...register('name')} aria-invalid={!!errors.name || undefined} aria-describedby={errors.name ? 'name-err' : undefined} />
        </label>
        {errors.name && <p id="name-err" role="alert" style={{ color: 'red' }}>{errors.name.message}</p>}

        <label>
          Email
          <input type="email" {...register('email')} aria-invalid={!!errors.email || undefined} aria-describedby={errors.email ? 'email-err' : undefined} />
        </label>
        {errors.email && <p id="email-err" role="alert" style={{ color: 'red' }}>{errors.email.message}</p>}

        <label>
          Password
          <input type="password" {...register('password')} aria-invalid={!!errors.password || undefined} aria-describedby={errors.password ? 'password-err' : undefined} />
        </label>
        {errors.password && <p id="password-err" role="alert" style={{ color: 'red' }}>{errors.password.message}</p>}

        <label>
          Confirm password
          <input type="password" {...register('confirmPassword')} aria-invalid={!!errors.confirmPassword || undefined} aria-describedby={errors.confirmPassword ? 'confirm-err' : undefined} />
        </label>
        {errors.confirmPassword && <p id="confirm-err" role="alert" style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}

        <button disabled={isSubmitting} style={{ marginTop: 12 }}>
          {isSubmitting ? 'Creating…' : 'Create account'}
        </button>
      </form>

      <p style={{ marginTop: 12 }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </main>
  );
}
