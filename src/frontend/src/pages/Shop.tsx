import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/hooks/use-products";
import type { Product } from "@/types";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

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
      "Sweet & refreshing coconut water naturally infused with pandan leaves.",
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
    description: "Silky, tender coconut meat — perfect on its own or blended.",
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
    description:
      "12-pack of premium tender coconut water. Great for families and events.",
    price: 2499n,
    imageUrl: "/assets/generated/product-bulk-box.dim_600x600.jpg",
    category: "Bulk",
    stock: 8n,
    isActive: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
  {
    id: 5n,
    name: "Himalayan Salt Coconut",
    description:
      "A pinch of Himalayan salt elevates the natural sweetness beautifully.",
    price: 599n,
    imageUrl: "/assets/generated/product-classic-tender.dim_600x600.jpg",
    category: "Specialty",
    stock: 20n,
    isActive: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
  {
    id: 6n,
    name: "Coconut Jelly Cup",
    description:
      "Soft, wobbly coconut jelly with a splash of fresh coconut water.",
    price: 349n,
    imageUrl: "/assets/generated/product-young-coconut.dim_600x600.jpg",
    category: "Snacks",
    stock: 60n,
    isActive: true,
    createdAt: 0n,
    updatedAt: 0n,
  },
];

const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name A–Z" },
];

function sortProducts(products: Product[], sort: string): Product[] {
  const sorted = [...products];
  if (sort === "price-asc")
    return sorted.sort((a, b) => Number(a.price - b.price));
  if (sort === "price-desc")
    return sorted.sort((a, b) => Number(b.price - a.price));
  if (sort === "name")
    return sorted.sort((a, b) => a.name.localeCompare(b.name));
  return sorted;
}

export default function ShopPage() {
  const { data: products, isLoading } = useProducts();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sort, setSort] = useState("default");

  const displayProducts = products ?? SAMPLE_PRODUCTS;

  const categories = useMemo(() => {
    const cats = new Set(displayProducts.map((p) => p.category));
    return ["All", ...Array.from(cats)];
  }, [displayProducts]);

  const filtered = useMemo(() => {
    let result = displayProducts.filter((p) => p.isActive);
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }
    return sortProducts(result, sort);
  }, [displayProducts, activeCategory, search, sort]);

  return (
    <div className="bg-background min-h-screen">
      {/* Page Header */}
      <section className="bg-card border-b border-border py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-2">
              🌴 Fresh & Natural
            </p>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
              Our Coconut Shop
            </h1>
            <p className="text-muted-foreground mt-2 max-w-lg">
              Hand-picked tropical coconuts and coconut products, delivered
              fresh from the farm.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="bg-muted/30 border-b border-border sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search coconuts..."
                className="pl-9 pr-8 bg-card border-border"
                data-ocid="shop-search"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm border border-border rounded-md bg-card text-foreground px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-ring"
                data-ocid="shop-sort"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2 mt-3 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                data-ocid={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <Badge
                  variant={activeCategory === cat ? "default" : "secondary"}
                  className={
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90"
                      : "cursor-pointer hover:bg-accent/10 hover:text-accent"
                  }
                >
                  {cat}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <Skeleton key={n} className="h-80 w-full rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 flex flex-col items-center gap-4"
            data-ocid="shop-empty-state"
          >
            <span className="text-6xl">🥥</span>
            <h3 className="font-display font-semibold text-xl text-foreground">
              No coconuts found
            </h3>
            <p className="text-muted-foreground max-w-xs">
              Try adjusting your search or category filter.
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-2 border-primary/30 text-primary"
            >
              Clear Filters
            </Button>
          </motion.div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
              {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product, i) => (
                <ProductCard
                  key={product.id.toString()}
                  product={product}
                  index={i}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
