import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Cookie, Apple, Coffee, Zap } from "lucide-react";

const CategoriesSection = () => {
  const categories = [
    {
      id: "sweet",
      name: "Sweet Buns",
      description: "Indulgent treats for your sweet tooth",
      icon: Cookie,
      count: 18,
      color: "bg-gradient-to-br from-pink-50 to-orange-50",
      iconColor: "text-pink-600",
    },
    {
      id: "fruit",
      name: "Fruit Buns",
      description: "Fresh fruit-filled delights",
      icon: Apple,
      count: 12,
      color: "bg-gradient-to-br from-green-50 to-emerald-50",
      iconColor: "text-green-600",
    },
    {
      id: "savory",
      name: "Savory Buns",
      description: "Perfect for meals and snacks",
      icon: Coffee,
      count: 15,
      color: "bg-gradient-to-br from-amber-50 to-yellow-50",
      iconColor: "text-amber-600",
    },
    {
      id: "special",
      name: "Special Edition",
      description: "Limited time seasonal favorites",
      icon: Zap,
      count: 6,
      color: "bg-gradient-to-br from-purple-50 to-pink-50",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our diverse collection of artisanal buns, each category crafted 
            with unique flavors and premium ingredients
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.id} 
                className="group cursor-pointer border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-card hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className={`w-16 h-16 rounded-2xl ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`h-8 w-8 ${category.iconColor}`} />
                  </div>
                  
                  <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {category.count} items
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-0 h-auto text-muted-foreground group-hover:text-primary transition-colors"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-soft">
            Browse All Categories
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;