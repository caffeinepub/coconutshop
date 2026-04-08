import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";

interface CartBadgeProps {
  count: number;
  className?: string;
}

export function CartBadge({ count, className }: CartBadgeProps) {
  return (
    <Link
      to="/cart"
      className={cn(
        "relative inline-flex items-center justify-center p-2 rounded-full hover:bg-muted transition-colors",
        className,
      )}
      aria-label={`Shopping cart with ${count} items`}
      data-ocid="nav-cart"
    >
      <ShoppingCart className="w-5 h-5 text-foreground" />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-accent text-accent-foreground text-[10px] font-bold rounded-full px-1 leading-none">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
