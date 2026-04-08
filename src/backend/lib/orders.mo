import Map "mo:core/Map";
import Time "mo:core/Time";
import OrderTypes "../types/orders";
import Common "../types/common";

module {
  public type OrderMap = Map.Map<Common.OrderId, OrderTypes.Order>;

  public func generateOrderId(counter : Nat) : Common.OrderId {
    "order-" # debug_show(counter);
  };

  public func createOrder(
    orders : OrderMap,
    id : Common.OrderId,
    userId : Common.UserId,
    items : [OrderTypes.OrderItem],
    totalInCents : Nat,
    stripeSessionId : Text,
  ) : OrderTypes.Order {
    let now = Time.now();
    let order : OrderTypes.Order = {
      id;
      userId;
      items;
      totalInCents;
      status = #paid;
      shippingAddress = null;
      stripeSessionId;
      createdAt = now;
      updatedAt = now;
    };
    orders.add(id, order);
    order;
  };

  public func getOrder(orders : OrderMap, id : Common.OrderId) : ?OrderTypes.Order {
    orders.get(id);
  };

  public func getOrdersByUser(orders : OrderMap, userId : Common.UserId) : [OrderTypes.Order] {
    let all = orders.values().toArray();
    all.filter(func(o) { o.userId == userId });
  };

  public func listAllOrders(orders : OrderMap) : [OrderTypes.Order] {
    orders.values().toArray();
  };

  public func updateOrderStatus(orders : OrderMap, id : Common.OrderId, status : OrderTypes.OrderStatus) : ?OrderTypes.Order {
    switch (orders.get(id)) {
      case (null) { null };
      case (?order) {
        let updated = { order with status; updatedAt = Time.now() };
        orders.add(id, updated);
        ?updated;
      };
    };
  };

  public func updateShippingAddress(orders : OrderMap, id : Common.OrderId, address : OrderTypes.ShippingAddress) : ?OrderTypes.Order {
    switch (orders.get(id)) {
      case (null) { null };
      case (?order) {
        let updated = { order with shippingAddress = ?address; updatedAt = Time.now() };
        orders.add(id, updated);
        ?updated;
      };
    };
  };

  public func findOrderByStripeSession(orders : OrderMap, sessionId : Text) : ?OrderTypes.Order {
    let all = orders.values().toArray();
    all.find(func(o) { o.stripeSessionId == sessionId });
  };
};
