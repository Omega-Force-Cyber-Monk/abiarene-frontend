import { Loader2, Trash2 } from "lucide-react";
import { MenuResponse } from "@/redux/features/restaurant/menu/menuApi";

interface SharedMenuContentProps {
  sharedMenu?: MenuResponse;
  onRemoveItem: (itemId: string) => void;
  isLoading: boolean;
}

export const SharedMenuContent = ({
  sharedMenu,
  onRemoveItem,
  isLoading,
}: SharedMenuContentProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="animate-spin text-[#0A2540]" size={40} />
        <p className="text-gray-500 font-medium animate-pulse">Syncing Shared Menu...</p>
      </div>
    );
  }

  const menuItems = sharedMenu?.items || [];

  return (
    <div className="p-6 bg-white min-h-[400px]">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-[#0A2540]">Shared Menu Items</h2>
        <p className="text-gray-400 text-sm font-medium">Currently active items in the shared menu</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {menuItems.length > 0 ? (
          menuItems.map((menuItem) => (
            <div
              key={menuItem.id}
              className="group relative bg-white p-5 rounded-[2rem] border border-gray-100 hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img
                    src={menuItem.item.image}
                    alt={menuItem.item.name}
                    className="w-24 h-24 rounded-3xl object-cover shadow-xl group-hover:scale-105 transition-all duration-500"
                  />
                  <button
                    onClick={() => onRemoveItem(menuItem.itemId)}
                    className="absolute -top-2 -right-2 w-10 h-10 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white shadow-lg cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <h4 className="font-black text-slate-800 text-lg mb-1">{menuItem.item.name}</h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                  {menuItem.item.category}
                </p>
                <div className="px-4 py-1.5 bg-slate-50 rounded-full text-sm font-black text-[#0A2540]">
                  ${menuItem.item.price}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-2xl shadow-sm">
              🍽️
            </div>
            <p className="text-slate-800 font-black text-lg">Your Shared Menu is empty</p>
            <p className="text-gray-400 text-sm mt-1 max-w-xs mx-auto">
              Click the "Add Shared Menu" button above to start adding items.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
