import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/use-auth";
import { truncatePrincipal } from "@/lib/format";
import type { UserProfile } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Copy, LogOut, ShoppingBag, User } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function PrincipalBadge({ principal }: { principal: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(principal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 bg-muted hover:bg-muted/80 rounded-md px-2.5 py-1.5 text-xs font-mono text-muted-foreground transition-colors group"
      type="button"
      aria-label="Copy principal ID"
      data-ocid="profile-copy-principal"
    >
      {truncatePrincipal(principal)}
      {copied ? (
        <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
      ) : (
        <Copy className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
      )}
    </button>
  );
}

function ProfileSkeleton() {
  return (
    <div className="max-w-lg mx-auto px-4 py-10 space-y-6">
      <Skeleton className="h-8 w-32" />
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <Skeleton className="h-14 w-14 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-3 w-52" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-5 space-y-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-28" />
        </CardContent>
      </Card>
    </div>
  );
}

function LoginPrompt() {
  const { login, isLoading } = useAuth();
  return (
    <div
      className="flex flex-col items-center justify-center text-center py-20 px-4"
      data-ocid="profile-login-prompt"
    >
      <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-5">
        <User className="w-10 h-10 text-secondary-foreground" />
      </div>
      <h2 className="font-display text-xl font-bold text-foreground mb-2">
        Sign in to your account
      </h2>
      <p className="text-muted-foreground text-sm max-w-xs mb-6">
        Access your profile, manage your details, and view order history.
      </p>
      <Button
        onClick={login}
        disabled={isLoading}
        className="font-semibold gap-2"
        data-ocid="profile-login-btn"
      >
        <User className="h-4 w-4" />
        {isLoading ? "Signing in…" : "Sign In with Internet Identity"}
      </Button>
    </div>
  );
}

export default function ProfilePage() {
  const { isAuthenticated, principal, logout } = useAuth();
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery<UserProfile | null>({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await (
        actor as unknown as { getMyProfile: () => Promise<UserProfile | null> }
      ).getMyProfile();
      return result ?? null;
    },
    enabled: !!actor && !actorFetching && isAuthenticated,
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
      setPhone(profile.phone);
    }
  }, [profile]);

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return (
        actor as unknown as {
          updateProfile: (data: {
            name: string;
            email: string;
            phone: string;
          }) => Promise<void>;
        }
      ).updateProfile({ name, email, phone });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated successfully!");
    },
    onError: () => toast.error("Failed to update profile. Please try again."),
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoginPrompt />
      </div>
    );
  }

  if (isLoading && !profile) return <ProfileSkeleton />;

  const principalStr = principal?.toText() ?? "";

  return (
    <div className="max-w-lg mx-auto px-4 py-10" data-ocid="profile-page">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-7"
      >
        <h1 className="font-display text-2xl font-bold text-foreground">
          My Profile
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your account details
        </p>
      </motion.div>

      <div className="space-y-5">
        {/* Identity Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.06 }}
        >
          <Card className="border-border" data-ocid="profile-identity-card">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-7 h-7 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-display font-semibold text-foreground truncate">
                    {profile?.name || "CocoHaven Member"}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <Badge variant="secondary" className="text-xs">
                      Internet Identity
                    </Badge>
                    {principalStr && (
                      <PrincipalBadge principal={principalStr} />
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Edit Form */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.12 }}
        >
          <Card className="border-border" data-ocid="profile-edit-card">
            <CardHeader className="pb-2 px-5 pt-5">
              <CardTitle className="text-base font-display font-semibold text-foreground">
                Account Details
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateMutation.mutate();
                }}
                className="space-y-4"
                data-ocid="profile-form"
              >
                <div className="space-y-1.5">
                  <Label htmlFor="profile-name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="profile-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="bg-input border-border"
                    data-ocid="profile-name-input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="profile-email"
                    className="text-sm font-medium"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="profile-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="bg-input border-border"
                    data-ocid="profile-email-input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="profile-phone"
                    className="text-sm font-medium"
                  >
                    Phone
                  </Label>
                  <Input
                    id="profile-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 555 000 0000"
                    className="bg-input border-border"
                    data-ocid="profile-phone-input"
                  />
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <Button
                    type="submit"
                    disabled={updateMutation.isPending}
                    className="font-semibold"
                    data-ocid="profile-save-btn"
                  >
                    {updateMutation.isPending ? "Saving…" : "Save Changes"}
                  </Button>
                  {updateMutation.isSuccess && (
                    <span className="flex items-center gap-1 text-sm text-primary">
                      <CheckCircle2 className="w-4 h-4" />
                      Saved
                    </span>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.18 }}
        >
          <Card
            className="border-border bg-muted/40"
            data-ocid="profile-quick-links"
          >
            <CardContent className="px-5 py-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <Link
                  to="/orders"
                  className="flex-1"
                  data-ocid="profile-orders-link"
                >
                  <Button
                    variant="outline"
                    className="w-full gap-2 font-medium"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    View My Orders
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="flex-1 gap-2 font-medium text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
                  onClick={logout}
                  data-ocid="profile-logout-btn"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
