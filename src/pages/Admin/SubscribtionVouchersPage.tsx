import SectionTitle from "@/common/SectionTitle";
import SubscriptionManagement from "@/components/AdminDashboard/Subscribtion/SubscriptionManagement";
import SubscriptionVouchersTable from "@/components/AdminDashboard/SubscriptionVoucher/SubscriptionVouchersTable";

const SubscriptionVouchersPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <div>
          {" "}
          <SubscriptionManagement />
        </div>
      </div>

      <div>
        <div>
          <SubscriptionVouchersTable />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionVouchersPage;
