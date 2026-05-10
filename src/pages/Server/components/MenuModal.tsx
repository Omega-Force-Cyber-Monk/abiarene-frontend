import { MENU_ITEMS, CURRENT_ORDER } from "../DammyData";
import { MenuItemCard } from "./MenuItemCard";
import { CurrentOrderItem } from "./CurrentOrderItem";
import { Send } from "lucide-react";

type MenuModalProps = {
  tableId: number | string;
  onClose: () => void;
};

export const MenuModal = ({ tableId, onClose }: MenuModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-0 sm:p-4 md:p-10">
      <div className="bg-white w-full h-full sm:h-[90vh] lg:h-full max-w-7xl sm:rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl transition-all duration-300">
        {/* Modal Header */}
        <div className="px-6 py-4 md:px-8 md:py-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 className="text-xl md:text-2xl font-bold text-[#0A2540]">
            Table {tableId.toString().padStart(2, "0")} Menu
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 cursor-pointer flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-black"
          >
            <span className="text-3xl">&times;</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          {/* Left: Food Items Grid */}
          <div className="flex-[2.5] p-4 md:p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-gray-50/30 max-h-[50vh] lg:max-h-none">
            {MENU_ITEMS.map((menu) => (
              <MenuItemCard
                key={menu.id}
                description={menu.description}
                image={menu.image}
                name={menu.name}
                price={menu.price}
              />
            ))}
          </div>

          {/* Right: Order Summary */}
          <div className="flex-1 bg-[#F3F4F6] p-6 md:p-8 flex flex-col border-t lg:border-t-0 lg:border-l border-gray-200">
            <h3 className="font-bold mb-4 md:mb-6 uppercase text-xs tracking-widest text-gray-500">
              CURRENT ORDER
            </h3>

            <div className="flex-1 overflow-y-auto pr-2 -mr-2 min-h-[150px]">
              {CURRENT_ORDER.map((item) => (
                <CurrentOrderItem
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  customizations={item.customizations}
                />
              ))}
            </div>

            <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <span className="text-gray-500 font-medium">Total:</span>
                <span className="text-xl md:text-2xl font-black text-[#0A2540]">
                  $17.49
                </span>
              </div>

              <button className="w-full cursor-pointer bg-[#0A2540] hover:bg-[#0A2540]/90 text-white py-4 md:py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all transform active:scale-[0.98]">
                CONFIRM ORDER
                <Send size={20} className="rotate-45" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
