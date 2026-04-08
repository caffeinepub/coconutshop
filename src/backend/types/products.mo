import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type ProductId = Common.ProductId;

  public type Product = {
    id : ProductId;
    name : Text;
    description : Text;
    priceInCents : Nat;
    imageBlob : Storage.ExternalBlob;
    stock : Nat;
    category : Text;
    createdAt : Common.Timestamp;
  };

  public type ProductInput = {
    name : Text;
    description : Text;
    priceInCents : Nat;
    imageBlob : Storage.ExternalBlob;
    stock : Nat;
    category : Text;
  };
};
