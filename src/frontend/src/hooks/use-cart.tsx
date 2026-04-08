import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Cart } from "../types";

export function useCart() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const cartQuery = useQuery<Cart | null>({
    queryKey: ["cart"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await (
        actor as unknown as { getCart: () => Promise<Cart | null> }
      ).getCart();
      return result ?? null;
    },
    enabled: !!actor && !actorFetching,
  });

  const addToCartMutation = useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: { productId: bigint; quantity: bigint }) => {
      if (!actor) throw new Error("Not connected");
      return (
        actor as unknown as {
          addToCart: (id: bigint, qty: bigint) => Promise<void>;
        }
      ).addToCart(productId, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (productId: bigint) => {
      if (!actor) throw new Error("Not connected");
      return (
        actor as unknown as { removeFromCart: (id: bigint) => Promise<void> }
      ).removeFromCart(productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: { productId: bigint; quantity: bigint }) => {
      if (!actor) throw new Error("Not connected");
      return (
        actor as unknown as {
          updateCartItemQuantity: (id: bigint, qty: bigint) => Promise<void>;
        }
      ).updateCartItemQuantity(productId, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return (
        actor as unknown as { clearCart: () => Promise<void> }
      ).clearCart();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const cartItemCount =
    cartQuery.data?.items.reduce(
      (sum, item) => sum + Number(item.quantity),
      0,
    ) ?? 0;

  return {
    cart: cartQuery.data ?? null,
    isLoading: actorFetching || cartQuery.isLoading,
    cartItemCount,
    addToCart: addToCartMutation.mutateAsync,
    removeFromCart: removeFromCartMutation.mutateAsync,
    updateQuantity: updateQuantityMutation.mutateAsync,
    clearCart: clearCartMutation.mutateAsync,
    isAddingToCart: addToCartMutation.isPending,
  };
}
