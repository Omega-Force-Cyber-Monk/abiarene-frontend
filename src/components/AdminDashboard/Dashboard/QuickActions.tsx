import { MdOutlinePrivacyTip } from "react-icons/md";

const QuickActions = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm h-full w-full max-auto border border-gray-100">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-700 mb-5">
        Quick Actions
      </h2>

      {/* Actions Grid */}
      <div className="grid grid-cols-2 gap-4 ">
        {/* Action 1 */}
        <div className="flex flex-col items-center justify-center text-center gap-2 bg-[#F7F3FA] border border-purple-300 p-4 rounded-xl cursor-pointer hover:shadow-md hover:scale-[1.02] transition">
          <MdOutlinePrivacyTip className="text-purple-700 text-3xl" />
          <p className="text-sm font-medium text-gray-700">Moderation Queue</p>
        </div>

        {/* Action 2 */}
        <div className="flex flex-col items-center justify-center text-center gap-2 bg-[#F7F3FA] border border-purple-300 p-4 rounded-xl cursor-pointer hover:shadow-md hover:scale-[1.02] transition">
          <MdOutlinePrivacyTip className="text-purple-700 text-3xl" />
          <p className="text-sm font-medium text-gray-700">Manage Users</p>
        </div>

        {/* Action 3 */}
        <div className="flex flex-col items-center justify-center text-center gap-2 bg-[#F7F3FA] border border-purple-300 p-4 rounded-xl cursor-pointer hover:shadow-md hover:scale-[1.02] transition col-span-2">
          <MdOutlinePrivacyTip className="text-purple-700 text-3xl" />
          <p className="text-sm font-medium text-gray-700">System Config</p>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
