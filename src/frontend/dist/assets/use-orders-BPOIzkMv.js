import { g as useActor, n as useQuery, h as createActor } from "./index-CneVpnEb.js";
function useOrders() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyOrders();
    },
    enabled: !!actor && !actorFetching
  });
}
function useOrder(id) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["order", id == null ? void 0 : id.toString()],
    queryFn: async () => {
      if (!actor || id === void 0) return null;
      const result = await actor.getOrder(id);
      return result ?? null;
    },
    enabled: !!actor && !actorFetching && id !== void 0
  });
}
function useAllOrders() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["admin", "orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAllOrders();
    },
    enabled: !!actor && !actorFetching
  });
}
export {
  useOrder as a,
  useAllOrders as b,
  useOrders as u
};
