import { TableCard } from "./components/TableCard";
import { tableData } from "./DammyData";

const ServerDashboardPage = () => {
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
          <TableCard 
            key={table.id}
            id={table.id}
            capacity={table.capacity}
            status={table.status}
            subStatus={table.subStatus}
          />
        ))}
      </div>
        }
      </div>
    </div>
  );
};

export default ServerDashboardPage;
