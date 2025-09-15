import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">About Us</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We're passionate about crafting the freshest buns with the finest ingredients. More information about our story will be added soon.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default About;
