import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import cinnamonBun from "@/assets/cinnamon-bun.jpg";
import chocolateBun from "@/assets/chocolate-bun.jpg";
import blueberryBun from "@/assets/blueberry-bun.jpg";
import honeyBun from "@/assets/honey-bun.jpg";

const API_BASE = "http://localhost:3000/api";
const imageMap: Record<string, string> = {
  Sweet: cinnamonBun,
  Fruit: blueberryBun,
  Savory: honeyBun,
  Special: chocolateBun,
};

interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
  rating?: number;
  reviews?: number;
  category?: string;
  inStock?: boolean;
  featured?: boolean;
}

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/products?limit=8`)
      .then((res) => res.json())
      .then((data: Product[]) => {
        const fp = data.filter((p) => p.featured);
        setFeaturedProducts(fp);
      })
      .catch(() => setFeaturedProducts([]));
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Buns
            </h2>
            <p className="text-muted-foreground text-lg">
              Our most popular and beloved creations
            </p>
          </div>
          <Button variant="outline" className="hidden sm:flex" asChild>
            <Link to="/products">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              image={product.image || imageMap[product.category] || cinnamonBun}
              rating={product.rating || 0}
              reviews={product.reviews || 0}
              category={product.category || "Uncategorized"}
              inStock={product.inStock ?? true}
              featured={product.featured}
            />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="flex justify-center mt-8 sm:hidden">
          <Button variant="outline" asChild>
            <Link to="/products">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;