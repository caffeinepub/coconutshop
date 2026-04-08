import { c as createLucideIcon, j as jsxRuntimeExports, L as Link, B as Button, S as Skeleton } from "./index-CneVpnEb.js";
import { P as ProductCard } from "./ProductCard-FLZmZPMU.js";
import { B as Badge } from "./badge-B58CfAmH.js";
import { u as useProducts } from "./use-products-DmGmK3EM.js";
import { m as motion } from "./proxy-C1y56F1r.js";
import { A as ArrowRight } from "./arrow-right-CDNPu4aS.js";
import { T as Truck } from "./truck-C0x2NwVo.js";
import { S as ShieldCheck } from "./shield-check-Ct4jrPNr.js";
import "./card-C9OVi9G9.js";
import "./format-Bz3WLrC-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
      key: "nnexq3"
    }
  ],
  ["path", { d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12", key: "mt58a7" }]
];
const Leaf = createLucideIcon("leaf", __iconNode$1);
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
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const FEATURES = [
  {
    icon: Leaf,
    title: "100% Organic",
    description: "Hand-picked from certified organic tropical farms."
  },
  {
    icon: Truck,
    title: "Fresh Delivery",
    description: "Farm-to-door within 24–48 hours of harvest."
  },
  {
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    description: "Every coconut inspected for peak freshness."
  },
  {
    icon: Zap,
    title: "Natural Electrolytes",
    description: "Nature's perfect hydration — no additives."
  }
];
const SAMPLE_PRODUCTS = [
  {
    id: 1n,
    name: "Classic Tender Coconut",
    description: "Organic, hand-picked young coconuts bursting with sweet water.",
    price: 499n,
    imageUrl: "/assets/generated/product-classic-tender.dim_600x600.jpg",
    category: "Fresh Coconut",
    stock: 42n,
    isActive: true,
    createdAt: 0n,
    updatedAt: 0n
  },
  {
    id: 2n,
    name: "Pandan Infused Coconut",
    description: "Sweet & refreshing coconut water naturally infused with pandan.",
    price: 649n,
    imageUrl: "/assets/generated/product-pandan-infused.dim_600x600.jpg",
    category: "Specialty",
    stock: 28n,
    isActive: true,
    createdAt: 0n,
    updatedAt: 0n
  },
  {
    id: 3n,
    name: "Young Coconut Meat",
    description: "Tender white coconut meat — silky, smooth, and naturally sweet.",
    price: 799n,
    imageUrl: "/assets/generated/product-young-coconut.dim_600x600.jpg",
    category: "Fresh Coconut",
    stock: 15n,
    isActive: true,
    createdAt: 0n,
    updatedAt: 0n
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
    updatedAt: 0n
  }
];
function HeroSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative overflow-hidden bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-12 lg:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-2 gap-10 items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -32 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
        className: "flex flex-col gap-5",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "self-start bg-accent/15 text-accent border-accent/30 font-medium", children: "🌴 Farm-Fresh Tropicals" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight tracking-tight", children: [
            "Freshly Picked ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Tropical" }),
            " ",
            "Paradise."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground leading-relaxed max-w-md", children: "Drink the Tropics, delivered to your door. Pure, organic tender coconuts harvested at peak freshness — nothing added, nothing removed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "lg",
                className: "bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-warm",
                "data-ocid": "hero-shop-cta",
                children: [
                  "Shop Now",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 w-4 h-4" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "lg",
                variant: "outline",
                className: "border-primary/30 text-primary hover:bg-primary/5",
                "data-ocid": "hero-browse-cta",
                children: "Browse All"
              }
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.7, delay: 0.1, ease: "easeOut" },
        className: "relative",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl overflow-hidden shadow-warm-hover", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/generated/hero-coconuts.dim_1200x600.jpg",
              alt: "Fresh tender coconuts on a tropical beach",
              className: "w-full h-72 lg:h-96 object-cover"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.6, duration: 0.4 },
              className: "absolute -bottom-4 -left-4 bg-card rounded-xl shadow-warm p-3 border border-border hidden sm:flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🥥" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: "100% Natural" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No preservatives" })
                ] })
              ]
            }
          )
        ]
      }
    )
  ] }) }) });
}
function FeaturesSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/40 border-y border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-6", children: FEATURES.map(({ icon: Icon, title, description }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { delay: i * 0.1, duration: 0.4 },
      className: "flex flex-col items-center text-center gap-2 p-4",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm text-foreground", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: description })
      ]
    },
    title
  )) }) }) });
}
function FeaturedProducts() {
  const { data: products, isLoading } = useProducts();
  const displayProducts = (products == null ? void 0 : products.slice(0, 4)) ?? SAMPLE_PRODUCTS;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-accent uppercase tracking-widest mb-1", children: "Our Collection" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl text-foreground", children: "Our Fresh Selection" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              className: "border-primary/30 text-primary hover:bg-primary/5",
              "data-ocid": "featured-view-all",
              children: [
                "View All Products",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 w-4 h-4" })
              ]
            }
          ) })
        ]
      }
    ),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5", children: [1, 2, 3, 4].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-80 w-full rounded-xl" }, n)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5", children: displayProducts.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProductCard,
      {
        product,
        index: i
      },
      product.id.toString()
    )) })
  ] }) });
}
function CtaBanner() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-primary py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5 },
      className: "flex flex-col items-center gap-5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl", children: "🌴" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-3xl sm:text-4xl text-primary-foreground", children: "Ready to taste the tropics?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 max-w-md text-lg", children: "Order today and get farm-fresh coconuts delivered straight to your door." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "lg",
            className: "bg-accent text-accent-foreground hover:bg-accent/90 font-semibold mt-2",
            "data-ocid": "cta-order-now",
            children: [
              "Order Now",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 w-4 h-4" })
            ]
          }
        ) })
      ]
    }
  ) }) });
}
function HomePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturesSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturedProducts, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CtaBanner, {})
  ] });
}
export {
  HomePage as default
};
