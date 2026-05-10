import { useState } from "react";
import { Item } from "@/redux/features/restaurant/item/item.type";
import { MenuResponse } from "@/redux/features/restaurant/menu/menuApi";

interface SharedMenuFormProps {
  items: Item[];
  sharedMenu?: MenuResponse;
  onSubmit: (data: { name: string; itemIds: string[] }) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const SharedMenuForm = ({ items, sharedMenu, onSubmit, onCancel, isSubmitting }: SharedMenuFormProps) => {
  const [name, setName] = useState("Main Menu");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filter out items that are already in the shared menu
  const existingItemIds = new Set(sharedMenu?.items?.map(mi => mi.itemId) || []);
  const availableItems = items.filter(item => !existingItemIds.has(item.id));

  const toggleItem = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, itemIds: selectedIds });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Menu Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Main Menu"
          className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#061E49]/20 outline-none transition-all"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Select Items to Add</label>
        {availableItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto p-2 border border-gray-50 rounded-xl">
            {availableItems.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                  selectedIds.includes(item.id)
                    ? "border-[#061E49] bg-slate-50"
                    : "border-gray-50 hover:border-gray-100"
                }`}
              >
                <img src={item.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-slate-800 truncate">{item.name}</p>
                  <p className="text-[10px] font-bold text-gray-400">${item.price}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedIds.includes(item.id) ? "bg-[#061E49] border-[#061E49]" : "border-gray-200"
                }`}>
                  {selectedIds.includes(item.id) && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <p className="text-gray-500 font-medium text-sm">All available items are already in the menu.</p>
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 px-6 rounded-xl border border-gray-100 font-bold text-gray-500 hover:bg-gray-50 transition-all cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || selectedIds.length === 0}
          className="flex-[2] py-3 px-6 rounded-xl bg-[#061E49] text-white font-bold hover:bg-[#0A2540] transition-all cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? "Processing..." : "Add to Menu"}
        </button>
      </div>
    </form>
  );
};
