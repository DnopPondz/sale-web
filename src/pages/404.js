import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>Page not found | Bun Shop</title>
      </Head>
      <Header />
      <main className="container" style={{ padding: '96px 0 120px', textAlign: 'center' }}>
        <section className="card" style={{ display: 'inline-flex', flexDirection: 'column', gap: '16px', maxWidth: 480 }}>
          <h1>Oops, nothing here</h1>
          <p className="notice">The bun you are looking for might be in another oven.</p>
          <Link href="/">
            <Button>Back to home</Button>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
