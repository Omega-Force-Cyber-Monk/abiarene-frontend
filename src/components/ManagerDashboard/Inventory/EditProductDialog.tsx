import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-hot-toast";
import { useUpdateInventoryMutation } from "@/redux/features/manager/managerInventory/inventoryApi";

interface EditProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  onSuccess?: () => void;
}

export default function EditProductDialog({
  isOpen,
  onClose,
  product,
  onSuccess,
}: EditProductDialogProps) {
  const [updateInventory, { isLoading }] = useUpdateInventoryMutation();

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    barcode: "",
    stock: 0,
    price: 0,
    lowStockThreshold: 5,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        sku: product.sku || "",
        barcode: product.barcode || "",
        stock: product.stock || 0,
        price: product.price || 0,
        lowStockThreshold: product.lowStockThreshold || 5,
      });
    }
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "stock" || name === "price" || name === "lowStockThreshold"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateInventory({
        id: product.id,
        data: formData,
      }).unwrap();

      toast.success("Product updated successfully!");
      onClose();
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Failed to update product:", error);
      toast.error(error?.data?.message || "Failed to update product");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[0.2] bg-opacity-0.5">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4">
        <form onSubmit={handleSubmit}>
          <div className="bg-[#FFF7EC] rounded-2xl p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 border-b border-[#C6CAD1] pb-2">
              <h2 className="text-lg font-semibold text-gray-800">
                Edit Product
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="text-gray-500 hover:text-red-500 cursor-pointer"
              >
                <IoMdClose size={22} />
              </button>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#6C7787]">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-[#6C7787]">SKU *</label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-[#6C7787]">Barcode *</label>
                <input
                  type="text"
                  name="barcode"
                  value={formData.barcode}
                  onChange={handleInputChange}
                  className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-[#6C7787]">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
                />
              </div>

              <div>
                <label className="text-sm text-[#6C7787]">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
                />
              </div>

              <div>
                <label className="text-sm text-[#6C7787]">
                  Low Stock Threshold
                </label>
                <input
                  type="number"
                  name="lowStockThreshold"
                  value={formData.lowStockThreshold}
                  onChange={handleInputChange}
                  className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 cursor-pointer rounded-full border hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2 cursor-pointer rounded-full bg-[#061E49] text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Updating..." : "Update Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
