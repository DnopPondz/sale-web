import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Categories = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">Categories</h1>
        <p className="text-muted-foreground">Browse products by category. Coming soon!</p>
      </main>
      <Footer />
    </div>
  );
};

export default Categories;
