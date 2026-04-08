import Common "common";

module {
  public type UserId = Common.UserId;
  public type OrderId = Common.OrderId;
  public type ProductId = Common.ProductId;

  public type OrderStatus = {
    #pending;
    #paid;
    #processing;
    #shipped;
    #delivered;
    #cancelled;
  };

  public type OrderItem = {
    productId : ProductId;
    productName : Text;
    quantity : Nat;
    priceInCents : Nat;
  };

  public type ShippingAddress = {
    fullName : Text;
    addressLine1 : Text;
    addressLine2 : Text;
    city : Text;
    state : Text;
    postalCode : Text;
    country : Text;
  };

  public type Order = {
    id : OrderId;
    userId : UserId;
    items : [OrderItem];
    totalInCents : Nat;
    status : OrderStatus;
    shippingAddress : ?ShippingAddress;
    stripeSessionId : Text;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };
};
