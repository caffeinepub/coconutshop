import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ProductLib "../lib/products";
import ProductTypes "../types/products";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  products : ProductLib.ProductMap,
  productCounter : { var value : Nat },
) {
  public query func listProducts() : async [ProductTypes.Product] {
    ProductLib.listProducts(products);
  };

  public query func getProduct(id : Common.ProductId) : async ?ProductTypes.Product {
    ProductLib.getProduct(products, id);
  };

  public shared ({ caller }) func addProduct(input : ProductTypes.ProductInput) : async ProductTypes.Product {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    productCounter.value += 1;
    let id = ProductLib.generateId(productCounter.value);
    ProductLib.createProduct(products, id, input);
  };

  public shared ({ caller }) func updateProduct(id : Common.ProductId, input : ProductTypes.ProductInput) : async ?ProductTypes.Product {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    ProductLib.updateProduct(products, id, input);
  };

  public shared ({ caller }) func deleteProduct(id : Common.ProductId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    ProductLib.deleteProduct(products, id);
  };
};
