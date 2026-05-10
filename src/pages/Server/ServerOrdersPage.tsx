import { useGetOrdersQuery } from "@/redux/features/restaurant/order/orderApi";
import { OrderTicketCard } from "./components/OrderTicketCard";
import { Loader2 } from "lucide-react";

const ServerOrdersPage = () => {
  const { data: ordersData, isLoading: isOrdersLoading } = useGetOrdersQuery({ page: 1, limit: 50 });
  const orders = ordersData?.data || [];

  return (
    <div className="pb-6 max-w-[1600px] mx-auto space-y-8">
      <header className="mb-8 space-y-1.5">
        <h1 className="text-3xl font-black text-[#0A2540]">Table Order Status</h1>
        <p className="text-gray-400 font-bold tracking-wide text-xs uppercase">
          Manage all active table orders and kitchen status
        </p>
      </header>

      {isOrdersLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-[#0A2540]" size={40} />
        </div>
      ) : orders.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {orders.map((order) => (
            <OrderTicketCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
          <p className="text-gray-500 font-medium">No active orders found right now.</p>
        </div>
      )}
    </div>
  );
};

export default ServerOrdersPage;
