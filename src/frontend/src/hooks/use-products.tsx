import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types";

export function useProducts() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return (
        actor as unknown as { listProducts: () => Promise<Product[]> }
      ).listProducts();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useProduct(id: bigint | undefined) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<Product | null>({
    queryKey: ["product", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      const result = await (
        actor as unknown as {
          getProduct: (id: bigint) => Promise<Product | null>;
        }
      ).getProduct(id);
      return result ?? null;
    },
    enabled: !!actor && !actorFetching && id !== undefined,
    staleTime: 1000 * 60 * 5,
  });
}
