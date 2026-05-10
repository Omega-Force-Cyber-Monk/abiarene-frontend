import { useState } from "react";
import { TableCard } from "./components/TableCard";
import { MenuModal } from "./components/MenuModal";
import { useGetTablesQuery } from "@/redux/features/restaurant/table/tableApi";
import { Loader2 } from "lucide-react";

const ServerDashboardPage = () => {
  const [selectedTableId, setSelectedTableId] = useState<number | string | null>(null);

  // API Hooks
  const { data: tablesData, isLoading: isTablesLoading } = useGetTablesQuery({ page: 1, limit: 100 });

  const tables = tablesData?.data || [];

  return (
    <div className="pb-6 max-w-[1600px] mx-auto space-y-12">
      {/* Table Map Section */}
      <section>
        <header className="mb-8 space-y-1.5">
          <h1 className="text-3xl font-black text-[#0A2540]">Table Map</h1>
          <p className="text-gray-400 font-bold tracking-wide text-xs uppercase">
            Select a table to start or modify an order
          </p>
        </header>

        {isTablesLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-[#0A2540]" size={40} />
          </div>
        ) : tables.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {tables.map((table) => (
              <div key={table.id} onClick={() => setSelectedTableId(table.id)}>
                <TableCard 
                  tableNumber={table.tableNumber}
                  seatCount={table.seatCount}
                  status={table.status}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
            <p className="text-gray-500 font-medium">No tables available right now.</p>
          </div>
        )}
      </section>

      {/* Menu Modal */}
      {selectedTableId && (
        <MenuModal
          tableId={selectedTableId as string}
          onClose={() => setSelectedTableId(null)}
        />
      )}
    </div>
  );
};

export default ServerDashboardPage;

