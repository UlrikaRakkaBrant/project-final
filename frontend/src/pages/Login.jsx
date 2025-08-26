import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Page, Card, H1, Hint, Field, Label, Input, ErrorText, Button } from '../ui/components';

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function Login() {
  const { login } = useAuth();
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema), mode: 'onTouched',
  });

  const onSubmit = async (v) => {
    setServerError('');
    try { await login(v.email, v.password); navigate('/'); }
    catch (e) { setServerError(e.message || 'Login failed'); }
  };

  return (
    <Page>
      <Card>
        <H1>Login</H1>
        <Hint>Welcome back! Please sign in to continue.</Hint>
        {serverError && <ErrorText role="alert">{serverError}</ErrorText>}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register('email')} aria-invalid={!!errors.email || undefined} />
            {errors.email && <ErrorText id="login-email-err">{errors.email.message}</ErrorText>}
          </Field>

          <Field>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register('password')} aria-invalid={!!errors.password || undefined} />
            {errors.password && <ErrorText id="login-pass-err">{errors.password.message}</ErrorText>}
          </Field>

          <Button disabled={isSubmitting} style={{ marginTop: 8 }}>
            {isSubmitting ? 'Logging in…' : 'Login'}
          </Button>
        </form>

        <Hint style={{ marginTop: 12 }}>
          New here? <Link to="/register">Create an account</Link>
        </Hint>
      </Card>
    </Page>
  );
}
