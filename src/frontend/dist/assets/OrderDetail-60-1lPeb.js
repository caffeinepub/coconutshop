import { c as createLucideIcon, e as useAuth, d as useParams, j as jsxRuntimeExports, L as Link, B as Button, k as cn, S as Skeleton } from "./index-CneVpnEb.js";
import { B as Badge } from "./badge-B58CfAmH.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-C9OVi9G9.js";
import { S as Separator } from "./separator-DUGIe8Xk.js";
import { a as useOrder } from "./use-orders-BPOIzkMv.js";
import { g as getOrderStatusColor, a as getOrderStatusLabel, c as formatDateTime, f as formatPrice } from "./format-Bz3WLrC-.js";
import { P as Package } from "./package-UzyWm7kQ.js";
import { A as ArrowLeft } from "./arrow-left-lj7qAh2v.js";
import { m as motion } from "./proxy-C1y56F1r.js";
import { S as ShoppingBag } from "./shopping-bag-DIKmEFmq.js";
import "./index-DoSPmc1C.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode);
function DetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-10 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-36" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-52" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5 space-y-4", children: [1, 2].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-16 rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" })
    ] }, n)) }) })
  ] });
}
function ItemRow({ item }) {
  const lineTotal = BigInt(
    Number(item.quantity) * Number(item.priceAtPurchase)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-lg bg-muted flex-shrink-0 overflow-hidden border border-border", children: item.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: item.imageUrl,
        alt: item.productName,
        className: "w-full h-full object-cover"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-6 h-6 text-muted-foreground" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm truncate", children: item.productName }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs mt-0.5", children: [
        "Qty: ",
        Number(item.quantity),
        " · ",
        formatPrice(item.priceAtPurchase),
        " ",
        "each"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm whitespace-nowrap", children: formatPrice(lineTotal) })
  ] });
}
function AddressBlock({ address }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-foreground leading-relaxed", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: address.street }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        address.city,
        ", ",
        address.state,
        " ",
        address.zip
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: address.country })
    ] })
  ] });
}
function LoginPrompt() {
  const { login, isLoading } = useAuth();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center text-center py-20 px-4",
      "data-ocid": "order-detail-login-prompt",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-8 h-8 text-secondary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground mb-2", children: "Sign in required" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-5", children: "Please sign in to view order details." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: login,
            disabled: isLoading,
            className: "font-semibold",
            "data-ocid": "order-detail-login-btn",
            children: isLoading ? "Signing in…" : "Sign In"
          }
        )
      ]
    }
  );
}
function OrderDetailPage() {
  const { isAuthenticated } = useAuth();
  const params = useParams({ from: "/orders/$id" });
  const orderId = params.id ? BigInt(params.id) : void 0;
  const { data: order, isLoading } = useOrder(orderId);
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[60vh] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoginPrompt, {}) });
  }
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(DetailSkeleton, {});
  if (!order) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-2xl mx-auto px-4 py-16 text-center",
        "data-ocid": "order-not-found",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-2", children: "Order not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "We couldn't find this order. It may have been removed or you may not have access." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "gap-2 font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
            "Back to Orders"
          ] }) })
        ]
      }
    );
  }
  const statusColor = getOrderStatusColor(order.status);
  const statusLabel = getOrderStatusLabel(order.status);
  const subtotal = order.items.reduce(
    (sum, item) => sum + BigInt(Number(item.quantity) * Number(item.priceAtPurchase)),
    0n
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-10", "data-ocid": "order-detail-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
        className: "mb-7",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/orders",
              className: "inline-flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm transition-colors mb-4",
              "data-ocid": "order-detail-back",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
                "All Orders"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl font-bold text-foreground", children: [
              "Order #",
              order.id.toString().padStart(4, "0")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                className: cn(
                  "text-xs px-3 py-1 rounded-full font-semibold border-0",
                  statusColor
                ),
                children: statusLabel
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: formatDateTime(order.createdAt) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: 0.08 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border", "data-ocid": "order-items-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 px-5 pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-display font-semibold text-foreground", children: "Items" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "px-5 pb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: order.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(ItemRow, { item }, item.productId.toString())) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(subtotal) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-bold text-foreground text-base pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatPrice(order.total) })
                ] })
              ] })
            ] })
          ] })
        }
      ),
      order.shippingAddress && /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: 0.14 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-border", "data-ocid": "order-shipping-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2 px-5 pt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-display font-semibold text-foreground", children: "Shipping Address" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-5 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AddressBlock, { address: order.shippingAddress }) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: 0.2 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              className: "border-border bg-muted/40",
              "data-ocid": "order-info-card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "px-5 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-2 gap-y-2 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Order ID" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("dd", { className: "text-foreground font-medium text-right", children: [
                  "#",
                  order.id.toString().padStart(4, "0")
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Placed" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-foreground font-medium text-right", children: formatDateTime(order.createdAt) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Status" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: cn(
                      "text-xs px-2 py-0.5 rounded-full font-medium border-0",
                      statusColor
                    ),
                    children: statusLabel
                  }
                ) })
              ] }) })
            }
          )
        }
      )
    ] })
  ] });
}
export {
  OrderDetailPage as default
};
