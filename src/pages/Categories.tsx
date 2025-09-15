import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface CategoryInfo {
  name: string;
  count: number;
}

const Categories = () => {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((products: { category?: string }[]) => {
        const counts: Record<string, number> = {};
        products.forEach((p) => {
          const cat = p.category || "Uncategorized";
          counts[cat] = (counts[cat] || 0) + 1;
        });
        setCategories(
          Object.entries(counts).map(([name, count]) => ({ name, count }))
        );
      })
      .catch(() => setCategories([]));
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">Categories</h1>
        {categories.length > 0 ? (
          <>
            <p className="text-muted-foreground mb-8">
              We have {categories.length} categories.
            </p>
            <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {categories.map((cat) => (
                <li
                  key={cat.name}
                  className="p-4 border rounded-lg text-left"
                >
                  <h2 className="text-xl font-semibold text-foreground">
                    {cat.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {cat.count} product{cat.count === 1 ? "" : "s"}
                  </p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-muted-foreground">No categories found.</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Categories;
