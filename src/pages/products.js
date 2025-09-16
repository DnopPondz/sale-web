import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';

const sampleProducts = [
  { name: 'Cinnamon classic', description: 'Our signature cinnamon roll with vanilla glaze.' },
  { name: 'Chocolate lava bun', description: 'Molten dark chocolate center and cocoa crumble.' },
  { name: 'Honey pistachio swirl', description: 'Roasted pistachios, local honey, and citrus zest.' },
];

export default function ProductsPage() {
  return (
    <>
      <Head>
        <title>Products | Bun Shop</title>
      </Head>
      <Header />
      <main className="container" style={{ padding: '72px 0 120px' }}>
        <section style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1>Explore customer favourites</h1>
          <p className="notice">
            Discover curated bundles and seasonal treats. Use the admin dashboard to manage the live catalog.
          </p>
        </section>

        <div className="grid">
          {sampleProducts.map(product => (
            <article key={product.name} className="card">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <Button variant="outline">Add to cart</Button>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
