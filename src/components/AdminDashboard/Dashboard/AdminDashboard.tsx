import TenantsManagement from "../Tenants/TenantsManagement";
import DashboardCard from "./DashboardCard";
import SupportQueueDashboard from "./SupportQueueDashboard";
import { SectionErrorBoundary } from "../Shared/SectionErrorBoundary";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <SectionErrorBoundary fallbackTitle="Overview Cards Unavailable">
        <DashboardCard />
      </SectionErrorBoundary>
      <SectionErrorBoundary fallbackTitle="Tenants Management Unavailable">
        <TenantsManagement />
      </SectionErrorBoundary>
      <SectionErrorBoundary fallbackTitle="Support Queue Unavailable">
        <SupportQueueDashboard />
      </SectionErrorBoundary>
    </div>
  );
};

export default AdminDashboard;

