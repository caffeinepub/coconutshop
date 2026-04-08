import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/hooks/use-products";
import type { Product } from "@/types";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Leaf, ShieldCheck, Truck, Zap } from "lucide-react";
import { motion } from "motion/react";

const FEATURES = [
  {
    icon: Leaf,
    title: "100% Organic",
    description: "Hand-picked from certified organic tropical farms.",
  },
  {
    icon: Truck,
    title: "Fresh Delivery",
    description: "Farm-to-door within 24–48 hours of harvest.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    description: "Every coconut inspected for peak freshness.",
  },
  {
    icon: Zap,
    title: "Natural Electrolytes",
    description: "Nature's perfect hydration — no additives.",
  },
];

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1n,
    name: "Classic Tender Coconut",
    description:
      "Organic, hand-picked young coconuts bursting with sweet water.",
    price: 499n,
    imageUrl: "/assets/generated/product-classic-tender.dim_600x600.jpg",
    category: "Fresh Coconut",
    stock: 42n,
    isActive: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
  {
    id: 2n,
    name: "Pandan Infused Coconut",
    description:
      "Sweet & refreshing coconut water naturally infused with pandan.",
    price: 649n,
    imageUrl: "/assets/generated/product-pandan-infused.dim_600x600.jpg",
    category: "Specialty",
    stock: 28n,
    isActive: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
  {
    id: 3n,
    name: "Young Coconut Meat",
    description:
      "Tender white coconut meat — silky, smooth, and naturally sweet.",
    price: 799n,
    imageUrl: "/assets/generated/product-young-coconut.dim_600x600.jpg",
    category: "Fresh Coconut",
    stock: 15n,
    isActive: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
  {
    id: 4n,
    name: "Coconut Water Bulk Box",
    description: "12-pack of premium tender coconut water. Great for families.",
    price: 2499n,
    imageUrl: "/assets/generated/product-bulk-box.dim_600x600.jpg",
    category: "Bulk",
    stock: 8n,
    isActive: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
];

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-5"
          >
            <Badge className="self-start bg-accent/15 text-accent border-accent/30 font-medium">
              🌴 Farm-Fresh Tropicals
            </Badge>
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight tracking-tight">
              Freshly Picked <span className="text-primary">Tropical</span>{" "}
              Paradise.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              Drink the Tropics, delivered to your door. Pure, organic tender
              coconuts harvested at peak freshness — nothing added, nothing
              removed.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/shop">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-warm"
                  data-ocid="hero-shop-cta"
                >
                  Shop Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/shop">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/30 text-primary hover:bg-primary/5"
                  data-ocid="hero-browse-cta"
                >
                  Browse All
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-warm-hover">
              <img
                src="/assets/generated/hero-coconuts.dim_1200x600.jpg"
                alt="Fresh tender coconuts on a tropical beach"
                className="w-full h-72 lg:h-96 object-cover"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="absolute -bottom-4 -left-4 bg-card rounded-xl shadow-warm p-3 border border-border hidden sm:flex items-center gap-2"
            >
              <span className="text-2xl">🥥</span>
              <div>
                <p className="text-xs font-semibold text-foreground">
                  100% Natural
                </p>
                <p className="text-xs text-muted-foreground">
                  No preservatives
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="bg-muted/40 border-y border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex flex-col items-center text-center gap-2 p-4"
            >
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-sm text-foreground">
                {title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const { data: products, isLoading } = useProducts();
  const displayProducts = products?.slice(0, 4) ?? SAMPLE_PRODUCTS;

  return (
    <section className="bg-background py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <div>
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-1">
              Our Collection
            </p>
            <h2 className="font-display font-bold text-3xl text-foreground">
              Our Fresh Selection
            </h2>
          </div>
          <Link to="/shop">
            <Button
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/5"
              data-ocid="featured-view-all"
            >
              View All Products
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((n) => (
              <Skeleton key={n} className="h-80 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {displayProducts.map((product, i) => (
              <ProductCard
                key={product.id.toString()}
                product={product}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="bg-primary py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-5"
        >
          <span className="text-5xl">🌴</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-foreground">
            Ready to taste the tropics?
          </h2>
          <p className="text-primary-foreground/80 max-w-md text-lg">
            Order today and get farm-fresh coconuts delivered straight to your
            door.
          </p>
          <Link to="/shop">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold mt-2"
              data-ocid="cta-order-now"
            >
              Order Now
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <FeaturedProducts />
      <CtaBanner />
    </div>
  );
}
