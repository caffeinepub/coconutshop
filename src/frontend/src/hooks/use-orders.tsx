import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import type { Order } from "../types";

export function useOrders() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return (
        actor as unknown as { getMyOrders: () => Promise<Order[]> }
      ).getMyOrders();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useOrder(id: bigint | undefined) {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<Order | null>({
    queryKey: ["order", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      const result = await (
        actor as unknown as { getOrder: (id: bigint) => Promise<Order | null> }
      ).getOrder(id);
      return result ?? null;
    },
    enabled: !!actor && !actorFetching && id !== undefined,
  });
}

export function useAllOrders() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<Order[]>({
    queryKey: ["admin", "orders"],
    queryFn: async () => {
      if (!actor) return [];
      return (
        actor as unknown as { listAllOrders: () => Promise<Order[]> }
      ).listAllOrders();
    },
    enabled: !!actor && !actorFetching,
  });
}
