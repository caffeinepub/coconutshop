/**
 * Formatting utilities for prices, dates, and order status
 */

import type { OrderStatus, OrderStatusString } from "../types";

export function formatPrice(cents: bigint | number): string {
  const amount = typeof cents === "bigint" ? Number(cents) : cents;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount / 100);
}

export function formatDate(timestamp: bigint | number): string {
  const ms =
    typeof timestamp === "bigint" ? Number(timestamp) / 1_000_000 : timestamp;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(ms));
}

export function formatDateTime(timestamp: bigint | number): string {
  const ms =
    typeof timestamp === "bigint" ? Number(timestamp) / 1_000_000 : timestamp;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(ms));
}

export function getOrderStatusLabel(status: OrderStatus): string {
  if ("pending" in status) return "Pending";
  if ("processing" in status) return "Processing";
  if ("shipped" in status) return "Shipped";
  if ("delivered" in status) return "Delivered";
  if ("cancelled" in status) return "Cancelled";
  return "Unknown";
}

export function getOrderStatusString(status: OrderStatus): OrderStatusString {
  if ("pending" in status) return "pending";
  if ("processing" in status) return "processing";
  if ("shipped" in status) return "shipped";
  if ("delivered" in status) return "delivered";
  return "cancelled";
}

export function getOrderStatusColor(status: OrderStatus): string {
  if ("pending" in status) return "bg-secondary text-secondary-foreground";
  if ("processing" in status) return "bg-primary/10 text-primary";
  if ("shipped" in status) return "bg-accent/20 text-accent-foreground";
  if ("delivered" in status) return "bg-primary/20 text-primary";
  if ("cancelled" in status) return "bg-destructive/10 text-destructive";
  return "bg-muted text-muted-foreground";
}

export function truncatePrincipal(principal: string): string {
  if (principal.length <= 16) return principal;
  return `${principal.slice(0, 8)}...${principal.slice(-6)}`;
}
