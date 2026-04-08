import { c as createLucideIcon, i as useQueryClient, g as useActor, r as reactExports, j as jsxRuntimeExports, L as Link, B as Button, b as ue, h as createActor } from "./index-CneVpnEb.js";
import { P as Package } from "./package-UzyWm7kQ.js";
import { C as CircleCheckBig } from "./circle-check-big-CseOkopu.js";
import { S as ShoppingBag } from "./shopping-bag-DIKmEFmq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$1);
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
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
const COCONUT_FACTS = [
  "Fresh tender coconuts are harvested at 6–7 months for maximum sweetness.",
  "Each coconut contains up to 1 liter of natural electrolyte-rich water.",
  "Coconut water has been used as an IV drip in emergencies.",
  "Your order will be packed fresh to preserve the natural nutrients."
];
function CheckoutSuccessPage() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  const [status, setStatus] = reactExports.useState("loading");
  const [funFact] = reactExports.useState(
    () => COCONUT_FACTS[Math.floor(Math.random() * COCONUT_FACTS.length)]
  );
  reactExports.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    if (!actor || !sessionId) {
      setStatus("success");
      return;
    }
    const confirm = async () => {
      try {
        const typedActor = actor;
        await typedActor.confirmOrder(sessionId);
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        setStatus("success");
      } catch (err) {
        console.error(err);
        ue.error("Could not confirm order. Please contact support.");
        setStatus("failed");
      }
    };
    confirm();
  }, [actor, queryClient]);
  if (status === "loading") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[70vh] flex flex-col items-center justify-center px-4 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-12 max-w-md w-full text-center shadow-warm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-12 h-12 text-accent animate-spin mx-auto mb-5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-2", children: "Confirming your order..." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "We're processing your payment. This will only take a moment." })
    ] }) });
  }
  if (status === "failed") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-[70vh] flex flex-col items-center justify-center px-4 py-20",
        "data-ocid": "checkout-failed",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-10 max-w-md w-full text-center shadow-warm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "⚠️" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground mb-3", children: "Something went wrong" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-8 leading-relaxed", children: "Your payment may have succeeded but order confirmation failed. Please contact our support team with your payment reference." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl",
                "data-ocid": "failed-view-orders",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 mr-2" }),
                  "Check Orders"
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-xl", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-4 h-4 mr-2" }),
              "Go Home"
            ] }) })
          ] })
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-[70vh] flex flex-col items-center justify-center px-4 py-16",
      "data-ocid": "checkout-success",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-10 max-w-lg w-full text-center shadow-warm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-24 h-24 mx-auto mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-12 h-12 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-1 -right-1 w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-accent" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground mb-2", children: "Order Confirmed! 🥥" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium text-accent mb-4", children: "Thank you for your purchase" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6 leading-relaxed", children: "Your fresh coconuts are being carefully prepared. You'll receive updates about your delivery soon. Stay refreshed!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary/50 border border-border rounded-xl p-4 mb-8 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-primary uppercase tracking-wide mb-1.5", children: "🌴 Did you know?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: funFact })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/orders", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              className: "bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-xl w-full sm:w-auto transition-smooth shadow-warm",
              "data-ocid": "success-view-orders",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 mr-2" }),
                "View My Orders"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "lg",
              variant: "outline",
              className: "rounded-xl w-full sm:w-auto transition-smooth",
              "data-ocid": "success-continue-shopping",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4 mr-2" }),
                "Continue Shopping"
              ]
            }
          ) })
        ] })
      ] })
    }
  );
}
export {
  CheckoutSuccessPage as default
};
