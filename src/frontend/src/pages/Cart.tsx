import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function CartPage() {
  const { cart, isLoading, removeFromCart, updateQuantity } = useCart();
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const handleRemove = async (productId: bigint, name: string) => {
    try {
      await removeFromCart(productId);
      toast.success(`${name} removed from cart`);
    } catch {
      toast.error("Failed to remove item");
    }
  };

  const handleUpdateQty = async (productId: bigint, quantity: number) => {
    if (quantity < 1) return;
    try {
      await updateQuantity({ productId, quantity: BigInt(quantity) });
    } catch {
      toast.error("Failed to update quantity");
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
    return (
      <div
        className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20"
        data-ocid="cart-unauthenticated"
      >
        <div className="bg-card border border-border rounded-2xl p-10 max-w-md w-full text-center shadow-warm">
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <ShoppingBag className="w-9 h-9 text-accent" />
          </div>
          <h2 className="font-display text-2xl font-bold mb-2 text-foreground">
            Sign in to view your cart
          </h2>
          <p className="text-muted-foreground mb-7 text-sm leading-relaxed">
            Your cart items are saved to your account. Sign in to see what
            you've added.
          </p>
          <Button
            onClick={login}
            size="lg"
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-xl transition-smooth"
            data-ocid="cart-login-btn"
          >
            Sign In with Internet Identity
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-4">
        <Skeleton className="h-9 w-36 mb-8" />
        {["a", "b", "c"].map((id) => (
          <Skeleton key={id} className="h-28 w-full rounded-2xl" />
        ))}
        <Skeleton className="h-44 w-full rounded-2xl mt-4" />
      </div>
    );
  }

  const items = cart?.items ?? [];

  if (items.length === 0) {
    return (
      <div
        className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20"
        data-ocid="cart-empty"
      >
        <div className="bg-card border border-border rounded-2xl p-10 max-w-md w-full text-center shadow-warm">
          <div className="text-6xl mb-4">🥥</div>
          <h2 className="font-display text-2xl font-bold mb-2 text-foreground">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground mb-7 text-sm">
            Add some fresh coconuts to get started!
          </p>
          <Link to="/shop">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-xl w-full transition-smooth"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Browse Our Selection
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const total = cart?.total ?? 0n;
  const itemCount = items.reduce((s, i) => s + Number(i.quantity), 0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Your Cart
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Items */}
        <div className="lg:col-span-3 space-y-3" data-ocid="cart-items-list">
          {items.map((item) => (
            <div
              key={item.productId.toString()}
              className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 shadow-warm transition-smooth hover:shadow-warm-hover"
              data-ocid="cart-item"
            >
              {/* Image */}
              <div className="w-18 h-18 flex-shrink-0 rounded-xl overflow-hidden bg-muted w-[72px] h-[72px]">
                {item.product.imageUrl ? (
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl">
                    🥥
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate text-sm">
                  {item.product.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {formatPrice(item.product.price)} each
                </p>
                <p className="text-sm font-bold text-accent mt-1">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
              </div>

              {/* Qty controls */}
              <div className="flex items-center gap-1 bg-muted/50 rounded-xl p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-lg hover:bg-card"
                  onClick={() =>
                    handleUpdateQty(item.productId, Number(item.quantity) - 1)
                  }
                  aria-label="Decrease quantity"
                  data-ocid="cart-qty-decrease"
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="w-7 text-center text-sm font-bold tabular-nums">
                  {item.quantity.toString()}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 rounded-lg hover:bg-card"
                  onClick={() =>
                    handleUpdateQty(item.productId, Number(item.quantity) + 1)
                  }
                  aria-label="Increase quantity"
                  data-ocid="cart-qty-increase"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>

              {/* Remove */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-smooth flex-shrink-0"
                onClick={() => handleRemove(item.productId, item.product.name)}
                aria-label={`Remove ${item.product.name}`}
                data-ocid="cart-remove-btn"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-2xl p-6 sticky top-24 shadow-warm">
            <h2 className="font-display font-bold text-lg text-foreground mb-5">
              Order Summary
            </h2>

            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div
                  key={item.productId.toString()}
                  className="flex justify-between text-sm"
                >
                  <span className="text-muted-foreground truncate mr-2 min-w-0">
                    {item.product.name} ×{item.quantity.toString()}
                  </span>
                  <span className="font-medium flex-shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between items-center mb-1">
              <span className="text-muted-foreground text-sm">Subtotal</span>
              <span className="font-semibold">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-muted-foreground text-sm">Shipping</span>
              <span className="text-sm text-primary font-medium">
                Calculated at checkout
              </span>
            </div>

            <div className="flex justify-between items-center mb-6 pt-4 border-t border-border">
              <span className="font-display font-bold text-lg">Total</span>
              <span className="font-display font-bold text-xl text-accent">
                {formatPrice(total)}
              </span>
            </div>

            <Button
              size="lg"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-xl transition-smooth shadow-warm"
              onClick={handleCheckout}
              data-ocid="cart-checkout-btn"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <Link to="/shop">
              <Button
                variant="ghost"
                className="w-full mt-3 text-muted-foreground hover:text-foreground text-sm"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
