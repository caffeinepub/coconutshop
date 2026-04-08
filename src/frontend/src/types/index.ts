// Shared types matching backend Motoko types

export type OrderStatus =
  | { pending: null }
  | { processing: null }
  | { shipped: null }
  | { delivered: null }
  | { cancelled: null };

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Product {
  id: bigint;
  name: string;
  description: string;
  price: bigint; // in cents
  imageUrl: string;
  category: string;
  stock: bigint;
  isActive: boolean;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface CartItem {
  productId: bigint;
  quantity: bigint;
  product: Product;
}

export interface Cart {
  items: CartItem[];
  total: bigint;
}

export interface OrderItem {
  productId: bigint;
  productName: string;
  quantity: bigint;
  priceAtPurchase: bigint;
  imageUrl: string;
}

export interface Order {
  id: bigint;
  userId: string;
  items: OrderItem[];
  total: bigint;
  status: OrderStatus;
  shippingAddress: ShippingAddress | null;
  stripeSessionId: string;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: ShippingAddress | null;
  createdAt: bigint;
}

// Helper type for display
export type OrderStatusString =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export function getOrderStatusString(status: OrderStatus): OrderStatusString {
  if ("pending" in status) return "pending";
  if ("processing" in status) return "processing";
  if ("shipped" in status) return "shipped";
  if ("delivered" in status) return "delivered";
  return "cancelled";
}

export function priceToNumber(price: bigint): number {
  return Number(price) / 100;
}
