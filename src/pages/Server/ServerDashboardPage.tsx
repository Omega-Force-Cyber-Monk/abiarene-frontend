import { useState } from "react";
import { TableCard } from "./components/TableCard";
import { tableData } from "./DammyData";
import { MenuModal } from "./components/MenuModal";

const ServerDashboardPage = () => {
  const [selectedTableId, setSelectedTableId] = useState<number | string | null>(null);

  return (
    <div className="pb-6">
      <header className="mb-8 space-y-1.5">
        <h1 className="text-3xl font-bold text-slate-800">Table Map</h1>
        <p className="text-gray-500 font-semibold tracking-wide text-sm uppercase">
          Select a table to start an order
        </p>
      </header>
      <div>
        {
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tableData.map((table) => (
              <div key={table.id} onClick={() => setSelectedTableId(table.id)}>
                <TableCard {...table} />
              </div>
            ))}
          </div>
        }
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
