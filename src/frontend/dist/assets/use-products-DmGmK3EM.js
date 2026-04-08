import { g as useActor, n as useQuery, h as createActor } from "./index-CneVpnEb.js";
function useProducts() {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProducts();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 1e3 * 60 * 5
  });
}
function useProduct(id) {
  const { actor, isFetching: actorFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["product", id == null ? void 0 : id.toString()],
    queryFn: async () => {
      if (!actor || id === void 0) return null;
      const result = await actor.getProduct(id);
      return result ?? null;
    },
    enabled: !!actor && !actorFetching && id !== void 0,
    staleTime: 1e3 * 60 * 5
  });
}
export {
  useProduct as a,
  useProducts as u
};
