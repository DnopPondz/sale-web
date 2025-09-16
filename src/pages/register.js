import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { Input, Label } from '../components/Input';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', tel: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const updateField = event => {
    const { name, value } = event.target;
    setForm(current => ({ ...current, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const result = await register(form.email, form.name, form.tel, form.password);
      if (result.success) {
        setSuccess('Registration complete! You can now sign in.');
        setTimeout(() => router.push('/login'), 1200);
      } else {
        setError(result.error || 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Register | Bun Shop</title>
      </Head>
      <Header />
      <main>
        <form className="form-card" onSubmit={handleSubmit}>
          <h1 className="form-title">Create account</h1>
          <p className="form-subtitle">Join Bun Shop Rewards for seasonal offers and exclusive drops.</p>

          <div className="input-group">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={updateField}
              required
            />
          </div>

          <div className="input-group">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={updateField}
              required
            />
          </div>

          <div className="input-group">
            <Label htmlFor="tel">Phone</Label>
            <Input
              id="tel"
              name="tel"
              type="tel"
              autoComplete="tel"
              value={form.tel}
              onChange={updateField}
              required
            />
          </div>

          <div className="input-group">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={updateField}
              minLength={6}
              required
            />
          </div>

          {error ? <p className="error-text">{error}</p> : null}
          {success ? <p className="notice" style={{ color: 'var(--primary-dark)' }}>{success}</p> : null}

          <Button type="submit" disabled={loading}>
            {loading ? 'Creating account…' : 'Register'}
          </Button>

          <p className="notice">
            Already have an account?{' '}
            <Link href="/login" style={{ color: 'var(--primary-dark)' }}>
              Sign in
            </Link>
          </p>
        </form>
      </main>
      <Footer />
    </>
  );
}
