// import { useState } from "react";

interface SecurityAccessProps {
  onPasswordChange?: () => void;
}

const SecurityAccess = ({ onPasswordChange }: SecurityAccessProps) => {
  //   const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  return (
    <div className="w-full p-6 bg-white rounded-xl border border-[#EFEEEE] shadow-lg sm:p-4 md:p-6">
      {/* Header */}
      <h2 className="mb-4 text-base font-semibold text-gray-900">
        Security & Access
      </h2>

      {/* Two-Factor Authentication Row */}
      <div className=" ">
        <div className="space-y-4">
          {/* Global Platform Commission */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Global Platform Commission (%)
            </label>
            <input
              type="number"
              name="globalPlatformCommission"
              placeholder="20"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 focus:outline-none focus:border-[#79029C] focus:ring-1 focus:ring-[#79029C] transition-all duration-200"
            />
          </div>

          {/* Minimum Withdrawal Amount */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Minimum Withdrawal Amount (%)
            </label>
            <input
              type="number"
              name="minimumWithdrawalAmount"
              placeholder="50"
              className=" w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 focus:outline-none focus:border-[#79029C] focus:ring-1 focus:ring-[#79029C] transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={onPasswordChange}
          type="button"
          className="w-full cursor-pointer px-4 py-2 text-base font-medium  text-[#3F0193] border border-[#3F0193] rounded-xl  bg-white hover:bg-[#f3e8ff] transition shadow-sm hover:shadow-md"
        >
          Change Password
        </button>

        <button
          type="button"
          className="w-full cursor-pointer px-4 py-2 text-base font-medium  text-[#3F0193] border border-[#3F0193] rounded-xl  bg-white hover:bg-[#f3e8ff] transition shadow-sm hover:shadow-md"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SecurityAccess;
