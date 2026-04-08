function formatPrice(cents) {
  const amount = typeof cents === "bigint" ? Number(cents) : cents;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount / 100);
}
function formatDate(timestamp) {
  const ms = typeof timestamp === "bigint" ? Number(timestamp) / 1e6 : timestamp;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(ms));
}
function formatDateTime(timestamp) {
  const ms = typeof timestamp === "bigint" ? Number(timestamp) / 1e6 : timestamp;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(ms));
}
function getOrderStatusLabel(status) {
  if ("pending" in status) return "Pending";
  if ("processing" in status) return "Processing";
  if ("shipped" in status) return "Shipped";
  if ("delivered" in status) return "Delivered";
  if ("cancelled" in status) return "Cancelled";
  return "Unknown";
}
function getOrderStatusString(status) {
  if ("pending" in status) return "pending";
  if ("processing" in status) return "processing";
  if ("shipped" in status) return "shipped";
  if ("delivered" in status) return "delivered";
  return "cancelled";
}
function getOrderStatusColor(status) {
  if ("pending" in status) return "bg-secondary text-secondary-foreground";
  if ("processing" in status) return "bg-primary/10 text-primary";
  if ("shipped" in status) return "bg-accent/20 text-accent-foreground";
  if ("delivered" in status) return "bg-primary/20 text-primary";
  if ("cancelled" in status) return "bg-destructive/10 text-destructive";
  return "bg-muted text-muted-foreground";
}
function truncatePrincipal(principal) {
  if (principal.length <= 16) return principal;
  return `${principal.slice(0, 8)}...${principal.slice(-6)}`;
}
export {
  getOrderStatusLabel as a,
  formatDate as b,
  formatDateTime as c,
  getOrderStatusString as d,
  formatPrice as f,
  getOrderStatusColor as g,
  truncatePrincipal as t
};
