import { c as createLucideIcon, u as useCart, e as useAuth, g as useActor, r as reactExports, j as jsxRuntimeExports, B as Button, L as Link, S as Skeleton, b as ue, h as createActor } from "./index-CneVpnEb.js";
import { I as Input } from "./input-CI8pUTTe.js";
import { L as Label } from "./label-C0kgjAAs.js";
import { S as Separator } from "./separator-DUGIe8Xk.js";
import { f as formatPrice } from "./format-Bz3WLrC-.js";
import { S as ShoppingBag } from "./shopping-bag-DIKmEFmq.js";
import { S as ShieldCheck } from "./shield-check-Ct4jrPNr.js";
import "./index-DoSPmc1C.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
];
const CreditCard = createLucideIcon("credit-card", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode);
const EMPTY_ADDRESS = {
  fullName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "US"
};
function FormField({
  id,
  label,
  required,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: id, className: "text-sm font-medium", children: [
      label,
      required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive ml-0.5", children: "*" })
    ] }),
    children
  ] });
}
function CheckoutPage() {
  const { cart, isLoading } = useCart();
  const { isAuthenticated, login } = useAuth();
  const { actor } = useActor(createActor);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [address, setAddress] = reactExports.useState(EMPTY_ADDRESS);
  const set = (field) => (e) => setAddress((a) => ({ ...a, [field]: e.target.value }));
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[60vh] flex flex-col items-center justify-center px-4 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-10 max-w-md w-full text-center shadow-warm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-9 h-9 text-accent" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-2 text-foreground", children: "Sign in to checkout" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-7 text-sm leading-relaxed", children: "You need an account to complete your purchase and track your orders." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: login,
          size: "lg",
          className: "w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-xl transition-smooth",
          "data-ocid": "checkout-login-btn",
          children: "Sign In to Continue"
        }
      )
    ] }) });
  }
  const items = (cart == null ? void 0 : cart.items) ?? [];
  const total = (cart == null ? void 0 : cart.total) ?? 0n;
  if (!isLoading && items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[60vh] flex flex-col items-center justify-center px-4 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-10 max-w-md w-full text-center shadow-warm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-9 h-9 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-2 text-foreground", children: "Your cart is empty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-7 text-sm", children: "Add some fresh coconuts before checking out." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "lg",
          className: "bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-xl w-full transition-smooth",
          children: "Browse Shop"
        }
      ) })
    ] }) });
  }
  const isFormValid = address.fullName.trim() && address.addressLine1.trim() && address.city.trim() && address.postalCode.trim() && address.country.trim();
  const handleCheckout = async () => {
    if (!isFormValid) {
      ue.error("Please fill in all required shipping fields");
      return;
    }
    if (!actor) {
      ue.error("Not connected. Please try again.");
      return;
    }
    setIsSubmitting(true);
    try {
      const shippingAddress = {
        fullName: address.fullName,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country
      };
      localStorage.setItem(
        "pendingShippingAddress",
        JSON.stringify(shippingAddress)
      );
      const shoppingItems = items.map((item) => ({
        productName: item.product.name,
        productDescription: item.product.description ?? "",
        currency: "usd",
        priceInCents: item.product.price,
        quantity: item.quantity
      }));
      const typedActor = actor;
      const sessionUrl = await typedActor.createCheckoutSession(
        shoppingItems,
        `${window.location.origin}/checkout/success`,
        `${window.location.origin}/checkout`
      );
      if (sessionUrl) {
        window.location.href = sessionUrl;
      } else {
        ue.error(
          "Failed to create checkout session. Please check Stripe configuration."
        );
      }
    } catch (err) {
      ue.error("Checkout failed. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Checkout" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Complete your shipping details to continue" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 shadow-warm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-lg mb-6 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 h-7 rounded-full bg-accent/20 text-accent text-xs font-bold flex items-center justify-center", children: "1" }),
            "Shipping Address"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { id: "fullName", label: "Full Name", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "fullName",
                value: address.fullName,
                onChange: set("fullName"),
                placeholder: "Jane Smith",
                className: "rounded-xl",
                "data-ocid": "checkout-fullname"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { id: "addressLine1", label: "Address Line 1", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "addressLine1",
                value: address.addressLine1,
                onChange: set("addressLine1"),
                placeholder: "123 Coconut Lane",
                className: "rounded-xl",
                "data-ocid": "checkout-address-line1"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { id: "addressLine2", label: "Address Line 2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "addressLine2",
                value: address.addressLine2,
                onChange: set("addressLine2"),
                placeholder: "Apt, suite, unit (optional)",
                className: "rounded-xl",
                "data-ocid": "checkout-address-line2"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { id: "city", label: "City", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "city",
                  value: address.city,
                  onChange: set("city"),
                  placeholder: "Miami",
                  className: "rounded-xl",
                  "data-ocid": "checkout-city"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { id: "state", label: "State / Province", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "state",
                  value: address.state,
                  onChange: set("state"),
                  placeholder: "FL",
                  className: "rounded-xl",
                  "data-ocid": "checkout-state"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { id: "postalCode", label: "Postal Code", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "postalCode",
                  value: address.postalCode,
                  onChange: set("postalCode"),
                  placeholder: "33101",
                  className: "rounded-xl",
                  "data-ocid": "checkout-postal-code"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FormField, { id: "country", label: "Country", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "country",
                  value: address.country,
                  onChange: set("country"),
                  placeholder: "US",
                  className: "rounded-xl",
                  "data-ocid": "checkout-country"
                }
              ) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-primary mt-0.5 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Secure Checkout" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed", children: "Payment is processed securely by Stripe. We never store your card details on our servers." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-6 sticky top-24 shadow-warm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-lg mb-5 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-7 h-7 rounded-full bg-accent/20 text-accent text-xs font-bold flex items-center justify-center", children: "2" }),
          "Order Summary"
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["a", "b"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full rounded-xl" }, k)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg overflow-hidden bg-muted flex-shrink-0", children: item.product.imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: item.product.imageUrl,
                  alt: item.product.name,
                  className: "w-full h-full object-cover"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center text-lg", children: "🥥" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: item.product.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Qty: ",
                  item.quantity.toString()
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold flex-shrink-0", children: formatPrice(item.product.price * item.quantity) })
            ]
          },
          item.productId.toString()
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: formatPrice(total) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Shipping" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-xs font-medium", children: "Calculated by Stripe" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6 pt-4 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg", children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-xl text-accent", children: formatPrice(total) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "lg",
            className: "w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-xl transition-smooth shadow-warm disabled:opacity-60",
            onClick: handleCheckout,
            disabled: isSubmitting || !isFormValid,
            "data-ocid": "checkout-pay-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 mr-2" }),
              isSubmitting ? "Redirecting to Stripe..." : "Pay with Stripe"
            ]
          }
        ),
        !isFormValid && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center mt-3", children: "Fill in required shipping fields to continue" })
      ] }) })
    ] })
  ] });
}
export {
  CheckoutPage as default
};
