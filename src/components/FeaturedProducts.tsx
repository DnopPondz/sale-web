import ProductCard from "./ProductCard";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import cinnamonBun from "@/assets/cinnamon-bun.jpg";
import chocolateBun from "@/assets/chocolate-bun.jpg";
import blueberryBun from "@/assets/blueberry-bun.jpg";
import honeyBun from "@/assets/honey-bun.jpg";

const FeaturedProducts = () => {
  const featuredProducts = [
    {
      id: "1",
      name: "Classic Cinnamon Bun",
      price: 4.99,
      image: cinnamonBun,
      rating: 4.8,
      reviews: 124,
      category: "Sweet",
      inStock: true,
      featured: true,
    },
    {
      id: "2", 
      name: "Chocolate Chip Delight",
      price: 5.49,
      image: chocolateBun,
      rating: 4.9,
      reviews: 89,
      category: "Sweet",
      inStock: true,
      featured: true,
    },
    {
      id: "3",
      name: "Blueberry Burst",
      price: 5.29,
      image: blueberryBun,
      rating: 4.7,
      reviews: 156,
      category: "Fruit",
      inStock: true,
      featured: true,
    },
    {
      id: "4",
      name: "Honey Glazed",
      price: 4.79,
      image: honeyBun,
      rating: 4.6,
      reviews: 203,
      category: "Sweet",
      inStock: false,
    },
  ];

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
            <ProductCard key={product.id} {...product} />
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