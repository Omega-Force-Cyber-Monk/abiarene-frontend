import { useState } from "react";
import { TableCard } from "./components/TableCard";
import { MenuModal } from "./components/MenuModal";
import { OrderList } from "./components/OrderList";
import { useGetTablesQuery } from "@/redux/features/restaurant/table/tableApi";

const ServerDashboardPage = () => {
  const [selectedTableId, setSelectedTableId] = useState<number | string | null>(null);
  
  const { data: tablesResponse, isLoading, isError, refetch } = useGetTablesQuery({ page: 1, limit: 50 });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 bg-red-50 rounded-2xl border border-red-100">
        <p className="text-red-600 font-medium">Failed to load tables.</p>
        <button 
          onClick={() => refetch()}
          className="mt-4 px-6 py-2 bg-slate-800 text-white rounded-full text-sm font-semibold hover:bg-slate-900 transition-all"
        >
          Retry
        </button>
      </div>
    );
  }

  const tables = tablesResponse?.data || [];

  return (
    <div className="pb-10 flex flex-col xl:flex-row gap-10">
      {/* Left: Table Map */}
      <div className="flex-[2]">
        <header className="mb-8 space-y-1.5">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Table Map</h1>
          <p className="text-gray-400 font-semibold tracking-widest text-[10px] uppercase">
            Select a table to start a new order
          </p>
        </header>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tables.length > 0 ? (
            tables.map((table) => (
              <div key={table.id} onClick={() => setSelectedTableId(table.id)}>
                <TableCard 
                  id={table.tableNumber}
                  capacity={table.seatCount}
                  status={table.status as any}
                  subStatus={null}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-gray-50 rounded-[2.5rem] border border-dashed border-gray-200">
              <p className="text-gray-400 font-medium">No tables available.</p>
            </div>
          )}
        </div>
      </div>

      {/* Right: Confirmed Orders List */}
      <div className="flex-1">
        <OrderList />
      </div>

      {selectedTableId && (
        <MenuModal 
          tableId={selectedTableId} 
          onClose={() => setSelectedTableId(null)} 
        />
      )}
    </div>
  );
};

export default ServerDashboardPage;
