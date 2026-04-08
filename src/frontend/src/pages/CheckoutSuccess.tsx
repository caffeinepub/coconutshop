import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle,
  Home,
  Loader2,
  Package,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Status = "loading" | "success" | "failed";

const COCONUT_FACTS = [
  "Fresh tender coconuts are harvested at 6–7 months for maximum sweetness.",
  "Each coconut contains up to 1 liter of natural electrolyte-rich water.",
  "Coconut water has been used as an IV drip in emergencies.",
  "Your order will be packed fresh to preserve the natural nutrients.",
];

export default function CheckoutSuccessPage() {
  const queryClient = useQueryClient();
  const { actor } = useActor(createActor);
  const [status, setStatus] = useState<Status>("loading");
  const [funFact] = useState(
    () => COCONUT_FACTS[Math.floor(Math.random() * COCONUT_FACTS.length)],
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (!actor || !sessionId) {
      setStatus("success");
      return;
    }

    const confirm = async () => {
      try {
        const typedActor = actor as unknown as {
          confirmOrder: (sessionId: string) => Promise<boolean>;
        };
        await typedActor.confirmOrder(sessionId);
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        queryClient.invalidateQueries({ queryKey: ["cart"] });
        setStatus("success");
      } catch (err) {
        console.error(err);
        toast.error("Could not confirm order. Please contact support.");
        setStatus("failed");
      }
    };

    confirm();
  }, [actor, queryClient]);

  if (status === "loading") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20">
        <div className="bg-card border border-border rounded-2xl p-12 max-w-md w-full text-center shadow-warm">
          <Loader2 className="w-12 h-12 text-accent animate-spin mx-auto mb-5" />
          <h2 className="font-display text-xl font-bold text-foreground mb-2">
            Confirming your order...
          </h2>
          <p className="text-muted-foreground text-sm">
            We're processing your payment. This will only take a moment.
          </p>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div
        className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20"
        data-ocid="checkout-failed"
      >
        <div className="bg-card border border-border rounded-2xl p-10 max-w-md w-full text-center shadow-warm">
          <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <span className="text-4xl">⚠️</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-3">
            Something went wrong
          </h1>
          <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
            Your payment may have succeeded but order confirmation failed.
            Please contact our support team with your payment reference.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/orders">
              <Button
                className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl"
                data-ocid="failed-view-orders"
              >
                <Package className="w-4 h-4 mr-2" />
                Check Orders
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="rounded-xl">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16"
      data-ocid="checkout-success"
    >
      <div className="bg-card border border-border rounded-2xl p-10 max-w-lg w-full text-center shadow-warm">
        {/* Success icon */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-primary" />
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-accent" />
          </div>
        </div>

        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          Order Confirmed! 🥥
        </h1>
        <p className="text-lg font-medium text-accent mb-4">
          Thank you for your purchase
        </p>
        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
          Your fresh coconuts are being carefully prepared. You'll receive
          updates about your delivery soon. Stay refreshed!
        </p>

        {/* Fun fact */}
        <div className="bg-secondary/50 border border-border rounded-xl p-4 mb-8 text-left">
          <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1.5">
            🌴 Did you know?
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {funFact}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/orders">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-xl w-full sm:w-auto transition-smooth shadow-warm"
              data-ocid="success-view-orders"
            >
              <Package className="w-4 h-4 mr-2" />
              View My Orders
            </Button>
          </Link>
          <Link to="/shop">
            <Button
              size="lg"
              variant="outline"
              className="rounded-xl w-full sm:w-auto transition-smooth"
              data-ocid="success-continue-shopping"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
