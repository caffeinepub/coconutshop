import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useOrder } from "@/hooks/use-orders";
import {
  formatDateTime,
  formatPrice,
  getOrderStatusColor,
  getOrderStatusLabel,
} from "@/lib/format";
import { cn } from "@/lib/utils";
import type { OrderItem, ShippingAddress } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Package, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";

function DetailSkeleton() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
      <Skeleton className="h-8 w-48" />
      <Card>
        <CardContent className="p-5 space-y-3">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-52" />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-5 space-y-4">
          {[1, 2].map((n) => (
            <div key={n} className="flex gap-4 items-center">
              <Skeleton className="h-16 w-16 rounded-lg" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function ItemRow({ item }: { item: OrderItem }) {
  const lineTotal = BigInt(
    Number(item.quantity) * Number(item.priceAtPurchase),
  );
  return (
    <div className="flex items-center gap-4 py-3">
      <div className="w-16 h-16 rounded-lg bg-muted flex-shrink-0 overflow-hidden border border-border">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.productName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-6 h-6 text-muted-foreground" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground text-sm truncate">
          {item.productName}
        </p>
        <p className="text-muted-foreground text-xs mt-0.5">
          Qty: {Number(item.quantity)} · {formatPrice(item.priceAtPurchase)}{" "}
          each
        </p>
      </div>
      <span className="font-semibold text-foreground text-sm whitespace-nowrap">
        {formatPrice(lineTotal)}
      </span>
    </div>
  );
}

function AddressBlock({ address }: { address: ShippingAddress }) {
  return (
    <div className="flex gap-3">
      <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
      <div className="text-sm text-foreground leading-relaxed">
        <p>{address.street}</p>
        <p>
          {address.city}, {address.state} {address.zip}
        </p>
        <p>{address.country}</p>
      </div>
    </div>
  );
}

function LoginPrompt() {
  const { login, isLoading } = useAuth();
  return (
    <div
      className="flex flex-col items-center justify-center text-center py-20 px-4"
      data-ocid="order-detail-login-prompt"
    >
      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
        <ShoppingBag className="w-8 h-8 text-secondary-foreground" />
      </div>
      <h2 className="font-display text-lg font-bold text-foreground mb-2">
        Sign in required
      </h2>
      <p className="text-muted-foreground text-sm mb-5">
        Please sign in to view order details.
      </p>
      <Button
        onClick={login}
        disabled={isLoading}
        className="font-semibold"
        data-ocid="order-detail-login-btn"
      >
        {isLoading ? "Signing in…" : "Sign In"}
      </Button>
    </div>
  );
}

export default function OrderDetailPage() {
  const { isAuthenticated } = useAuth();
  const params = useParams({ from: "/orders/$id" });
  const orderId = params.id ? BigInt(params.id) : undefined;
  const { data: order, isLoading } = useOrder(orderId);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoginPrompt />
      </div>
    );
  }

  if (isLoading) return <DetailSkeleton />;

  if (!order) {
    return (
      <div
        className="max-w-2xl mx-auto px-4 py-16 text-center"
        data-ocid="order-not-found"
      >
        <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="font-display text-xl font-bold text-foreground mb-2">
          Order not found
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          We couldn't find this order. It may have been removed or you may not
          have access.
        </p>
        <Link to="/orders">
          <Button variant="outline" className="gap-2 font-semibold">
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Button>
        </Link>
      </div>
    );
  }

  const statusColor = getOrderStatusColor(order.status);
  const statusLabel = getOrderStatusLabel(order.status);
  const subtotal = order.items.reduce(
    (sum, item) =>
      sum + BigInt(Number(item.quantity) * Number(item.priceAtPurchase)),
    0n,
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-10" data-ocid="order-detail-page">
      {/* Back + Title */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-7"
      >
        <Link
          to="/orders"
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm transition-colors mb-4"
          data-ocid="order-detail-back"
        >
          <ArrowLeft className="h-4 w-4" />
          All Orders
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Order #{order.id.toString().padStart(4, "0")}
          </h1>
          <Badge
            className={cn(
              "text-xs px-3 py-1 rounded-full font-semibold border-0",
              statusColor,
            )}
          >
            {statusLabel}
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm mt-1">
          {formatDateTime(order.createdAt)}
        </p>
      </motion.div>

      <div className="space-y-5">
        {/* Items */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.08 }}
        >
          <Card className="border-border" data-ocid="order-items-card">
            <CardHeader className="pb-2 px-5 pt-5">
              <CardTitle className="text-base font-display font-semibold text-foreground">
                Items
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="divide-y divide-border">
                {order.items.map((item) => (
                  <ItemRow key={item.productId.toString()} item={item} />
                ))}
              </div>
              <Separator className="my-4" />
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between font-bold text-foreground text-base pt-1">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Shipping */}
        {order.shippingAddress && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.14 }}
          >
            <Card className="border-border" data-ocid="order-shipping-card">
              <CardHeader className="pb-2 px-5 pt-5">
                <CardTitle className="text-base font-display font-semibold text-foreground">
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <AddressBlock address={order.shippingAddress} />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Order Meta */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card
            className="border-border bg-muted/40"
            data-ocid="order-info-card"
          >
            <CardContent className="px-5 py-4">
              <dl className="grid grid-cols-2 gap-y-2 text-sm">
                <dt className="text-muted-foreground">Order ID</dt>
                <dd className="text-foreground font-medium text-right">
                  #{order.id.toString().padStart(4, "0")}
                </dd>
                <dt className="text-muted-foreground">Placed</dt>
                <dd className="text-foreground font-medium text-right">
                  {formatDateTime(order.createdAt)}
                </dd>
                <dt className="text-muted-foreground">Status</dt>
                <dd className="text-right">
                  <Badge
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full font-medium border-0",
                      statusColor,
                    )}
                  >
                    {statusLabel}
                  </Badge>
                </dd>
              </dl>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
