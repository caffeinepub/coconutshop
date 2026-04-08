import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, S as Skeleton, B as Button } from "./index-CneVpnEb.js";
import { P as ProductCard } from "./ProductCard-FLZmZPMU.js";
import { B as Badge } from "./badge-B58CfAmH.js";
import { I as Input } from "./input-CI8pUTTe.js";
import { u as useProducts } from "./use-products-DmGmK3EM.js";
import { m as motion } from "./proxy-C1y56F1r.js";
import { X } from "./x-C46Drt3A.js";
import "./card-C9OVi9G9.js";
import "./format-Bz3WLrC-.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
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
    description: "Sweet & refreshing coconut water naturally infused with pandan leaves.",
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
    description: "Silky, tender coconut meat — perfect on its own or blended.",
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
    description: "12-pack of premium tender coconut water. Great for families and events.",
    price: 2499n,
    imageUrl: "/assets/generated/product-bulk-box.dim_600x600.jpg",
    category: "Bulk",
    stock: 8n,
    isActive: true,
    createdAt: 0n,
    updatedAt: 0n
  },
  {
    id: 5n,
    name: "Himalayan Salt Coconut",
    description: "A pinch of Himalayan salt elevates the natural sweetness beautifully.",
    price: 599n,
    imageUrl: "/assets/generated/product-classic-tender.dim_600x600.jpg",
    category: "Specialty",
    stock: 20n,
    isActive: true,
    createdAt: 0n,
    updatedAt: 0n
  },
  {
    id: 6n,
    name: "Coconut Jelly Cup",
    description: "Soft, wobbly coconut jelly with a splash of fresh coconut water.",
    price: 349n,
    imageUrl: "/assets/generated/product-young-coconut.dim_600x600.jpg",
    category: "Snacks",
    stock: 60n,
    isActive: true,
    createdAt: 0n,
    updatedAt: 0n
  }
];
const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name A–Z" }
];
function sortProducts(products, sort) {
  const sorted = [...products];
  if (sort === "price-asc")
    return sorted.sort((a, b) => Number(a.price - b.price));
  if (sort === "price-desc")
    return sorted.sort((a, b) => Number(b.price - a.price));
  if (sort === "name")
    return sorted.sort((a, b) => a.name.localeCompare(b.name));
  return sorted;
}
function ShopPage() {
  const { data: products, isLoading } = useProducts();
  const [search, setSearch] = reactExports.useState("");
  const [activeCategory, setActiveCategory] = reactExports.useState("All");
  const [sort, setSort] = reactExports.useState("default");
  const displayProducts = products ?? SAMPLE_PRODUCTS;
  const categories = reactExports.useMemo(() => {
    const cats = new Set(displayProducts.map((p) => p.category));
    return ["All", ...Array.from(cats)];
  }, [displayProducts]);
  const filtered = reactExports.useMemo(() => {
    let result = displayProducts.filter((p) => p.isActive);
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }
    return sortProducts(result, sort);
  }, [displayProducts, activeCategory, search, sort]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-card border-b border-border py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-accent uppercase tracking-widest mb-2", children: "🌴 Fresh & Natural" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl sm:text-4xl text-foreground", children: "Our Coconut Shop" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 max-w-lg", children: "Hand-picked tropical coconuts and coconut products, delivered fresh from the farm." })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-muted/30 border-b border-border sticky top-16 z-30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: search,
              onChange: (e) => setSearch(e.target.value),
              placeholder: "Search coconuts...",
              className: "pl-9 pr-8 bg-card border-border",
              "data-ocid": "shop-search"
            }
          ),
          search && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setSearch(""),
              className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
              "aria-label": "Clear search",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              value: sort,
              onChange: (e) => setSort(e.target.value),
              className: "text-sm border border-border rounded-md bg-card text-foreground px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-ring",
              "data-ocid": "shop-sort",
              children: SORT_OPTIONS.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.value, children: o.label }, o.value))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mt-3 flex-wrap", children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setActiveCategory(cat),
          "data-ocid": `filter-${cat.toLowerCase().replace(/\s+/g, "-")}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: activeCategory === cat ? "default" : "secondary",
              className: activeCategory === cat ? "bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90" : "cursor-pointer hover:bg-accent/10 hover:text-accent",
              children: cat
            }
          )
        },
        cat
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-10", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: [1, 2, 3, 4, 5, 6].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-80 w-full rounded-xl" }, n)) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: "text-center py-24 flex flex-col items-center gap-4",
        "data-ocid": "shop-empty-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl", children: "🥥" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-xl text-foreground", children: "No coconuts found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xs", children: "Try adjusting your search or category filter." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => {
                setSearch("");
                setActiveCategory("All");
              },
              className: "mt-2 border-primary/30 text-primary",
              children: "Clear Filters"
            }
          )
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-6", children: [
        filtered.length,
        " product",
        filtered.length !== 1 ? "s" : "",
        activeCategory !== "All" ? ` in ${activeCategory}` : ""
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: filtered.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ProductCard,
        {
          product,
          index: i
        },
        product.id.toString()
      )) })
    ] }) })
  ] });
}
export {
  ShopPage as default
};
