import React, { useState } from "react";
import { useCreateInventoryMutation } from "@/redux/features/restaurant/inventory/inventoryApi";
import { toast } from "react-hot-toast";

interface AddInventoryModalProps {
  barcode: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: any) => void;
}

export const AddInventoryModal: React.FC<AddInventoryModalProps> = ({
  barcode,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [createInventory, { isLoading }] = useCreateInventoryMutation();
  
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    price: 0,
    stock: 0,
    lowStockThreshold: 5,
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        barcode,
        price: Number(formData.price),
        stock: Number(formData.stock),
        lowStockThreshold: Number(formData.lowStockThreshold),
      };
      
      const result = await createInventory(payload).unwrap();
      toast.success("Item added to inventory!");
      
      // Reset form
      setFormData({
        name: "",
        sku: "",
        price: 0,
        stock: 0,
        lowStockThreshold: 5,
      });

      onSuccess(result);
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add item");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-slideIn">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-green-50">
          <h3 className="text-lg font-bold text-green-800">Add New Item</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">BARCODE (Auto-filled)</label>
            <input 
              type="text" 
              value={barcode} 
              disabled 
              className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">PRODUCT NAME</label>
            <input 
              required
              type="text" 
              placeholder="Enter product name"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">SKU</label>
              <input 
                required
                type="text" 
                placeholder="e.g. PRD-001"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
                value={formData.sku}
                onChange={(e) => setFormData({...formData, sku: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">PRICE ($)</label>
              <input 
                required
                type="number" 
                step="0.01"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">INITIAL STOCK</label>
              <input 
                required
                type="number" 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">LOW STOCK ALERT</label>
              <input 
                required
                type="number" 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
                value={formData.lowStockThreshold}
                onChange={(e) => setFormData({...formData, lowStockThreshold: Number(e.target.value)})}
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="button"
              onClick={() => {
                setFormData({
                  name: "",
                  sku: "",
                  price: 0,
                  stock: 0,
                  lowStockThreshold: 5,
                });
                onClose();
              }}
              className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-all text-sm"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isLoading}
              className="flex-1 py-2.5 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all text-sm shadow-lg shadow-green-200 disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
