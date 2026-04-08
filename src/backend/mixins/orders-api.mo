import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import OrderLib "../lib/orders";
import CartLib "../lib/cart";
import ProductLib "../lib/products";
import OrderTypes "../types/orders";
import CartTypes "../types/cart";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  orders : OrderLib.OrderMap,
  carts : CartLib.CartMap,
  products : ProductLib.ProductMap,
  orderCounter : { var value : Nat },
) {
  // Confirm order after successful Stripe payment by sessionId.
  // Looks up the cart items, creates order record, clears cart.
  public shared ({ caller }) func confirmOrder(sessionId : Text) : async ?OrderTypes.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    // Check if order already exists for this session (idempotent)
    switch (OrderLib.findOrderByStripeSession(orders, sessionId)) {
      case (?existing) { ?existing };
      case (null) {
        let cart = CartLib.getCart(carts, caller);
        if (cart.items.size() == 0) {
          Runtime.trap("Cart is empty");
        };
        // Build order items from cart
        let orderItems = cart.items.filterMap(
          func(cartItem) {
            switch (ProductLib.getProduct(products, cartItem.productId)) {
              case (null) { null };
              case (?product) {
                ?{
                  productId = cartItem.productId;
                  productName = product.name;
                  quantity = cartItem.quantity;
                  priceInCents = product.priceInCents;
                };
              };
            };
          },
        );
        let totalInCents = orderItems.foldLeft(
          0,
          func(acc, item) { acc + item.priceInCents * item.quantity },
        );
        orderCounter.value += 1;
        let orderId = OrderLib.generateOrderId(orderCounter.value);
        let order = OrderLib.createOrder(orders, orderId, caller, orderItems, totalInCents, sessionId);
        CartLib.clearCart(carts, caller);
        ?order;
      };
    };
  };

  public query ({ caller }) func getMyOrders() : async [OrderTypes.Order] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    OrderLib.getOrdersByUser(orders, caller);
  };

  public query ({ caller }) func getOrder(id : Common.OrderId) : async ?OrderTypes.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    switch (OrderLib.getOrder(orders, id)) {
      case (null) { null };
      case (?order) {
        // Users can only see their own orders; admins can see all
        if (order.userId != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Cannot view another user's order");
        };
        ?order;
      };
    };
  };

  public query ({ caller }) func listAllOrders() : async [OrderTypes.Order] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list all orders");
    };
    OrderLib.listAllOrders(orders);
  };

  public shared ({ caller }) func updateOrderStatus(id : Common.OrderId, status : OrderTypes.OrderStatus) : async ?OrderTypes.Order {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    OrderLib.updateOrderStatus(orders, id, status);
  };

  public shared ({ caller }) func updateShippingAddress(id : Common.OrderId, address : OrderTypes.ShippingAddress) : async ?OrderTypes.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    switch (OrderLib.getOrder(orders, id)) {
      case (null) { null };
      case (?order) {
        if (order.userId != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Cannot update another user's order");
        };
        OrderLib.updateShippingAddress(orders, id, address);
      };
    };
  };
};
