import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/hooks/use-cart";
import { useProduct } from "@/hooks/use-products";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle,
  Minus,
  Plus,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const SAMPLE_PRODUCTS: Record<string, Product> = {
  "1": {
    id: 1n,
    name: "Classic Tender Coconut",
    description:
      "Our signature organic tender coconuts are hand-picked at peak ripeness from certified farms. Each coconut is filled with naturally sweet, electrolyte-rich water and a layer of soft, silky coconut meat. Nothing added — pure tropical goodness in every sip.",
    price: 499n,
    imageUrl: "/assets/generated/product-classic-tender.dim_600x600.jpg",
    category: "Fresh Coconut",
    stock: 42n,
    isActive: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
  "2": {
    id: 2n,
    name: "Pandan Infused Coconut",
    description:
      "The beloved tropical pairing — fresh tender coconut naturally infused with fragrant pandan leaves. The result is a uniquely aromatic, slightly sweet coconut water that transports you straight to Southeast Asia.",
    price: 649n,
    imageUrl: "/assets/generated/product-pandan-infused.dim_600x600.jpg",
    category: "Specialty",
    stock: 28n,
    isActive: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
  "3": {
    id: 3n,
    name: "Young Coconut Meat",
    description:
      "Freshly scooped young coconut meat — silky, soft, and naturally sweet. Great eaten fresh, blended into smoothies, or added to desserts. Sourced from the same organic farms as our whole coconuts.",
    price: 799n,
    imageUrl: "/assets/generated/product-young-coconut.dim_600x600.jpg",
    category: "Fresh Coconut",
    stock: 15n,
    isActive: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
  "4": {
    id: 4n,
    name: "Coconut Water Bulk Box",
    description:
      "12 premium fresh tender coconuts in a single box — perfect for families, events, or offices. Same farm-fresh quality, better value. Delivered in an insulated box to maintain freshness.",
    price: 2499n,
    imageUrl: "/assets/generated/product-bulk-box.dim_600x600.jpg",
    category: "Bulk",
    stock: 8n,
    isActive: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
};

const PRODUCT_HIGHLIGHTS = [
  "Organically farmed, no pesticides",
  "Harvested within 48 hours of delivery",
  "Rich in natural electrolytes",
  "Sustainably sourced",
];

function ProductSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-10 items-start">
      <Skeleton className="aspect-square w-full rounded-2xl" />
      <div className="space-y-5">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-9 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}

export default function ProductPage() {
  const { id } = useParams({ from: "/product/$id" });
  const { data: fetchedProduct, isLoading } = useProduct(
    id ? BigInt(id) : undefined,
  );
  const { addToCart, isAddingToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = fetchedProduct ?? SAMPLE_PRODUCTS[id] ?? null;
  const maxStock = product ? Number(product.stock) : 0;

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await addToCart({ productId: product.id, quantity: BigInt(quantity) });
      toast.success(`${product.name} ×${quantity} added to cart!`);
    } catch {
      toast.error("Failed to add to cart. Please try again.");
    }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-ocid="product-back-btn"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Shop
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {isLoading ? (
          <ProductSkeleton />
        ) : !product ? (
          <div
            className="text-center py-24 flex flex-col items-center gap-4"
            data-ocid="product-not-found"
          >
            <span className="text-6xl">🥥</span>
            <h2 className="font-display font-bold text-2xl text-foreground">
              Product not found
            </h2>
            <p className="text-muted-foreground">
              This coconut has been freshly sold out — check back soon!
            </p>
            <Link to="/shop">
              <Button className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90">
                Browse Shop
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="sticky top-24"
            >
              <div className="rounded-2xl overflow-hidden bg-muted shadow-warm-hover">
                <img
                  src={
                    product.imageUrl ||
                    "/assets/generated/product-classic-tender.dim_600x600.jpg"
                  }
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                />
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="flex flex-col gap-5"
            >
              {/* Category & Stock */}
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  {product.category}
                </Badge>
                {maxStock > 0 && maxStock <= 5 && (
                  <Badge className="bg-accent text-accent-foreground">
                    Only {maxStock} left
                  </Badge>
                )}
                {maxStock === 0 && (
                  <Badge variant="secondary">Out of Stock</Badge>
                )}
              </div>

              {/* Name & Price */}
              <div>
                <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground leading-tight">
                  {product.name}
                </h1>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="font-display font-bold text-3xl text-foreground">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    per coconut
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed text-base">
                {product.description}
              </p>

              {/* Highlights */}
              <ul className="flex flex-col gap-2">
                {PRODUCT_HIGHLIGHTS.map((h) => (
                  <li
                    key={h}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="border-t border-border" />

              {/* Quantity + Add to Cart */}
              {maxStock > 0 ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-foreground">
                      Quantity
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        aria-label="Decrease quantity"
                        className="w-9 h-9"
                        data-ocid="qty-decrease"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </Button>
                      <span
                        className="w-10 text-center font-semibold text-foreground tabular-nums"
                        data-ocid="qty-value"
                      >
                        {quantity}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          setQuantity((q) => Math.min(maxStock, q + 1))
                        }
                        disabled={quantity >= maxStock}
                        aria-label="Increase quantity"
                        className="w-9 h-9"
                        data-ocid="qty-increase"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {maxStock} available
                    </span>
                  </div>

                  <Button
                    type="button"
                    size="lg"
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base shadow-warm"
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    data-ocid="product-add-to-cart"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {isAddingToCart
                      ? "Adding..."
                      : `Add ${quantity > 1 ? `×${quantity}` : ""} to Cart — ${formatPrice(
                          product.price * BigInt(quantity),
                        )}`}
                  </Button>
                </div>
              ) : (
                <Button size="lg" disabled className="w-full">
                  Out of Stock
                </Button>
              )}

              {/* Delivery note */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-xl p-3 border border-border">
                <Truck className="w-4 h-4 text-primary shrink-0" />
                <span>
                  Fresh delivery within{" "}
                  <strong className="text-foreground">24–48 hours</strong> of
                  order.
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
