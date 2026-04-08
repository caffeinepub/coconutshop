import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { useProducts } from "@/hooks/use-products";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ClipboardList,
  ImageIcon,
  Package,
  Pencil,
  PlusCircle,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ProductFormData {
  name: string;
  description: string;
  priceInCents: string;
  stock: string;
  category: string;
  imageUrl: string;
}

const EMPTY_FORM: ProductFormData = {
  name: "",
  description: "",
  priceInCents: "",
  stock: "",
  category: "tender-coconut",
  imageUrl: "",
};

const CATEGORIES = [
  { value: "tender-coconut", label: "Tender Coconut" },
  { value: "coconut-water", label: "Coconut Water" },
  { value: "bulk", label: "Bulk Box" },
  { value: "organic", label: "Organic" },
];

function ProductFormDialog({
  open,
  onClose,
  product,
  onSave,
  saving,
}: {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: (data: ProductFormData) => Promise<void>;
  saving: boolean;
}) {
  const [form, setForm] = useState<ProductFormData>(EMPTY_FORM);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        priceInCents: (Number(product.price) / 100).toFixed(2),
        stock: product.stock.toString(),
        category: product.category,
        imageUrl: product.imageUrl,
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [product]);

  const set =
    (field: keyof ProductFormData) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.priceInCents || !form.stock) {
      toast.error("Please fill in all required fields");
      return;
    }
    await onSave(form);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-lg">
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="p-name">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="p-name"
              value={form.name}
              onChange={set("name")}
              placeholder="Classic Tender Coconut"
              data-ocid="product-name-input"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="p-desc">Description</Label>
            <Textarea
              id="p-desc"
              value={form.description}
              onChange={set("description")}
              placeholder="Fresh, organic tender coconuts hand-picked daily…"
              rows={3}
              data-ocid="product-description-input"
            />
          </div>

          {/* Price + Stock row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="p-price">
                Price (USD) <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  $
                </span>
                <Input
                  id="p-price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  className="pl-7"
                  value={form.priceInCents}
                  onChange={set("priceInCents")}
                  placeholder="4.99"
                  data-ocid="product-price-input"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="p-stock">
                Stock <span className="text-destructive">*</span>
              </Label>
              <Input
                id="p-stock"
                type="number"
                min="0"
                step="1"
                value={form.stock}
                onChange={set("stock")}
                placeholder="100"
                data-ocid="product-stock-input"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label htmlFor="p-cat">Category</Label>
            <select
              id="p-cat"
              value={form.category}
              onChange={set("category")}
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-ocid="product-category-select"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Image URL */}
          <div className="space-y-1.5">
            <Label htmlFor="p-img">Image URL</Label>
            <div className="flex gap-2">
              <Input
                id="p-img"
                value={form.imageUrl}
                onChange={set("imageUrl")}
                placeholder="https://... or /assets/..."
                data-ocid="product-image-url-input"
              />
              {form.imageUrl && (
                <div className="w-10 h-10 rounded border border-border overflow-hidden flex-shrink-0">
                  <img
                    src={form.imageUrl}
                    alt="preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                    }}
                  />
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Upload via object storage and paste the returned URL, or use an
              external image link.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              className="flex-1"
              disabled={saving}
              data-ocid="product-save-btn"
            >
              {saving ? "Saving…" : product ? "Save Changes" : "Add Product"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminProductsPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { data: products, isLoading } = useProducts();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [authLoading, isAuthenticated, navigate]);

  const typedActor = actor as unknown as {
    addProduct: (
      name: string,
      description: string,
      price: bigint,
      imageUrl: string,
      category: string,
      stock: bigint,
    ) => Promise<Product>;
    updateProduct: (
      id: bigint,
      name: string,
      description: string,
      price: bigint,
      imageUrl: string,
      category: string,
      stock: bigint,
    ) => Promise<boolean>;
    deleteProduct: (id: bigint) => Promise<boolean>;
  };

  const handleSave = async (form: ProductFormData) => {
    if (!actor) return;
    setSaving(true);
    try {
      const priceCents = BigInt(
        Math.round(Number.parseFloat(form.priceInCents) * 100),
      );
      const stockNum = BigInt(Number.parseInt(form.stock, 10));
      if (editProduct) {
        await typedActor.updateProduct(
          editProduct.id,
          form.name,
          form.description,
          priceCents,
          form.imageUrl,
          form.category,
          stockNum,
        );
        toast.success("Product updated");
      } else {
        await typedActor.addProduct(
          form.name,
          form.description,
          priceCents,
          form.imageUrl,
          form.category,
          stockNum,
        );
        toast.success("Product added");
      }
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setDialogOpen(false);
      setEditProduct(null);
    } catch (err) {
      toast.error("Failed to save product");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product: Product) => {
    if (!actor) return;
    const key = product.id.toString();
    setDeleting(key);
    try {
      await typedActor.deleteProduct(product.id);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(`"${product.name}" deleted`);
    } catch (err) {
      toast.error("Failed to delete product");
      console.error(err);
    } finally {
      setDeleting(null);
    }
  };

  const filtered = products?.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (authLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-4">
        <Skeleton className="h-8 w-48" />
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Package className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              Product Management
            </h1>
            <p className="text-sm text-muted-foreground">
              {products?.length ?? 0} products
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to="/admin/orders">
            <Button variant="outline" size="sm" className="gap-2">
              <ClipboardList className="w-4 h-4" />
              Orders
            </Button>
          </Link>
          <Button
            size="sm"
            className="gap-2"
            onClick={() => {
              setEditProduct(null);
              setDialogOpen(true);
            }}
            data-ocid="add-product-btn"
          >
            <PlusCircle className="w-4 h-4" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <Input
          placeholder="Search products by name or category…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
          data-ocid="product-search-input"
        />
      </div>

      {/* Product table */}
      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      ) : !filtered || filtered.length === 0 ? (
        <div
          className="text-center py-20 bg-card border border-border rounded-xl"
          data-ocid="admin-products-empty"
        >
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-lg font-medium text-foreground">
            {searchQuery ? "No products match your search" : "No products yet"}
          </p>
          {!searchQuery && (
            <Button
              className="mt-4 gap-2"
              onClick={() => {
                setEditProduct(null);
                setDialogOpen(true);
              }}
            >
              <PlusCircle className="w-4 h-4" />
              Add your first product
            </Button>
          )}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">
                    Product
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                    Category
                  </th>
                  <th className="text-right px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                    Price
                  </th>
                  <th className="text-right px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                    Stock
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                    Status
                  </th>
                  <th className="text-right px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((product) => (
                  <tr
                    key={product.id.toString()}
                    className="hover:bg-muted/20 transition-colors"
                    data-ocid="admin-product-row"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-border"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                            <ImageIcon className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs bg-muted/50 px-2 py-1 rounded capitalize">
                        {product.category.replace(/-/g, " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold tabular-nums">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                      {product.stock.toString()}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={
                          product.isActive
                            ? "text-xs border-0 bg-primary/10 text-primary"
                            : "text-xs border-0 bg-muted text-muted-foreground"
                        }
                      >
                        {product.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          onClick={() => {
                            setEditProduct(product);
                            setDialogOpen(true);
                          }}
                          data-ocid="edit-product-btn"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDelete(product)}
                          disabled={deleting === product.id.toString()}
                          data-ocid="delete-product-btn"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit dialog */}
      <ProductFormDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditProduct(null);
        }}
        product={editProduct}
        onSave={handleSave}
        saving={saving}
      />
    </div>
  );
}
