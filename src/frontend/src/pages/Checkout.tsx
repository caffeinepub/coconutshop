import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import { CreditCard, Lock, ShieldCheck, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface FormAddress {
  fullName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

const EMPTY_ADDRESS: FormAddress = {
  fullName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "US",
};

function FormField({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-0.5">*</span>}
      </Label>
      {children}
    </div>
  );
}

export default function CheckoutPage() {
  const { cart, isLoading } = useCart();
  const { isAuthenticated, login } = useAuth();
  const { actor } = useActor(createActor);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [address, setAddress] = useState<FormAddress>(EMPTY_ADDRESS);

  const set =
    (field: keyof FormAddress) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setAddress((a) => ({ ...a, [field]: e.target.value }));

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20">
        <div className="bg-card border border-border rounded-2xl p-10 max-w-md w-full text-center shadow-warm">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <Lock className="w-9 h-9 text-accent" />
          </div>
          <h2 className="font-display text-2xl font-bold mb-2 text-foreground">
            Sign in to checkout
          </h2>
          <p className="text-muted-foreground mb-7 text-sm leading-relaxed">
            You need an account to complete your purchase and track your orders.
          </p>
          <Button
            onClick={login}
            size="lg"
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-xl transition-smooth"
            data-ocid="checkout-login-btn"
          >
            Sign In to Continue
          </Button>
        </div>
      </div>
    );
  }

  const items = cart?.items ?? [];
  const total = cart?.total ?? 0n;

  if (!isLoading && items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20">
        <div className="bg-card border border-border rounded-2xl p-10 max-w-md w-full text-center shadow-warm">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-5">
            <ShoppingBag className="w-9 h-9 text-muted-foreground" />
          </div>
          <h2 className="font-display text-2xl font-bold mb-2 text-foreground">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground mb-7 text-sm">
            Add some fresh coconuts before checking out.
          </p>
          <Link to="/shop">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-xl w-full transition-smooth"
            >
              Browse Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isFormValid =
    address.fullName.trim() &&
    address.addressLine1.trim() &&
    address.city.trim() &&
    address.postalCode.trim() &&
    address.country.trim();

  const handleCheckout = async () => {
    if (!isFormValid) {
      toast.error("Please fill in all required shipping fields");
      return;
    }
    if (!actor) {
      toast.error("Not connected. Please try again.");
      return;
    }
    setIsSubmitting(true);
    try {
      // Persist shipping address to localStorage so it can be saved to the
      // order after Stripe redirects back and we have an OrderId.
      const shippingAddress = {
        fullName: address.fullName,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
      };
      localStorage.setItem(
        "pendingShippingAddress",
        JSON.stringify(shippingAddress),
      );

      // Map cart items to the ShoppingItem shape expected by the backend
      type ShoppingItem = {
        productName: string;
        productDescription: string;
        currency: string;
        priceInCents: bigint;
        quantity: bigint;
      };
      const shoppingItems: ShoppingItem[] = items.map((item) => ({
        productName: item.product.name,
        productDescription: item.product.description ?? "",
        currency: "usd",
        priceInCents: item.product.price,
        quantity: item.quantity,
      }));

      const typedActor = actor as unknown as {
        createCheckoutSession: (
          items: ShoppingItem[],
          successUrl: string,
          cancelUrl: string,
        ) => Promise<string>;
      };

      const sessionUrl = await typedActor.createCheckoutSession(
        shoppingItems,
        `${window.location.origin}/checkout/success`,
        `${window.location.origin}/checkout`,
      );

      if (sessionUrl) {
        window.location.href = sessionUrl;
      } else {
        toast.error(
          "Failed to create checkout session. Please check Stripe configuration.",
        );
      }
    } catch (err) {
      toast.error("Checkout failed. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Checkout
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Complete your shipping details to continue
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Shipping Form */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-warm">
            <h2 className="font-display font-semibold text-lg mb-6 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-accent/20 text-accent text-xs font-bold flex items-center justify-center">
                1
              </span>
              Shipping Address
            </h2>

            <div className="space-y-4">
              <FormField id="fullName" label="Full Name" required>
                <Input
                  id="fullName"
                  value={address.fullName}
                  onChange={set("fullName")}
                  placeholder="Jane Smith"
                  className="rounded-xl"
                  data-ocid="checkout-fullname"
                />
              </FormField>

              <FormField id="addressLine1" label="Address Line 1" required>
                <Input
                  id="addressLine1"
                  value={address.addressLine1}
                  onChange={set("addressLine1")}
                  placeholder="123 Coconut Lane"
                  className="rounded-xl"
                  data-ocid="checkout-address-line1"
                />
              </FormField>

              <FormField id="addressLine2" label="Address Line 2">
                <Input
                  id="addressLine2"
                  value={address.addressLine2}
                  onChange={set("addressLine2")}
                  placeholder="Apt, suite, unit (optional)"
                  className="rounded-xl"
                  data-ocid="checkout-address-line2"
                />
              </FormField>

              <div className="grid grid-cols-2 gap-4">
                <FormField id="city" label="City" required>
                  <Input
                    id="city"
                    value={address.city}
                    onChange={set("city")}
                    placeholder="Miami"
                    className="rounded-xl"
                    data-ocid="checkout-city"
                  />
                </FormField>
                <FormField id="state" label="State / Province">
                  <Input
                    id="state"
                    value={address.state}
                    onChange={set("state")}
                    placeholder="FL"
                    className="rounded-xl"
                    data-ocid="checkout-state"
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField id="postalCode" label="Postal Code" required>
                  <Input
                    id="postalCode"
                    value={address.postalCode}
                    onChange={set("postalCode")}
                    placeholder="33101"
                    className="rounded-xl"
                    data-ocid="checkout-postal-code"
                  />
                </FormField>
                <FormField id="country" label="Country" required>
                  <Input
                    id="country"
                    value={address.country}
                    onChange={set("country")}
                    placeholder="US"
                    className="rounded-xl"
                    data-ocid="checkout-country"
                  />
                </FormField>
              </div>
            </div>
          </div>

          {/* Security notice */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Secure Checkout
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Payment is processed securely by Stripe. We never store your
                card details on our servers.
              </p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-2xl p-6 sticky top-24 shadow-warm">
            <h2 className="font-display font-semibold text-lg mb-5 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-accent/20 text-accent text-xs font-bold flex items-center justify-center">
                2
              </span>
              Order Summary
            </h2>

            {isLoading ? (
              <div className="space-y-3">
                {["a", "b"].map((k) => (
                  <Skeleton key={k} className="h-10 w-full rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.productId.toString()}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      {item.product.imageUrl ? (
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-lg">
                          🥥
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity.toString()}
                      </p>
                    </div>
                    <span className="text-sm font-semibold flex-shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <Separator className="my-5" />

            <div className="space-y-2 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-primary text-xs font-medium">
                  Calculated by Stripe
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6 pt-4 border-t border-border">
              <span className="font-display font-bold text-lg">Total</span>
              <span className="font-display font-bold text-xl text-accent">
                {formatPrice(total)}
              </span>
            </div>

            <Button
              size="lg"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-xl transition-smooth shadow-warm disabled:opacity-60"
              onClick={handleCheckout}
              disabled={isSubmitting || !isFormValid}
              data-ocid="checkout-pay-btn"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              {isSubmitting ? "Redirecting to Stripe..." : "Pay with Stripe"}
            </Button>

            {!isFormValid && (
              <p className="text-xs text-muted-foreground text-center mt-3">
                Fill in required shipping fields to continue
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
