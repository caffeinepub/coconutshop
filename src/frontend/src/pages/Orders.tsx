import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useOrders } from "@/hooks/use-orders";
import {
  formatDate,
  formatPrice,
  getOrderStatusColor,
  getOrderStatusLabel,
} from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Order } from "@/types";
import { Link } from "@tanstack/react-router";
import { ArrowRight, PackageOpen, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";

function OrderSkeleton() {
  return (
    <Card className="border-border">
      <CardContent className="p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function OrderRow({ order, index }: { order: Order; index: number }) {
  const statusColor = getOrderStatusColor(order.status);
  const statusLabel = getOrderStatusLabel(order.status);
  const itemCount = order.items.reduce(
    (sum, item) => sum + Number(item.quantity),
    0,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
    >
      <Card className="border-border hover:shadow-warm-hover transition-smooth group">
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-display font-semibold text-foreground text-sm">
                  Order #{order.id.toString().padStart(4, "0")}
                </span>
                <Badge
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-full font-medium border-0",
                    statusColor,
                  )}
                >
                  {statusLabel}
                </Badge>
              </div>
              <p className="text-muted-foreground text-xs mt-1">
                {formatDate(order.createdAt)} · {itemCount}{" "}
                {itemCount === 1 ? "item" : "items"}
              </p>
            </div>
            <div
              className="flex items-center gap-4"
              data-ocid="order-row-actions"
            >
              <span className="font-display font-bold text-foreground">
                {formatPrice(order.total)}
              </span>
              <Link
                to="/orders/$id"
                params={{ id: order.id.toString() }}
                data-ocid="order-view-detail"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-primary hover:bg-primary/10 group-hover:translate-x-0.5 transition-smooth"
                  aria-label="View order details"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function EmptyOrders() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center text-center py-20 px-4"
      data-ocid="orders-empty-state"
    >
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5">
        <PackageOpen className="w-10 h-10 text-primary" />
      </div>
      <h2 className="font-display text-xl font-bold text-foreground mb-2">
        No orders yet
      </h2>
      <p className="text-muted-foreground text-sm max-w-xs mb-6">
        Your fresh coconut orders will appear here once you place your first
        order.
      </p>
      <Link to="/shop" data-ocid="orders-shop-cta">
        <Button className="gap-2 font-semibold">
          <ShoppingBag className="h-4 w-4" />
          Start Shopping
        </Button>
      </Link>
    </motion.div>
  );
}

function LoginPrompt() {
  const { login, isLoading } = useAuth();
  return (
    <div
      className="flex flex-col items-center justify-center text-center py-20 px-4"
      data-ocid="orders-login-prompt"
    >
      <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-5">
        <ShoppingBag className="w-10 h-10 text-secondary-foreground" />
      </div>
      <h2 className="font-display text-xl font-bold text-foreground mb-2">
        Sign in to view your orders
      </h2>
      <p className="text-muted-foreground text-sm max-w-xs mb-6">
        Log in with Internet Identity to access your order history.
      </p>
      <Button
        onClick={login}
        disabled={isLoading}
        className="font-semibold"
        data-ocid="orders-login-btn"
      >
        {isLoading ? "Signing in…" : "Sign In"}
      </Button>
    </div>
  );
}

export default function OrdersPage() {
  const { isAuthenticated } = useAuth();
  const { data: orders, isLoading } = useOrders();

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoginPrompt />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10" data-ocid="orders-page">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <h1 className="font-display text-2xl font-bold text-foreground">
          My Orders
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Track and view all your coconut orders
        </p>
      </motion.div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <OrderSkeleton key={n} />
          ))}
        </div>
      ) : !orders || orders.length === 0 ? (
        <EmptyOrders />
      ) : (
        <div className="space-y-3" data-ocid="orders-list">
          {orders.map((order, i) => (
            <OrderRow key={order.id.toString()} order={order} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
