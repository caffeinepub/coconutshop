import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types";
import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, isAddingToCart } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await addToCart({ productId: product.id, quantity: 1n });
      toast.success(`${product.name} added to cart!`);
    } catch {
      toast.error("Failed to add to cart. Please try again.");
    }
  };

  const isOutOfStock = Number(product.stock) === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
    >
      <Link to="/product/$id" params={{ id: product.id.toString() }}>
        <Card
          className="group overflow-hidden border border-border bg-card hover:shadow-warm-hover transition-smooth cursor-pointer h-full flex flex-col"
          data-ocid="product-card"
        >
          {/* Product Image */}
          <div className="relative overflow-hidden bg-muted aspect-square">
            <img
              src={
                product.imageUrl ||
                "/assets/generated/product-classic-tender.dim_600x600.jpg"
              }
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            />
            {isOutOfStock && (
              <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                <Badge variant="secondary" className="text-xs font-semibold">
                  Out of Stock
                </Badge>
              </div>
            )}
            {!isOutOfStock && Number(product.stock) <= 5 && (
              <div className="absolute top-2 left-2">
                <Badge className="bg-accent text-accent-foreground text-xs">
                  Only {Number(product.stock)} left
                </Badge>
              </div>
            )}
          </div>

          {/* Card Content */}
          <CardContent className="p-4 flex flex-col flex-1 gap-3">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">
                {product.category}
              </p>
              <h3 className="font-display font-semibold text-foreground text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {product.description}
              </p>
            </div>

            <div className="flex items-center justify-between gap-2 pt-1">
              <span className="font-display font-bold text-lg text-foreground">
                {formatPrice(product.price)}
              </span>
              <Button
                size="sm"
                disabled={isOutOfStock || isAddingToCart}
                onClick={handleAddToCart}
                className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0 font-semibold"
                data-ocid="add-to-cart-btn"
              >
                <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                Add to Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
