import { CartBadge } from "@/components/CartBadge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { Link, useRouterState } from "@tanstack/react-router";
import { LogIn, LogOut, PackageCheck, User } from "lucide-react";

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 group" data-ocid="nav-logo">
      <span className="text-xl" role="img" aria-label="coconut">
        🥥
      </span>
      <span className="font-display font-bold text-xl tracking-tight text-primary group-hover:text-primary/80 transition-colors">
        CocoHaven
      </span>
    </Link>
  );
}

function NavLinks({ isAuthenticated }: { isAuthenticated: boolean }) {
  return (
    <nav className="hidden md:flex items-center gap-6">
      <Link
        to="/"
        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        data-ocid="nav-home"
      >
        Home
      </Link>
      <Link
        to="/shop"
        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        data-ocid="nav-shop"
      >
        Shop
      </Link>
      {isAuthenticated && (
        <Link
          to="/orders"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          data-ocid="nav-orders"
        >
          My Orders
        </Link>
      )}
    </nav>
  );
}

function AuthButtons({
  isAuthenticated,
  login,
  logout,
  isLoading,
}: {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  isLoading: boolean;
}) {
  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <Link to="/profile">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Profile"
            data-ocid="nav-profile"
          >
            <User className="w-4 h-4" />
          </Button>
        </Link>
        <Link to="/orders">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Orders"
            data-ocid="nav-orders-icon"
          >
            <PackageCheck className="w-4 h-4" />
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="text-muted-foreground hover:text-foreground"
          data-ocid="nav-logout"
        >
          <LogOut className="w-4 h-4 mr-1" />
          Logout
        </Button>
      </div>
    );
  }
  return (
    <Button
      size="sm"
      onClick={login}
      disabled={isLoading}
      className="bg-primary text-primary-foreground hover:bg-primary/90"
      data-ocid="nav-login"
    >
      <LogIn className="w-4 h-4 mr-1" />
      {isLoading ? "Signing in..." : "Sign In"}
    </Button>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated, login, logout, isLoading } = useAuth();
  const { cartItemCount } = useCart();
  const routerState = useRouterState();
  const isAdminPage = routerState.location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border shadow-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Logo />
            <NavLinks isAuthenticated={isAuthenticated} />
          </div>

          <div className="flex items-center gap-3">
            {isAdminPage && (
              <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                Admin
              </span>
            )}
            <CartBadge count={cartItemCount} />
            <AuthButtons
              isAuthenticated={isAuthenticated}
              login={login}
              logout={logout}
              isLoading={isLoading}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">🥥</span>
              <span className="font-display font-bold text-primary">
                CocoHaven
              </span>
              <span className="text-muted-foreground text-sm ml-2">
                Fresh tropical goodness, delivered.
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <Link
                to="/shop"
                className="hover:text-foreground transition-colors"
              >
                Shop
              </Link>
              {isAuthenticated && (
                <Link
                  to="/orders"
                  className="hover:text-foreground transition-colors"
                >
                  Orders
                </Link>
              )}
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-border text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
