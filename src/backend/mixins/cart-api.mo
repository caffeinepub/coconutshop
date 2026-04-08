import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CartLib "../lib/cart";
import CartTypes "../types/cart";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  carts : CartLib.CartMap,
) {
  public query ({ caller }) func getCart() : async CartTypes.Cart {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    CartLib.getCart(carts, caller);
  };

  public shared ({ caller }) func addToCart(productId : Common.ProductId, quantity : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    CartLib.addToCart(carts, caller, productId, quantity);
  };

  public shared ({ caller }) func removeFromCart(productId : Common.ProductId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    CartLib.removeFromCart(carts, caller, productId);
  };

  public shared ({ caller }) func updateCartItemQuantity(productId : Common.ProductId, quantity : Nat) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    CartLib.updateCartItemQuantity(carts, caller, productId, quantity);
  };

  public shared ({ caller }) func clearCart() : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    CartLib.clearCart(carts, caller);
  };
};
