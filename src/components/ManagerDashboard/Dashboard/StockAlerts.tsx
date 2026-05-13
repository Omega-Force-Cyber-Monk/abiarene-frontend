import { useGetStockAlertsQuery } from "@/redux/features/manager/managerDashboardApi";
import { Loader2 } from "lucide-react";

const StockAlerts = () => {
  const { data: stockData, isLoading } = useGetStockAlertsQuery();

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-md w-full h-[300px] flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8 text-[#061E49]" />
      </div>
    );
  }

  const alerts = stockData?.data || [];

  return (
    <div className="bg-white rounded-2xl shadow-md w-full mx-auto min-h-[300px]">
      {/* Header */}
      <div className="p-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-700">Stock Alerts</h2>

        <span className="bg-purple-100 text-purple-600 text-sm font-semibold px-3 py-1 rounded-full">
          {alerts.length} Alerts
        </span>
      </div>

      {/* List */}
      <div className="p-4">
        <div className="space-y-3 max-h-[210px] overflow-y-auto pr-2">
          {alerts.length > 0 ? (
            alerts.map((item) => (
              <div
                key={item.id}
                className="relative flex justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
              >
                {/* LEFT SIDE CONTENT */}
                <div className="flex flex-col space-y-2 text-left">
                  <p className="text-sm font-semibold text-gray-700">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-400">Barcode: {item.barcode}</p>
                </div>

                {/* RIGHT SIDE CONTENT */}
                <div className="text-right space-y-1">
                  <p className="text-red-500 font-semibold text-sm">
                    {item.stock} left
                  </p>
                  <p className="text-xs text-[#067647] font-medium cursor-pointer hover:underline">
                    Restock
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-gray-400 text-sm">
              No stock alerts at the moment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockAlerts;

