// components/TenantSubscription.tsx

import phone from "@/assets/primepos/logo/phone.png";
import { useGetTenantSubscriptionQuery } from "@/redux/features/manager/settings/settingApi";
import { format } from "date-fns"; // Install: npm install date-fns

const TenantSubscription = () => {
  const {
    data: subscriptionData,
    isLoading,
    isError,
    refetch,
  } = useGetTenantSubscriptionQuery();

  if (isLoading) {
    return (
      <div className="space-y-4 p-6 bg-gray-300 rounded-2xl">
        <div className="text-center">Loading subscription details...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4 p-6 bg-gray-300 rounded-2xl">
        <div className="text-center text-red-500">
          Failed to load subscription details. Please try again.
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "text-green-700 bg-green-50 border-green-200";
      case "INACTIVE":
        return "text-gray-700 bg-gray-50 border-gray-200";
      case "EXPIRED":
        return "text-red-700 bg-red-50 border-red-200";
      case "CANCELLED":
        return "text-yellow-700 bg-yellow-50 border-yellow-200";
      default:
        return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const subscriptionEndDate = subscriptionData?.subscription?.endAt;
  const daysRemaining = subscriptionEndDate
    ? getDaysRemaining(subscriptionEndDate)
    : 0;
  const isExpiringSoon = daysRemaining <= 7 && daysRemaining > 0;

  return (
    <div className="space-y-4 p-6 bg-[#e6e7eb] rounded-2xl">
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center space-x-3">
          <div>
            <img src={phone} alt="Device" />
          </div>
          <div>
            <h2 className="mb-2 font-semibold">
              <h3 className="font-semibold mb-3">Subscription Details</h3>
            </h2>
            {/* <p>Turn this into a POS terminal.</p> */}
          </div>
        </div>
        {/* <div>
          <span
            className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(
              subscriptionData?.subscription?.status || "INACTIVE",
            )}`}
          >
            {subscriptionData?.subscription?.status || "INACTIVE"}
          </span>
        </div> */}
      </div>

      {/* <div>
        <p>
          Your device is currently registered as{" "}
          <span className="font-semibold ml-1">
            RENE-POS-{Math.floor(Math.random() * 10000)}
          </span>
          . You can accept orders and process payments directly on this screen.
          No extra card reader required.
        </p>
      </div> */}

      {/* Subscription Details */}
      <div className="border-t border-gray-400 pt-4 mt-2">
        {/* <h3 className="font-semibold mb-3">Subscription Details</h3> */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Business Name:</span>
            <span className="font-medium">
              {subscriptionData?.tenant?.name || "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Subscription Fee:</span>
            <span className="font-medium">
              ${subscriptionData?.subscription?.fee || 0}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Start Date:</span>
            <span className="font-medium">
              {formatDate(subscriptionData?.subscription?.startAt || "")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">End Date:</span>
            <span className="font-medium">
              {formatDate(subscriptionData?.subscription?.endAt || "")}
            </span>
          </div>
          {daysRemaining > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Days Remaining:</span>
              <span
                className={`font-medium ${isExpiringSoon ? "text-orange-600" : ""}`}
              >
                {daysRemaining} days
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Payment Options */}
      {subscriptionData?.paymentOptions &&
        subscriptionData.paymentOptions.length > 0 && (
          <div className="border-t border-gray-400 pt-4">
            <h3 className="font-semibold mb-2">Payment Options</h3>
            <div className="flex flex-wrap gap-2">
              {subscriptionData.paymentOptions.map((option) => (
                <span
                  key={option.provider}
                  className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                    option.configured
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {option.label}
                  {option.configured ? " ✓" : " (Not Configured)"}
                </span>
              ))}
            </div>
          </div>
        )}

      {/* Requires Payment Warning */}
      {subscriptionData?.subscription?.requiresPayment && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-sm text-yellow-800">
            ⚠️ Payment required to continue using the service. Please make a
            payment before the subscription expires.
          </p>
        </div>
      )}

      <div>
        <h3 className="font-semibold">Deactivate This Device</h3>
        <p className="text-sm text-gray-600 mt-1">
          Deactivating will remove this device from your account and stop all
          POS functionality.
        </p>
      </div>
    </div>
  );
};

export default TenantSubscription;

// import phone from "@/assets/primepos/logo/phone.png";

// const TanentSubscribtion = () => {
//   return (
//     <div className=" space-y-4 p-6 bg-gray-300 rounded-2xl">
//       <div className=" flex justify-between items-center ">
//         <div className=" flex justify-between items-center space-x-3">
//           <div>
//             <img src={phone} alt="" />
//           </div>
//           <div className="">
//             <h2 className="mb-2 font-semibold">Device Activation</h2>
//             <p>Turn this into a POS terminal.</p>
//           </div>
//         </div>
//         <div>
//           <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-full">
//             Active
//           </span>
//         </div>
//       </div>
//       <div>
//         <p>
//           Your device is currently registered as
//           <span className=" font-semibold ml-1">RENE-POS-8821</span>. You can
//           accept orders and process payments directly on this screen. No extra
//           card reader required.
//         </p>
//       </div>
//       <div>
//         <h3 className=" font-semibold">Deactivate This Device</h3>
//       </div>
//     </div>
//   );
// };

// export default TanentSubscribtion;
