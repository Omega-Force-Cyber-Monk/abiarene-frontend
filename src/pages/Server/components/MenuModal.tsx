import { useState } from "react";
import { MenuItemCard } from "./MenuItemCard";
import { CurrentOrderItem } from "./CurrentOrderItem";
import { Send, Loader2 } from "lucide-react";
import { useGetItemsQuery } from "@/redux/features/restaurant/item/itemApi";
import { useCreateOrderMutation } from "@/redux/features/restaurant/order/orderApi";
import { toast } from "react-hot-toast";

type MenuModalProps = {
  tableId: number | string;
  onClose: () => void;
};

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export const MenuModal = ({ tableId, onClose }: MenuModalProps) => {
  const { data: itemsResponse, isLoading: itemsLoading } = useGetItemsQuery({ page: 1, limit: 100 });
  const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();
  
  const [cart, setCart] = useState<CartItem[]>([]);

  const items = itemsResponse?.data || [];

  const addToCart = (item: any) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => prev.map((i) => {
      if (i.id === itemId) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  const handleConfirmOrder = async () => {
    if (cart.length === 0) {
      toast.error("Please add items to order");
      return;
    }

    try {
      const orderData = {
        tableId: tableId,
        items: cart.map(item => ({
          itemId: item.id,
          quantity: item.quantity
        })),
        status: "PENDING"
      };

      await createOrder(orderData).unwrap();
      toast.success("Order confirmed!");
      setCart([]);
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to confirm order");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-0 sm:p-4 md:p-10">
      <div className="bg-white w-full h-full sm:h-[90vh] lg:h-full max-w-7xl sm:rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Modal Header */}
        <div className="px-6 py-4 md:px-10 md:py-8 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-[#0A2540] flex items-center gap-3">
              <span className="bg-slate-100 px-4 py-1 rounded-2xl text-lg font-bold">Table {tableId}</span>
              Menu
            </h2>
            <p className="text-gray-400 text-sm font-medium mt-1">Browse and select items to build order</p>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 cursor-pointer flex items-center justify-center rounded-2xl bg-gray-50 hover:bg-red-50 hover:text-red-500 transition-all text-gray-400"
          >
            <span className="text-3xl">&times;</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          {/* Left: Food Items Grid */}
          <div className="flex-[2.5] p-6 md:p-10 overflow-y-auto bg-gray-50/50">
            {itemsLoading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <Loader2 className="animate-spin text-slate-800" size={40} />
                <p className="text-gray-500 font-medium animate-pulse">Loading menu items...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {items.map((menu: any) => (
                  <div key={menu.id} onClick={() => addToCart(menu)} className="cursor-pointer transform transition-all active:scale-95">
                    <MenuItemCard
                      description={menu.description || "Fresh and delicious"}
                      image={menu.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60"}
                      name={menu.name}
                      price={menu.price}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="flex-1 bg-white p-6 md:p-10 flex flex-col border-t lg:border-t-0 lg:border-l border-gray-100 shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-black text-sm tracking-[0.2em] text-gray-400 uppercase">
                Current Order
              </h3>
              <span className="bg-slate-800 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                {cart.length} ITEMS
              </span>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-4">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div key={item.id} className="group">
                    <CurrentOrderItem
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                    />
                    <div className="flex items-center gap-3 mt-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded-md border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-white"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded-md border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-white"
                      >
                        +
                      </button>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-xs text-red-400 hover:text-red-600 font-bold"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-30">
                  <div className="w-16 h-16 bg-gray-100 rounded-full mb-4 flex items-center justify-center">
                    🍔
                  </div>
                  <p className="text-gray-500 font-bold">Your cart is empty</p>
                </div>
              )}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Total Amount</span>
                <span className="text-3xl font-black text-[#0A2540]">
                  ${calculateTotal()}
                </span>
              </div>

              <button 
                onClick={handleConfirmOrder}
                disabled={isCreatingOrder || cart.length === 0}
                className="w-full cursor-pointer bg-[#0A2540] hover:bg-[#0A2540]/90 text-white py-5 rounded-[2rem] font-black flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-xl shadow-slate-200 disabled:opacity-50 disabled:grayscale"
              >
                {isCreatingOrder ? (
                  <Loader2 className="animate-spin" size={24} />
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
