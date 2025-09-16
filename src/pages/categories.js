import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

const categories = [
  { name: 'Classics', description: 'Timeless buns with buttercream and cinnamon.' },
  { name: 'Seasonal', description: 'Limited drops inspired by local harvests.' },
  { name: 'Savory', description: 'Herb focaccia twists and cheese-stuffed buns.' },
  { name: 'Vegan', description: 'Plant-based recipes with no compromise on flavour.' },
];

export default function CategoriesPage() {
  return (
    <>
      <Head>
        <title>Categories | Bun Shop</title>
      </Head>
      <Header />
      <main className="container" style={{ padding: '72px 0 120px' }}>
        <section style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1>Shop by craving</h1>
          <p className="notice">
            Every category can be curated from the admin panel using the unified API endpoints.
          </p>
        </section>

        <div className="grid">
          {categories.map(category => (
            <article key={category.name} className="card">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
