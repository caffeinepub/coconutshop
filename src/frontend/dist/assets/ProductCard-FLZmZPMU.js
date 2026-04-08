import { u as useCart, j as jsxRuntimeExports, L as Link, B as Button, a as ShoppingCart, b as ue } from "./index-CneVpnEb.js";
import { B as Badge } from "./badge-B58CfAmH.js";
import { C as Card, a as CardContent } from "./card-C9OVi9G9.js";
import { f as formatPrice } from "./format-Bz3WLrC-.js";
import { m as motion } from "./proxy-C1y56F1r.js";
function ProductCard({ product, index = 0 }) {
  const { addToCart, isAddingToCart } = useCart();
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await addToCart({ productId: product.id, quantity: 1n });
      ue.success(`${product.name} added to cart!`);
    } catch {
      ue.error("Failed to add to cart. Please try again.");
    }
  };
  const isOutOfStock = Number(product.stock) === 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.4, delay: index * 0.08, ease: "easeOut" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/product/$id", params: { id: product.id.toString() }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "group overflow-hidden border border-border bg-card hover:shadow-warm-hover transition-smooth cursor-pointer h-full flex flex-col",
          "data-ocid": "product-card",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden bg-muted aspect-square", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: product.imageUrl || "/assets/generated/product-classic-tender.dim_600x600.jpg",
                  alt: product.name,
                  className: "w-full h-full object-cover group-hover:scale-105 transition-smooth"
                }
              ),
              isOutOfStock && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/60 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs font-semibold", children: "Out of Stock" }) }),
              !isOutOfStock && Number(product.stock) <= 5 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-accent text-accent-foreground text-xs", children: [
                "Only ",
                Number(product.stock),
                " left"
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex flex-col flex-1 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1", children: product.category }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors", children: product.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 line-clamp-2", children: product.description })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg text-foreground", children: formatPrice(product.price) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "sm",
                    disabled: isOutOfStock || isAddingToCart,
                    onClick: handleAddToCart,
                    className: "bg-accent text-accent-foreground hover:bg-accent/90 shrink-0 font-semibold",
                    "data-ocid": "add-to-cart-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-3.5 h-3.5 mr-1.5" }),
                      "Add to Cart"
                    ]
                  }
                )
              ] })
            ] })
          ]
        }
      ) })
    }
  );
}
export {
  ProductCard as P
};
