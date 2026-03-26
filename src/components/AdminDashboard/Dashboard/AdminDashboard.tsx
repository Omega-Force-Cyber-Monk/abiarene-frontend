import DashboardCard from "./DashboardCard";
// import PlatformPricingControls from "./PlatformPricingControls";
// import QuickActions from "./QuickActions";
// import RecentActivity from "./RecentActivity";
// import SystemHealth from "./SystemHealth";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <DashboardCard />
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2  xl:grid-cols-4 gap-6">
      
        <div className=" md:col-span-2 lg:col-span-2 xl:col-span-3">
          <PlatformPricingControls />
        </div>

        
        <div className="md:col-span-2 lg:col-span-2 xl:col-span-1">
          <QuickActions />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2  xl:grid-cols-4 gap-6">
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
