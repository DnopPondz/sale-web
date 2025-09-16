import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { Input, Label } from '../components/Input';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async event => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.user) {
        router.push(result.user.role === 'admin' ? '/admin' : '/');
      } else {
        setError(result.error || 'Unable to login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login | Bun Shop</title>
      </Head>
      <Header />
      <main>
        <form className="form-card" onSubmit={handleSubmit}>
          <h1 className="form-title">Welcome back</h1>
          <p className="form-subtitle">Sign in to manage your orders and rewards.</p>

          <div className="input-group">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              required
            />
          </div>

          {error ? <p className="error-text">{error}</p> : null}

          <Button type="submit" disabled={loading}>
            {loading ? 'Logging in…' : 'Login'}
          </Button>

          <p className="notice">
            New to Bun Shop?{' '}
            <Link href="/register" style={{ color: 'var(--primary-dark)' }}>
              Create an account
            </Link>
          </p>
        </form>
      </main>
      <Footer />
    </>
  );
}
