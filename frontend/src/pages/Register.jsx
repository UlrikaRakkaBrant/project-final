import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Page, Card, H1, Hint, Field, Label, Input, ErrorText, Button } from '../ui/components';
import WhatsNext from '../components/WhatsNext';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm your password'),
}).refine(v => v.password === v.confirmPassword, { message: 'Passwords must match', path: ['confirmPassword'] });

export default function Register() {
  const { register: doRegister } = useAuth();
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema), mode: 'onTouched',
  });

  const onSubmit = async ({ name, email, password }) => {
    setServerError('');
    try { await doRegister(name, email, password); navigate('/login'); }
    catch (e) { setServerError(e.message || 'Register failed'); }
  };

  return (
    <Page>
      <Card>
        <H1>Create account</H1>
        <Hint>Use a valid email and a password with at least 6 characters.</Hint>
        {serverError && <ErrorText role="alert">{serverError}</ErrorText>}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Field>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register('name')} aria-invalid={!!errors.name || undefined} />
            {errors.name && <ErrorText id="name-err">{errors.name.message}</ErrorText>}
          </Field>

          <Field>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register('email')} aria-invalid={!!errors.email || undefined} />
            {errors.email && <ErrorText id="email-err">{errors.email.message}</ErrorText>}
          </Field>

          <Field>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register('password')} aria-invalid={!!errors.password || undefined} />
            {errors.password && <ErrorText id="password-err">{errors.password.message}</ErrorText>}
          </Field>

          <Field>
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input id="confirmPassword" type="password" {...register('confirmPassword')} aria-invalid={!!errors.confirmPassword || undefined} />
            {errors.confirmPassword && <ErrorText id="confirm-err">{errors.confirmPassword.message}</ErrorText>}
          </Field>

          <Button disabled={isSubmitting} style={{ marginTop: 8 }}>
            {isSubmitting ? 'Creating…' : 'Create account'}
          </Button>
        </form>

        <Page>
          <Card>
            <H1>Create account</H1>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* your register fields + submit button stay as-is */}
            </form>

            <hr style={{ margin: '16px 0', border: 0, borderTop: '1px solid #e5e7eb' }} />
            <WhatsNext />
          </Card>
        </Page>

        <Hint style={{ marginTop: 12 }}>
          Already have an account? <Link to="/login">Login</Link>
        </Hint>
      </Card>
    </Page>
  );
}

