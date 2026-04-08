import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const { login, clear, isLoginSuccess, identity, loginStatus } =
    useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = isLoginSuccess && !!identity;
  const principal = identity?.getPrincipal();

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: unknown) {
      const err = error as Error;
      if (err.message === "User is already authenticated") {
        await clear();
        setTimeout(() => login(), 300);
      } else {
        console.error("Login error:", err);
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  return {
    login: handleLogin,
    logout: handleLogout,
    isAuthenticated,
    principal,
    loginStatus,
    identity,
    isLoading: loginStatus === "logging-in",
  };
}
