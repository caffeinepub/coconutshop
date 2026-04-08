import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useAllOrders } from "@/hooks/use-orders";
import {
  formatDate,
  formatPrice,
  getOrderStatusColor,
  getOrderStatusLabel,
  getOrderStatusString,
  truncatePrincipal,
} from "@/lib/format";
import type { OrderStatus } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { Filter, Package, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "All Orders" },
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

const UPDATE_STATUS_OPTIONS = STATUS_OPTIONS.filter((o) => o.value !== "all");

function statusFromString(s: string): OrderStatus {
  const map: Record<string, OrderStatus> = {
    pending: { pending: null },
    processing: { processing: null },
    shipped: { shipped: null },
    delivered: { delivered: null },
    cancelled: { cancelled: null },
  };
  return map[s] ?? { pending: null };
}

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <Badge
      variant="outline"
      className={`text-xs font-medium border-0 ${getOrderStatusColor(status)}`}
    >
      {getOrderStatusLabel(status)}
    </Badge>
  );
}

export default function AdminOrdersPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { data: orders, isLoading } = useAllOrders();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<string>("all");
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [authLoading, isAuthenticated, navigate]);

  const handleStatusChange = async (orderId: bigint, newStatus: string) => {
    if (!actor) return;
    const key = orderId.toString();
    setUpdating(key);
    try {
      const typedActor = actor as unknown as {
        updateOrderStatus: (
          id: bigint,
          status: OrderStatus,
        ) => Promise<boolean>;
      };
      await typedActor.updateOrderStatus(orderId, statusFromString(newStatus));
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
      toast.success("Order status updated");
    } catch (err) {
      toast.error("Failed to update status");
      console.error(err);
    } finally {
      setUpdating(null);
    }
  };

  const filtered = orders?.filter((o) =>
    filter === "all" ? true : getOrderStatusString(o.status) === filter,
  );

  const counts = STATUS_OPTIONS.filter((o) => o.value !== "all").reduce(
    (acc, opt) => {
      acc[opt.value] =
        orders?.filter((o) => getOrderStatusString(o.status) === opt.value)
          .length ?? 0;
      return acc;
    },
    {} as Record<string, number>,
  );

  if (authLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-4">
        <Skeleton className="h-8 w-48" />
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Order Management
            </h1>
            <p className="text-sm text-muted-foreground">
              {orders?.length ?? 0} total orders
            </p>
          </div>
        </div>
        <Link to="/admin/products">
          <Button variant="outline" size="sm" className="gap-2">
            <Package className="w-4 h-4" />
            Products
          </Button>
        </Link>
      </div>

      {/* Status summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {UPDATE_STATUS_OPTIONS.map((opt) => (
          <button
            type="button"
            key={opt.value}
            onClick={() => setFilter(filter === opt.value ? "all" : opt.value)}
            className={`p-3 rounded-xl border text-left transition-smooth hover:shadow-warm ${
              filter === opt.value
                ? "border-primary bg-primary/5"
                : "border-border bg-card hover:border-primary/40"
            }`}
            data-ocid={`admin-filter-${opt.value}`}
          >
            <div className="text-2xl font-bold font-display text-foreground">
              {counts[opt.value]}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {opt.label}
            </div>
          </button>
        ))}
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-3 mb-4">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((opt) => (
            <button
              type="button"
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-smooth border ${
                filter === opt.value
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40"
              }`}
              data-ocid={`admin-tab-${opt.value}`}
            >
              {opt.label}
              {opt.value !== "all" && counts[opt.value] > 0 && (
                <span className="ml-1.5 opacity-70">{counts[opt.value]}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      ) : !filtered || filtered.length === 0 ? (
        <div
          className="text-center py-20 bg-card border border-border rounded-xl"
          data-ocid="admin-orders-empty"
        >
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-lg font-medium text-foreground">No orders found</p>
          <p className="text-sm text-muted-foreground mt-1">
            {filter !== "all"
              ? "Try selecting a different status filter"
              : "Orders will appear here once customers place them"}
          </p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                    Order
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                    Customer
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                    Date
                  </th>
                  <th className="text-center px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                    Items
                  </th>
                  <th className="text-right px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                    Total
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                    Update
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((order) => (
                  <tr
                    key={order.id.toString()}
                    className="hover:bg-muted/20 transition-colors"
                    data-ocid="admin-order-row"
                  >
                    <td className="px-4 py-3">
                      <Link
                        to="/orders/$id"
                        params={{ id: order.id.toString() }}
                        className="font-mono text-xs font-semibold text-primary hover:underline"
                      >
                        #{order.id.toString().padStart(4, "0")}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="font-mono text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded"
                        title={order.userId}
                      >
                        {truncatePrincipal(order.userId)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-center text-muted-foreground">
                      {order.items.length}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold tabular-nums">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-3">
                      <Select
                        onValueChange={(val) =>
                          handleStatusChange(order.id, val)
                        }
                        disabled={updating === order.id.toString()}
                      >
                        <SelectTrigger
                          className="h-7 w-36 text-xs"
                          data-ocid="admin-status-select"
                        >
                          <SelectValue placeholder="Change…" />
                        </SelectTrigger>
                        <SelectContent>
                          {UPDATE_STATUS_OPTIONS.map((opt) => (
                            <SelectItem
                              key={opt.value}
                              value={opt.value}
                              className="text-xs"
                            >
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-muted-foreground">
        Showing {filtered?.length ?? 0} of {orders?.length ?? 0} orders
      </p>
    </div>
  );
}
