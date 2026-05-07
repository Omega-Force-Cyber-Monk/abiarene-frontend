import React, { useState } from "react";
import { MenuItem, OrderItem } from "../index";

interface OrderFormProps {
  initialData?: OrderItem;
  onSubmit: (data: Omit<OrderItem, "id"> & { id?: string }) => void;
  onCancel: () => void;
  menuItems: MenuItem[];
}

export const OrderForm = ({
  initialData,
  onSubmit,
  onCancel,
  menuItems,
}: OrderFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    price: initialData?.price || 0,
    quantity: initialData?.quantity || 1,
    customizations: initialData?.customizations?.join(", ") || "",
  });

  const handleMenuSelect = (menuId: string) => {
    const selected = menuItems.find((item) => item.id === menuId);
    if (selected) {
      setFormData({
        ...formData,
        name: selected.name,
        price: selected.price,
      });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          ...formData,
          id: initialData?.id,
          customizations: formData.customizations
            ? formData.customizations.split(",").map((c) => c.trim())
            : [],
        });
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select from Menu
        </label>
        <select
          onChange={(e) => handleMenuSelect(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2540] focus:border-transparent"
          defaultValue=""
        >
          <option value="">-- Select Menu Item --</option>
          {menuItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} - ${item.price}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2540] focus:border-transparent"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price ($)
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: parseFloat(e.target.value) })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2540] focus:border-transparent"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Quantity
        </label>
        <input
          type="number"
          min="1"
          value={formData.quantity}
          onChange={(e) =>
            setFormData({ ...formData, quantity: parseInt(e.target.value) })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2540] focus:border-transparent"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Customizations (comma separated)
        </label>
        <input
          type="text"
          value={formData.customizations}
          onChange={(e) =>
            setFormData({ ...formData, customizations: e.target.value })
          }
          placeholder="Extra spicy, No onion, Less salt"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A2540] focus:border-transparent"
        />
      </div>
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-[#0A2540] text-white rounded-lg hover:bg-[#0A2540]/90 cursor-pointer"
        >
          Save
        </button>
      </div>
    </form>
  );
};
