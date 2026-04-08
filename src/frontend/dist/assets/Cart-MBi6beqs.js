import { u as useCart, e as useAuth, f as useNavigate, j as jsxRuntimeExports, B as Button, S as Skeleton, L as Link, b as ue } from "./index-CneVpnEb.js";
import { S as Separator } from "./separator-DUGIe8Xk.js";
import { f as formatPrice } from "./format-Bz3WLrC-.js";
import { S as ShoppingBag } from "./shopping-bag-DIKmEFmq.js";
import { M as Minus, P as Plus } from "./plus-Zk8aMpSU.js";
import { T as Trash2 } from "./trash-2-Bx_ufznD.js";
import { A as ArrowRight } from "./arrow-right-CDNPu4aS.js";
import "./index-DoSPmc1C.js";
function CartPage() {
  const { cart, isLoading, removeFromCart, updateQuantity } = useCart();
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const handleRemove = async (productId, name) => {
    try {
      await removeFromCart(productId);
      ue.success(`${name} removed from cart`);
    } catch {
      ue.error("Failed to remove item");
    }
  };
  const handleUpdateQty = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await updateQuantity({ productId, quantity: BigInt(quantity) });
    } catch {
      ue.error("Failed to update quantity");
    }
  };
  const handleCheckout = () => {
    if (!isAuthenticated) {
      login();
      return;
    }
    navigate({ to: "/checkout" });
  };
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-[60vh] flex flex-col items-center justify-center px-4 py-20",
        "data-ocid": "cart-unauthenticated",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-10 max-w-md w-full text-center shadow-warm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-9 h-9 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-2 text-foreground", children: "Sign in to view your cart" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-7 text-sm leading-relaxed", children: "Your cart items are saved to your account. Sign in to see what you've added." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: login,
              size: "lg",
              className: "w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-xl transition-smooth",
              "data-ocid": "cart-login-btn",
              children: "Sign In with Internet Identity"
            }
          )
        ] })
      }
    );
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-36 mb-8" }),
      ["a", "b", "c"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-2xl" }, id)),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-44 w-full rounded-2xl mt-4" })
    ] });
  }
  const items = (cart == null ? void 0 : cart.items) ?? [];
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-[60vh] flex flex-col items-center justify-center px-4 py-20",
        "data-ocid": "cart-empty",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-10 max-w-md w-full text-center shadow-warm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl mb-4", children: "🥥" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-2 text-foreground", children: "Your cart is empty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-7 text-sm", children: "Add some fresh coconuts to get started!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              className: "bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-xl w-full transition-smooth",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4 mr-2" }),
                "Browse Our Selection"
              ]
            }
          ) })
        ] })
      }
    );
  }
  const total = (cart == null ? void 0 : cart.total) ?? 0n;
  const itemCount = items.reduce((s, i) => s + Number(i.quantity), 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Your Cart" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1 text-sm", children: [
        itemCount,
        " ",
        itemCount === 1 ? "item" : "items"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-8 lg:grid-cols-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3 space-y-3", "data-ocid": "cart-items-list", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-2xl p-4 flex items-center gap-4 shadow-warm transition-smooth hover:shadow-warm-hover",
          "data-ocid": "cart-item",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-18 h-18 flex-shrink-0 rounded-xl overflow-hidden bg-muted w-[72px] h-[72px]", children: item.product.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: item.product.imageUrl,
                alt: item.product.name,
                className: "w-full h-full object-cover"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center text-3xl", children: "🥥" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground truncate text-sm", children: item.product.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                formatPrice(item.product.price),
                " each"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-accent mt-1", children: formatPrice(item.product.price * item.quantity) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 bg-muted/50 rounded-xl p-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-7 w-7 rounded-lg hover:bg-card",
                  onClick: () => handleUpdateQty(item.productId, Number(item.quantity) - 1),
                  "aria-label": "Decrease quantity",
                  "data-ocid": "cart-qty-decrease",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3 h-3" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 text-center text-sm font-bold tabular-nums", children: item.quantity.toString() }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "h-7 w-7 rounded-lg hover:bg-card",
                  onClick: () => handleUpdateQty(item.productId, Number(item.quantity) + 1),
                  "aria-label": "Increase quantity",
                  "data-ocid": "cart-qty-increase",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-smooth flex-shrink-0",
                onClick: () => handleRemove(item.productId, item.product.name),
                "aria-label": `Remove ${item.product.name}`,
                "data-ocid": "cart-remove-btn",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
              }
            )
          ]
        },
        item.productId.toString()
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 sticky top-24 shadow-warm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground mb-5", children: "Order Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-4", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex justify-between text-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground truncate mr-2 min-w-0", children: [
                item.product.name,
                " ×",
                item.quantity.toString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium flex-shrink-0", children: formatPrice(item.product.price * item.quantity) })
            ]
          },
          item.productId.toString()
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "Subtotal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: formatPrice(total) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "Shipping" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-primary font-medium", children: "Calculated at checkout" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6 pt-4 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg", children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-xl text-accent", children: formatPrice(total) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "lg",
            className: "w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-xl transition-smooth shadow-warm",
            onClick: handleCheckout,
            "data-ocid": "cart-checkout-btn",
            children: [
              "Proceed to Checkout",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            className: "w-full mt-3 text-muted-foreground hover:text-foreground text-sm",
            children: "Continue Shopping"
          }
        ) })
      ] }) })
    ] })
  ] });
}
export {
  CartPage as default
};
