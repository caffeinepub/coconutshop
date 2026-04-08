import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import ProductLib "lib/products";
import CartLib "lib/cart";
import OrderLib "lib/orders";
import ProfileLib "lib/profiles";
import ProductsMixin "mixins/products-api";
import CartMixin "mixins/cart-api";
import OrdersMixin "mixins/orders-api";
import ProfilesMixin "mixins/profiles-api";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage (for product images)
  include MixinObjectStorage();

  // Counters for ID generation
  let productCounter = { var value : Nat = 0 };
  let orderCounter = { var value : Nat = 0 };

  // Stripe configuration
  var stripeConfigValue : ?Stripe.StripeConfiguration = null;

  // Domain state
  let products : ProductLib.ProductMap = Map.empty();
  let carts : CartLib.CartMap = Map.empty();
  let orders : OrderLib.OrderMap = Map.empty();
  let profiles : ProfileLib.ProfileMap = Map.empty();

  // HTTP outcall transform (required for Stripe/http-outcalls)
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // Stripe configuration functions (must be in actor, not mixin)
  public query func isStripeConfigured() : async Bool {
    stripeConfigValue != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfigValue := ?config;
  };

  func getStripeConfig() : Stripe.StripeConfiguration {
    switch (stripeConfigValue) {
      case (null) { Runtime.trap("Stripe is not configured") };
      case (?config) { config };
    };
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    await Stripe.createCheckoutSession(
      getStripeConfig(),
      caller,
      items,
      successUrl,
      cancelUrl,
      transform,
    );
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfig(), sessionId, transform);
  };

  // Mixins
  include ProfilesMixin(accessControlState, profiles);
  include ProductsMixin(accessControlState, products, productCounter);
  include CartMixin(accessControlState, carts);
  include OrdersMixin(accessControlState, orders, carts, products, orderCounter);
};
