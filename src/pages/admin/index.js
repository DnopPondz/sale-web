import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    } else if (user.role !== 'admin') {
      router.replace('/');
    }
  }, [user, router]);

  return (
    <>
      <Head>
        <title>Admin | Bun Shop</title>
      </Head>
      <Header />
      <main className="container" style={{ padding: '80px 0 120px' }}>
        <section className="card" style={{ textAlign: 'center' }}>
          <h1>Admin dashboard</h1>
          <p>
            Manage the catalog, promotions, and orders here. Additional management features can be added to this area as the
            project grows.
          </p>
          <Button variant="outline" onClick={() => router.push('/')}>Back to storefront</Button>
        </section>
      </main>
      <Footer />
    </>
  );
}
