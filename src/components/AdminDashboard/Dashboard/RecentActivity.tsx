import { CheckCircle, Flag, User } from "lucide-react";

const RecentActivity = () => {
  return (
    <div className="w-full ">
      {/* Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Recent Activity
        </h2>

        {/* Activity List */}
        <div className="space-y-4">
          {/* Item 1 */}
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-2 rounded-lg">
              <CheckCircle className="text-green-600 w-5 h-5" />
            </div>
            <p className="text-gray-700 text-sm">
              Conversation completed: #sess-1
            </p>
          </div>

          {/* Item 2 */}
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-2 rounded-lg">
              <Flag className="text-red-500 w-5 h-5" />
            </div>
            <p className="text-gray-700 text-sm">
              New report: Inappropriate behavior
            </p>
          </div>

          {/* Item 3 */}
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-2 rounded-lg">
              <Flag className="text-red-500 w-5 h-5" />
            </div>
            <p className="text-gray-700 text-sm">New report: Spam messages</p>
          </div>

          {/* Item 4 */}
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <User className="text-blue-500 w-5 h-5" />
            </div>
            <p className="text-gray-700 text-sm">New user: Sarah Jenkins</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
