import React, { useState, useEffect } from "react";
import { ChevronDown, Send } from "lucide-react";
import toast from "react-hot-toast";
import {
  useUpdateOrderMutation,
  useCancelOrderMutation,
  useSendToKitchenMutation
} from "@/redux/features/restaurant/order/orderApi";

interface OrderItem {
  id: string;
  quantity: number;
  notes: string;
  selectedOptions: string[];
  item: {
    name: string;
    category: string;
    price: number;
  };
}

interface OrderProps {
  order: {
    id: string;
    status: string;
    createdAt: string;
    table: {
      tableNumber: number;
    };
    items: OrderItem[];
    ticket?: {
      ticketCode: string;
    } | null;
  };
}

export const OrderTicketCard: React.FC<OrderProps> = ({ order }) => {
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();
  const [cancelOrder, { isLoading: isCanceling }] = useCancelOrderMutation();
  const [sendToKitchen, { isLoading: isSending }] = useSendToKitchenMutation();

  const [currentStatus, setCurrentStatus] = useState(order.status);

  // Sync local state if order prop changes (e.g., from refetch after mutation)
  useEffect(() => {
    setCurrentStatus(order.status);
  }, [order.status]);

  // Format time (e.g., "13:41")
  const orderTime = new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  // Generate a short ID if ticket is null
  const shortId = order.ticket?.ticketCode || order.id.substring(0, 8);

  const handleStatusChange = async (newStatus: string) => {
    try {
      if (newStatus === "CANCELLED") {
        await cancelOrder(order.id).unwrap();
        toast.success("Order cancelled");
      } else {
        await updateOrder({ id: order.id, data: { status: newStatus } }).unwrap();
        toast.success(`Status changed to ${newStatus}`);
      }
      setCurrentStatus(newStatus);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update status");
      setCurrentStatus(order.status); // revert on failure
    }
  };

  const handleSendToKitchen = async () => {
    try {
      await sendToKitchen(order.id).unwrap();
      setCurrentStatus("PREPARING");
      toast.success("Order sent to kitchen!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send to kitchen");
    }
  };

  const isConfirmed = currentStatus === "CONFIRMED";
  const isCancelled = currentStatus === "CANCELLED";
  const isPreparing = currentStatus === "PREPARING";

  return (
    <div className="bg-[#EBECEE] rounded-[24px] p-6 flex flex-col w-full min-w-[280px] max-w-[320px] shadow-sm relative">
      {/* Top Section */}
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
          <span className="font-bold text-gray-700">{order.table?.tableNumber || "?"}</span>
        </div>

        {/* Status Badge */}
        <div className={`px-3 py-1 rounded-full border text-xs font-semibold ${isCancelled ? "border-red-200 text-red-500 bg-red-50/50" :
            "border-green-200 text-green-600 bg-green-50/50"
          }`}>
          {currentStatus.charAt(0) + currentStatus.slice(1).toLowerCase()}
        </div>
      </div>

      <div className="space-y-1 mb-4">
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">IN: {orderTime}</p>
        <p className="text-sm font-medium text-gray-600">Ticket ID: {shortId}</p>
      </div>

      {/* Change Status Dropdown */}
      <div className="mb-4">
        <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
          Change Status
        </label>
        <div className="relative">
          <select
            value={currentStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={isUpdating || isCanceling}
            className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#061E49]/20 transition-all cursor-pointer disabled:opacity-50"
          >
            <option value="CONFIRMED">Confirmed</option>
            <option value="PREPARING">Preparing</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-dashed border-gray-300 my-4" />

      {/* Items List */}
      <div className="flex-1 space-y-4">
        {order.items.map((orderItem) => (
          <div key={orderItem.id} className="flex flex-col">
            <div className="flex gap-2">
              <span className="font-bold text-gray-800">{orderItem.quantity}</span>
              <span className="font-bold text-gray-800 uppercase tracking-wide">{orderItem.item.name}</span>
            </div>

            {/* Options & Notes */}
            <div className="pl-4 mt-1 space-y-1">
              {orderItem.selectedOptions?.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                  <span className="w-1 h-1 bg-gray-400 rounded-full" />
                  {opt}
                </div>
              ))}
              {orderItem.notes && (
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                  <span className="w-1 h-1 bg-gray-400 rounded-full" />
                  Note: {orderItem.notes}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Action Area */}
      <div className="mt-6 pt-4 border-t border-dashed border-gray-300">
        {isCancelled ? (
          <div className="text-center py-2">
            <span className="text-sm font-bold text-gray-400">Cancelled</span>
          </div>
        ) : isPreparing ? (
          <div className="text-center py-2">
            <span className="text-[13px] font-bold text-green-500 uppercase tracking-wider">
              Take it from kitchen...
            </span>
          </div>
        ) : (
          <button
            onClick={handleSendToKitchen}
            disabled={isSending || !isConfirmed}
            className="w-full bg-[#061E49] hover:bg-[#0A2540] text-white py-3.5 rounded-full flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <span className="font-semibold text-sm">Send to kitchen</span>
            <Send size={16} />
          </button>
        )}
      </div>
    </div>
  );
};
