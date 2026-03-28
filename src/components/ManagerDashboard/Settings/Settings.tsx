import CashierHub from "@/components/Cashier/CashierHub";
import AccountDetails from "./AccountDetails";
import DeviceActivation from "./DeviceActivation";

const Settings = () => {
  return (
    <div className="space-y-8">
      <AccountDetails />
      <DeviceActivation />
      <CashierHub />
    </div>
  );
};

export default Settings;
