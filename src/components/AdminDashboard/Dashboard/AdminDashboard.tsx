import TenantsManagement from "../Tenants/TenantsManagement";
import DashboardCard from "./DashboardCard";
import InventoryDeletionRequests from "./InventoryDeletionRequests";
import SupportQueueDashboard from "./SupportQueueDashboard";
import TicketQueueDetails from "./TicketQueueDetails";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <DashboardCard />
      </div>
      <div>
        <TenantsManagement />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2  xl:grid-cols-3 gap-6">
        <div className="md:col-span-2 lg:col-span-1 xl:col-span-1">
          <InventoryDeletionRequests />
        </div>

        <div className=" md:col-span-2 lg:col-span-2 xl:col-span-2">
          <SupportQueueDashboard />
        </div>
      </div>
      <div>
        <TicketQueueDetails />
      </div>
      {/* <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2  xl:grid-cols-4 gap-6">
        <div className=" md:col-span-2 lg:col-span-2 xl:col-span-3">
          <RecentActivity />
        </div>

        <div className="md:col-span-2 lg:col-span-2 xl:col-span-1">
          <SystemHealth />
        </div>
      </div> */}
    </div>
  );
};

export default AdminDashboard;
