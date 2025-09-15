import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  inStock: boolean;
  featured?: boolean;
}

const ProductCard = ({ 
  name, 
  price, 
  image, 
  rating, 
  reviews, 
  category, 
  inStock,
  featured = false 
}: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-card">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {featured && (
            <Badge className="bg-gradient-primary text-white border-0 shadow-soft">
              Featured
            </Badge>
          )}
          {!inStock && (
            <Badge variant="destructive">
              Sold Out
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full shadow-card">
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Add to Cart Overlay */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            className="w-full bg-white/90 text-foreground border border-white/20 hover:bg-white shadow-card backdrop-blur-sm"
            disabled={!inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 text-warning fill-warning" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-xs text-muted-foreground">({reviews})</span>
          </div>
        </div>

        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
          {name}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">
            ${price.toFixed(2)}
          </span>
          <Button size="sm" variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-primary">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;