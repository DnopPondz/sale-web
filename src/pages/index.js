import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

const highlights = [
  {
    title: 'Freshly baked every hour',
    description: 'Soft, golden buns crafted with local butter and a secret cinnamon blend.',
  },
  {
    title: 'Curated seasonal flavours',
    description: 'From honey pistachio to blueberry crumble, discover rotating specials.',
  },
  {
    title: 'Pick-up & delivery',
    description: 'Order ahead for swift pick-up or schedule doorstep delivery on your terms.',
  },
];

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Bun Shop | Sweet buns & artisan treats</title>
      </Head>
      <Header />
      <main>
        <section className="hero">
          <div className="container">
            <h1>Comforting buns baked with a modern twist</h1>
            <p>
              Join our community of pastry lovers and enjoy handcrafted buns, curated tasting boxes,
              and exclusive promotions for members.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <Link href="/products">
                <Button>Browse products</Button>
              </Link>
              <Link href="/register">
                <Button variant="outline">Join the club</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="container" style={{ paddingBottom: '72px' }}>
          <div className="grid">
            {highlights.map(item => (
              <article key={item.title} className="card">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
