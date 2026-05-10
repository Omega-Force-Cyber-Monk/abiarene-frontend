import { useState, useEffect } from "react";
import { MenuItemCard } from "./MenuItemCard";
import { Send, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useGetSharedMenuQuery } from "@/redux/features/restaurant/menu/menuApi";
import { useCreateOrderMutation } from "@/redux/features/restaurant/order/orderApi";

type MenuModalProps = {
  tableId: string;
  onClose: () => void;
};

export interface CartItem {
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  notes: string;
  selectedOptions: string[];
  availableOptions?: string[];
}

export const MenuModal = ({ tableId, onClose }: MenuModalProps) => {
  const { data: sharedMenu, isLoading: isMenuLoading } = useGetSharedMenuQuery();
  const [createOrder, { isLoading: isCreating }] = useCreateOrderMutation();
  const navigate = useNavigate();

  const draftKey = `draft_order_table_${tableId}`;

  // Initialize cart from localStorage if exists
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(draftKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(draftKey, JSON.stringify(cart));
  }, [cart, draftKey]);

  const handleAddToCart = (item: any) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.itemId === item.id);
      if (existingIndex >= 0) {
        return prev.map((i, idx) =>
          idx === existingIndex ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      let opts = item.options;
      if (typeof opts === 'string') {
        try { opts = JSON.parse(opts); } catch(e) { opts = []; }
      }
      opts = Array.isArray(opts) ? opts : [];

      return [
        ...prev,
        {
          itemId: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          notes: "",
          selectedOptions: [],
          availableOptions: opts,
        },
      ];
    });
  };

  const handleToggleOptionCart = (index: number, opt: string) => {
    setCart((prev) =>
      prev.map((i, idx) => {
        if (idx === index) {
          const newSelected = i.selectedOptions.includes(opt)
            ? i.selectedOptions.filter((o) => o !== opt)
            : [...i.selectedOptions, opt];
          return { ...i, selectedOptions: newSelected };
        }
        return i;
      })
    );
  };

  const handleUpdateNotesCart = (index: number, notes: string) => {
    setCart((prev) =>
      prev.map((i, idx) => {
        if (idx === index) {
          return { ...i, notes };
        }
        return i;
      })
    );
  };

  const handleUpdateQuantity = (index: number, increment: boolean) => {
    setCart((prev) =>
      prev
        .map((i, idx) => {
          if (idx === index) {
            const newQ = increment ? i.quantity + 1 : i.quantity - 1;
            return { ...i, quantity: Math.max(0, newQ) };
          }
          return i;
        })
        .filter((i) => i.quantity > 0)
    );
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleConfirmOrder = async () => {
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    try {
      const payload = {
        tableId,
        items: cart.map((c) => ({
          itemId: c.itemId,
          quantity: c.quantity,
          notes: c.notes,
          selectedOptions: c.selectedOptions,
        })),
      };

      await createOrder(payload).unwrap();
      toast.success("Order confirmed successfully!");
      
      // Clear draft after success
      setCart([]);
      localStorage.removeItem(draftKey);
      onClose();
      navigate("/server-dashboard/orders");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create order");
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const menuItems = sharedMenu?.items || [];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-0 sm:p-4 md:p-10">
      <div className="bg-white w-full h-full sm:h-[90vh] lg:h-full max-w-7xl sm:rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl transition-all duration-300 relative">
        <div className="px-6 py-4 md:px-8 md:py-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <h2 className="text-xl md:text-2xl font-bold text-[#0A2540]">
            Table Order {tableId && `(ID: ${tableId.substring(0,6)})`}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 cursor-pointer flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-black"
          >
            <span className="text-3xl">&times;</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          {/* Left: Food Items Grid */}
          <div className="flex-[2.5] p-4 md:p-8 overflow-y-auto bg-gray-50/30">
            {isMenuLoading ? (
              <div className="flex flex-col items-center justify-center h-full">
                <Loader2 className="animate-spin text-[#0A2540] mb-4" size={40} />
                <p className="text-gray-500 font-medium animate-pulse">Loading Menu...</p>
              </div>
            ) : menuItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {menuItems.map((mi) => (
                  <div key={mi.id} onClick={() => handleAddToCart(mi.item)} className="cursor-pointer">
                    <MenuItemCard
                      description={mi.item.description || mi.item.category}
                      image={mi.item.image}
                      name={mi.item.name}
                      price={mi.item.price}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-gray-500 font-medium">No items found in the shared menu.</p>
              </div>
            )}
          </div>

          {/* Right: Order Summary (Draft Cart) */}
          <div className="flex-1 bg-[#F3F4F6] p-6 md:p-8 flex flex-col border-t lg:border-t-0 lg:border-l border-gray-200">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h3 className="font-bold uppercase text-xs tracking-widest text-gray-500">
                CURRENT ORDER
              </h3>
              {cart.length > 0 && (
                <button 
                  onClick={() => setCart([])}
                  className="text-xs text-red-500 font-semibold hover:underline cursor-pointer"
                >
                  Clear Draft
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto pr-2 -mr-2 min-h-[150px] space-y-3">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="text-gray-400 font-medium text-sm">Cart is empty.</p>
                  <p className="text-gray-400 font-medium text-xs mt-1">Tap items to add them.</p>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div key={`${item.itemId}-${index}`} className="bg-white p-5 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col gap-4 relative">
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <h4 className="font-medium text-[#1A202C] text-[18px] tracking-tight leading-none mb-2">{item.name}</h4>
                        <p className="text-[#64748B] font-medium text-[16px]">${item.price.toFixed(2)}</p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => handleUpdateQuantity(index, false)}
                            className="w-8 h-8 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:border-[#CBD5E1] hover:text-[#475569] transition-colors cursor-pointer bg-white"
                          >
                            <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 1H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                          </button>
                          <span className="font-medium text-[#1A202C] text-[18px] min-w-[14px] text-center">{item.quantity}</span>
                          <button 
                            onClick={() => handleUpdateQuantity(index, true)}
                            className="w-8 h-8 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:border-[#CBD5E1] hover:text-[#475569] transition-colors cursor-pointer bg-white"
                          >
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 1V9M1 5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => handleRemoveItem(index)}
                          className="w-8 h-8 flex items-center justify-center text-[#EF4444] hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L11 11M1 11L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* Inline Options (Pills) */}
                    {item.availableOptions && item.availableOptions.length > 0 && (
                      <div className="flex flex-wrap gap-2.5">
                        {item.availableOptions.map((opt: string) => {
                          const isSelected = item.selectedOptions.includes(opt);
                          return (
                            <button
                              key={opt}
                              onClick={() => handleToggleOptionCart(index, opt)}
                              className={`px-4 py-1.5 rounded-full text-[13px] font-medium border cursor-pointer transition-all ${
                                isSelected 
                                  ? "bg-[#3730A3] border-[#3730A3] text-white shadow-sm" 
                                  : "bg-white border-[#E2E8F0] text-[#334155] hover:border-[#CBD5E1] hover:bg-[#F8FAFC]"
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Inline Notes */}
                    <div className="mt-1">
                      <input 
                        type="text"
                        placeholder="Add special notes..."
                        value={item.notes}
                        onChange={(e) => handleUpdateNotesCart(index, e.target.value)}
                        className="w-full text-[14px] px-4 py-2.5 bg-[#F8FAFC] border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-[#E2E8F0] focus:ring-4 focus:ring-[#F1F5F9] placeholder-[#94A3B8] transition-all text-[#334155] font-medium"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <span className="text-gray-500 font-medium">Total:</span>
                <span className="text-xl md:text-2xl font-black text-[#0A2540]">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <button 
                onClick={handleConfirmOrder}
                disabled={cart.length === 0 || isCreating}
                className="w-full cursor-pointer bg-[#0A2540] hover:bg-[#0A2540]/90 text-white py-4 md:py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
              >
                {isCreating ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    CONFIRM ORDER
                    <Send size={20} className="rotate-45" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

