import { useState } from "react";
import { Search, Filter, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import cinnamonBun from "@/assets/cinnamon-bun.jpg";
import chocolateBun from "@/assets/chocolate-bun.jpg";
import blueberryBun from "@/assets/blueberry-bun.jpg";
import honeyBun from "@/assets/honey-bun.jpg";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Mock products data
  const allProducts = [
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
    // Add more products by duplicating with different names
    {
      id: "5",
      name: "Double Chocolate Bun",
      price: 5.99,
      image: chocolateBun,
      rating: 4.8,
      reviews: 67,
      category: "Sweet",
      inStock: true,
    },
    {
      id: "6",
      name: "Mixed Berry Bun",
      price: 5.79,
      image: blueberryBun,
      rating: 4.5,
      reviews: 92,
      category: "Fruit", 
      inStock: true,
    },
  ];

  const categories = ["all", "Sweet", "Fruit", "Savory", "Special"];

  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-light py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Delicious Buns
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our complete collection of handcrafted buns, made fresh daily with love and premium ingredients
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search buns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {allProducts.length} products
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;