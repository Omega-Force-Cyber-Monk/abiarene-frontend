import DashboardCard from "./DashboardCard";
import RecentActivity from "./RecentActivity";
import StockAlerts from "./StockAlerts";

const Dashboard = () => {
  return (
    <div className=" space-y-6">
      <div>
        <DashboardCard />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-1">
          <StockAlerts />
        </div>

        <div className="md:col-span-1">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
