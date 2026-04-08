import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/products";
import Common "../types/common";

module {
  public type ProductMap = Map.Map<Common.ProductId, Types.Product>;

  public func generateId(counter : Nat) : Common.ProductId {
    "product-" # debug_show(counter);
  };

  public func createProduct(products : ProductMap, id : Common.ProductId, input : Types.ProductInput) : Types.Product {
    let product : Types.Product = {
      id;
      name = input.name;
      description = input.description;
      priceInCents = input.priceInCents;
      imageBlob = input.imageBlob;
      stock = input.stock;
      category = input.category;
      createdAt = Time.now();
    };
    products.add(id, product);
    product;
  };

  public func updateProduct(products : ProductMap, id : Common.ProductId, input : Types.ProductInput) : ?Types.Product {
    switch (products.get(id)) {
      case (null) { null };
      case (?existing) {
        let updated : Types.Product = {
          existing with
          name = input.name;
          description = input.description;
          priceInCents = input.priceInCents;
          imageBlob = input.imageBlob;
          stock = input.stock;
          category = input.category;
        };
        products.add(id, updated);
        ?updated;
      };
    };
  };

  public func deleteProduct(products : ProductMap, id : Common.ProductId) : Bool {
    switch (products.get(id)) {
      case (null) { false };
      case (?_) {
        products.remove(id);
        true;
      };
    };
  };

  public func getProduct(products : ProductMap, id : Common.ProductId) : ?Types.Product {
    products.get(id);
  };

  public func listProducts(products : ProductMap) : [Types.Product] {
    products.values().toArray();
  };
};
