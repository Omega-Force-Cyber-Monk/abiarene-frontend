import { useGetOrdersQuery, useSendToKitchenMutation } from "@/redux/features/restaurant/order/orderApi";
import { Loader2, ChefHat, Clock, ChevronRight } from "lucide-react";
import { toast } from "react-hot-toast";

export const OrderList = () => {
  const { data: ordersResponse, isLoading, isError } = useGetOrdersQuery({ page: 1, limit: 50 });
  const [sendToKitchen, { isLoading: isSending }] = useSendToKitchenMutation();

  // Filter only confirmed/pending orders that are NOT yet in the kitchen
  // This logic depends on your backend status values. 
  // For now, I'm showing all orders that have 'PENDING' status.
  const pendingOrders = ordersResponse?.data?.filter((order: any) => order.status === "PENDING") || [];

  const handleSendToKitchen = async (orderId: string) => {
    try {
      await sendToKitchen(orderId).unwrap();
      toast.success("Order sent to kitchen!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send to kitchen");
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 h-full flex items-center justify-center">
        <Loader2 className="animate-spin text-slate-800" size={32} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-100/50 border border-gray-100 flex flex-col h-full sticky top-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-black text-[#0A2540]">Active Orders</h2>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">Confirmed by you</p>
        </div>
        <span className="bg-orange-100 text-orange-600 text-xs font-black px-3 py-1 rounded-full">
          {pendingOrders.length} PENDING
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 -mr-2 min-h-[400px]">
        {pendingOrders.length > 0 ? (
          pendingOrders.map((order: any) => (
            <div 
              key={order.id} 
              className="group bg-gray-50/50 hover:bg-white p-5 rounded-3xl border border-transparent hover:border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm text-lg font-bold text-slate-800">
                    {order.table?.tableNumber || "00"}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Table Order</h4>
                    <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase">
                      <Clock size={10} />
                      {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-800">${order.totalAmount || "0.00"}</p>
                  <p className="text-[10px] font-bold text-gray-400">{order.items?.length || 0} Items</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                <button 
                  onClick={() => handleSendToKitchen(order.id)}
                  disabled={isSending}
                  className="flex-1 bg-slate-800 hover:bg-slate-900 text-white text-[10px] font-black tracking-widest py-3 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSending ? (
                    <Loader2 className="animate-spin" size={14} />
                  ) : (
                    <>
                      <ChefHat size={14} />
                      SEND TO KITCHEN
                    </>
                  )}
                </button>
                <button className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-slate-800 transition-all">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-20">
            <div className="w-20 h-20 bg-gray-50 rounded-full mb-6 flex items-center justify-center text-3xl opacity-50 grayscale">
              📋
            </div>
            <p className="text-gray-400 font-bold text-sm">No pending orders to send</p>
            <p className="text-gray-300 text-xs mt-1">Confirmed orders will appear here</p>
          </div>
        )}
      </div>

      <div className="mt-8 pt-8 border-t border-gray-100">
        <button className="w-full py-4 text-gray-400 font-bold text-[10px] tracking-[0.2em] uppercase hover:text-slate-800 transition-all">
          View Order History
        </button>
      </div>
    </div>
  );
};
