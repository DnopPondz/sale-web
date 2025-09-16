import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About | Bun Shop</title>
      </Head>
      <Header />
      <main className="container" style={{ padding: '72px 0 120px', lineHeight: 1.7 }}>
        <article className="card">
          <h1>Our story</h1>
          <p>
            Bun Shop started as a weekend pop-up in Bangkok with a single oven and a passion for soft, fluffy buns. Today, we
            bake in small batches throughout the day, pairing traditional techniques with modern flavours to keep things
            exciting.
          </p>
          <p>
            This demo storefront is now powered by Next.js API routes, letting you manage products, promotions, and customer
            accounts from a single backend. Extend the pages in <code>/pages</code> and hook into the API endpoints under{' '}
            <code>/pages/api</code> to build the experience your team needs.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
