import Map "mo:core/Map";
import Time "mo:core/Time";
import CartTypes "../types/cart";
import Common "../types/common";

module {
  public type CartMap = Map.Map<Common.UserId, CartTypes.Cart>;

  // CartItem alias for use in orders-api
  public type CartItem = CartTypes.CartItem;

  public func getCart(carts : CartMap, userId : Common.UserId) : CartTypes.Cart {
    switch (carts.get(userId)) {
      case (?cart) { cart };
      case (null) {
        { userId; items = []; updatedAt = Time.now() };
      };
    };
  };

  public func addToCart(carts : CartMap, userId : Common.UserId, productId : Common.ProductId, quantity : Nat) {
    let existing = getCart(carts, userId);
    let found = existing.items.find(func(item) { item.productId == productId });
    let newItems = switch (found) {
      case (?_) {
        existing.items.map(
          func(i) : CartTypes.CartItem {
            if (i.productId == productId) {
              { i with quantity = i.quantity + quantity }
            } else { i }
          },
        );
      };
      case (null) {
        existing.items.concat([{ productId; quantity }]);
      };
    };
    carts.add(userId, { existing with items = newItems; updatedAt = Time.now() });
  };

  public func removeFromCart(carts : CartMap, userId : Common.UserId, productId : Common.ProductId) {
    let existing = getCart(carts, userId);
    let newItems = existing.items.filter(func(item) { item.productId != productId });
    carts.add(userId, { existing with items = newItems; updatedAt = Time.now() });
  };

  public func updateCartItemQuantity(carts : CartMap, userId : Common.UserId, productId : Common.ProductId, quantity : Nat) {
    let existing = getCart(carts, userId);
    let newItems = if (quantity == 0) {
      existing.items.filter(func(item) { item.productId != productId });
    } else {
      let found = existing.items.find(func(item) { item.productId == productId });
      switch (found) {
        case (?_) {
          existing.items.map(
            func(i) : CartTypes.CartItem {
              if (i.productId == productId) { { i with quantity } } else { i }
            },
          );
        };
        case (null) {
          existing.items.concat([{ productId; quantity }]);
        };
      };
    };
    carts.add(userId, { existing with items = newItems; updatedAt = Time.now() });
  };

  public func clearCart(carts : CartMap, userId : Common.UserId) {
    carts.add(userId, { userId; items = []; updatedAt = Time.now() });
  };
};
