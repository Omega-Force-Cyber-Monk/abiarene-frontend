import React, { useState, useEffect } from "react";
import { useUpdateInventoryMutation } from "@/redux/features/restaurant/inventory/inventoryApi";
import { InventoryItem } from "@/redux/features/restaurant/inventory/inventory.type";
import { toast } from "react-hot-toast";

interface UpdateInventoryModalProps {
  item: InventoryItem;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: any) => void;
}

export const UpdateInventoryModal: React.FC<UpdateInventoryModalProps> = ({
  item,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [updateInventory, { isLoading }] = useUpdateInventoryMutation();
  
  const [formData, setFormData] = useState({
    name: item.name,
    sku: item.sku,
    price: item.price,
    stock: item.stock,
    lowStockThreshold: item.lowStockThreshold,
  });

  // Update form data if item changes
  useEffect(() => {
    setFormData({
      name: item.name,
      sku: item.sku,
      price: item.price,
      stock: item.stock,
      lowStockThreshold: item.lowStockThreshold,
    });
  }, [item]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await updateInventory({
        id: item.id,
        data: {
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
          lowStockThreshold: Number(formData.lowStockThreshold),
        }
      }).unwrap();
      
      toast.success("Inventory updated!");
      onSuccess(result);
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-slideIn">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-blue-50">
          <h3 className="text-lg font-bold text-blue-800">Update Inventory</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">BARCODE</label>
            <input type="text" value={item.barcode} disabled className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-400 font-mono" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">PRODUCT NAME</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
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
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
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
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">CURRENT STOCK</label>
              <input 
                required
                type="number" 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">LOW STOCK THRESHOLD</label>
              <input 
                required
                type="number" 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.lowStockThreshold}
                onChange={(e) => setFormData({...formData, lowStockThreshold: Number(e.target.value)})}
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-all text-sm">Cancel</button>
            <button 
              type="submit"
              disabled={isLoading}
              className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all text-sm shadow-lg shadow-blue-200 disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
