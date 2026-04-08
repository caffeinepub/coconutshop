import { d as useParams, u as useCart, r as reactExports, j as jsxRuntimeExports, L as Link, B as Button, a as ShoppingCart, b as ue, S as Skeleton } from "./index-CneVpnEb.js";
import { B as Badge } from "./badge-B58CfAmH.js";
import { a as useProduct } from "./use-products-DmGmK3EM.js";
import { f as formatPrice } from "./format-Bz3WLrC-.js";
import { A as ArrowLeft } from "./arrow-left-lj7qAh2v.js";
import { m as motion } from "./proxy-C1y56F1r.js";
import { C as CircleCheckBig } from "./circle-check-big-CseOkopu.js";
import { M as Minus, P as Plus } from "./plus-Zk8aMpSU.js";
import { T as Truck } from "./truck-C0x2NwVo.js";
const SAMPLE_PRODUCTS = {
  "1": {
    id: 1n,
    name: "Classic Tender Coconut",
    description: "Our signature organic tender coconuts are hand-picked at peak ripeness from certified farms. Each coconut is filled with naturally sweet, electrolyte-rich water and a layer of soft, silky coconut meat. Nothing added — pure tropical goodness in every sip.",
    price: 499n,
    imageUrl: "/assets/generated/product-classic-tender.dim_600x600.jpg",
    category: "Fresh Coconut",
    stock: 42n,
    isActive: true,
    createdAt: 0n,
    updatedAt: 0n
  },
  "2": {
    id: 2n,
    name: "Pandan Infused Coconut",
    description: "The beloved tropical pairing — fresh tender coconut naturally infused with fragrant pandan leaves. The result is a uniquely aromatic, slightly sweet coconut water that transports you straight to Southeast Asia.",
    price: 649n,
    imageUrl: "/assets/generated/product-pandan-infused.dim_600x600.jpg",
    category: "Specialty",
    stock: 28n,
    isActive: true,
    createdAt: 0n,
    updatedAt: 0n
  },
  "3": {
    id: 3n,
    name: "Young Coconut Meat",
    description: "Freshly scooped young coconut meat — silky, soft, and naturally sweet. Great eaten fresh, blended into smoothies, or added to desserts. Sourced from the same organic farms as our whole coconuts.",
    price: 799n,
    imageUrl: "/assets/generated/product-young-coconut.dim_600x600.jpg",
    category: "Fresh Coconut",
    stock: 15n,
    isActive: true,
    createdAt: 0n,
    updatedAt: 0n
  },
  "4": {
    id: 4n,
    name: "Coconut Water Bulk Box",
    description: "12 premium fresh tender coconuts in a single box — perfect for families, events, or offices. Same farm-fresh quality, better value. Delivered in an insulated box to maintain freshness.",
    price: 2499n,
    imageUrl: "/assets/generated/product-bulk-box.dim_600x600.jpg",
    category: "Bulk",
    stock: 8n,
    isActive: true,
    createdAt: 0n,
    updatedAt: 0n
  }
};
const PRODUCT_HIGHLIGHTS = [
  "Organically farmed, no pesticides",
  "Harvested within 48 hours of delivery",
  "Rich in natural electrolytes",
  "Sustainably sourced"
];
function ProductSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-10 items-start", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square w-full rounded-2xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" })
    ] })
  ] });
}
function ProductPage() {
  const { id } = useParams({ from: "/product/$id" });
  const { data: fetchedProduct, isLoading } = useProduct(
    id ? BigInt(id) : void 0
  );
  const { addToCart, isAddingToCart } = useCart();
  const [quantity, setQuantity] = reactExports.useState(1);
  const product = fetchedProduct ?? SAMPLE_PRODUCTS[id] ?? null;
  const maxStock = product ? Number(product.stock) : 0;
  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await addToCart({ productId: product.id, quantity: BigInt(quantity) });
      ue.success(`${product.name} ×${quantity} added to cart!`);
    } catch {
      ue.error("Failed to add to cart. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/shop",
        className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
        "data-ocid": "product-back-btn",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3.5 h-3.5" }),
          "Back to Shop"
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-10", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProductSkeleton, {}) : !product ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-24 flex flex-col items-center gap-4",
        "data-ocid": "product-not-found",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl", children: "🥥" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: "Product not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "This coconut has been freshly sold out — check back soon!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-2 bg-primary text-primary-foreground hover:bg-primary/90", children: "Browse Shop" }) })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-10 lg:gap-16 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: -24 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5 },
          className: "sticky top-24",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden bg-muted shadow-warm-hover", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: product.imageUrl || "/assets/generated/product-classic-tender.dim_600x600.jpg",
              alt: product.name,
              className: "w-full aspect-square object-cover"
            }
          ) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 24 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5, delay: 0.08 },
          className: "flex flex-col gap-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/10 text-primary border-primary/20", children: product.category }),
              maxStock > 0 && maxStock <= 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-accent text-accent-foreground", children: [
                "Only ",
                maxStock,
                " left"
              ] }),
              maxStock === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "Out of Stock" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl sm:text-4xl text-foreground leading-tight", children: product.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-baseline gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-3xl text-foreground", children: formatPrice(product.price) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "per coconut" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed text-base", children: product.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-2", children: PRODUCT_HIGHLIGHTS.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-center gap-2 text-sm text-foreground",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-primary shrink-0" }),
                  h
                ]
              },
              h
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border" }),
            maxStock > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "Quantity" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      size: "icon",
                      onClick: () => setQuantity((q) => Math.max(1, q - 1)),
                      disabled: quantity <= 1,
                      "aria-label": "Decrease quantity",
                      className: "w-9 h-9",
                      "data-ocid": "qty-decrease",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3.5 h-3.5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "w-10 text-center font-semibold text-foreground tabular-nums",
                      "data-ocid": "qty-value",
                      children: quantity
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      size: "icon",
                      onClick: () => setQuantity((q) => Math.min(maxStock, q + 1)),
                      disabled: quantity >= maxStock,
                      "aria-label": "Increase quantity",
                      className: "w-9 h-9",
                      "data-ocid": "qty-increase",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  maxStock,
                  " available"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "lg",
                  className: "w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base shadow-warm",
                  onClick: handleAddToCart,
                  disabled: isAddingToCart,
                  "data-ocid": "product-add-to-cart",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-5 h-5 mr-2" }),
                    isAddingToCart ? "Adding..." : `Add ${quantity > 1 ? `×${quantity}` : ""} to Cart — ${formatPrice(
                      product.price * BigInt(quantity)
                    )}`
                  ]
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", disabled: true, className: "w-full", children: "Out of Stock" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-xl p-3 border border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-4 h-4 text-primary shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Fresh delivery within",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "24–48 hours" }),
                " of order."
              ] })
            ] })
          ]
        }
      )
    ] }) })
  ] });
}
export {
  ProductPage as default
};
