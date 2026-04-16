// src/components/employees/StaffCard.tsx

import { Employee } from "@/redux/features/manager/managerEmployee/employee";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

interface StaffCardProps {
  user: Employee;
  onEdit: (user: Employee) => void;
  onDelete: (userId: string) => void;
}

const roleColors: Record<string, string> = {
  Manager: "bg-purple-100 text-purple-600",
  Server: "bg-blue-100 text-blue-600",
  Kitchen: "bg-orange-100 text-orange-600",
  Cashier: "bg-gray-200 text-gray-600",
};

const StaffCard = ({ user, onEdit, onDelete }: StaffCardProps) => {
  // Get role name from the role object
  const roleName = user.role?.name || "Unknown";

  // Get color based on role name
  const colorClass = roleColors[roleName] || "bg-gray-100 text-gray-600";

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition">
      {/* Top Section */}
      <div className="flex items-start justify-between">
        <div className="space-y-3 gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#061E49] to-[#0A2A66] flex items-center justify-center text-white font-semibold text-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 className="font-semibold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-400">PIN: **** (Hidden)</p>
          </div>
        </div>

        {/* Role Badge */}
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${colorClass}`}
        >
          {roleName}
        </span>
      </div>

      {/* Status Badge */}
      <div className="mt-2">
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${
            user.status === "ACTIVE"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {user.status}
        </span>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between mt-6">
        {/* Delete Button */}
        <button
          onClick={() => onDelete(user.id)}
          className="w-10 cursor-pointer h-10 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition"
        >
          <FaRegTrashAlt />
        </button>

        {/* Edit Button */}
        <button
          onClick={() => onEdit(user)}
          className="flex cursor-pointer items-center gap-2 px-5 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
        >
          <FiEdit />
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default StaffCard;
