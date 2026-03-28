import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import AddEmployeeDialog from "./AddEmployeeDialog";

type User = {
  id: number;
  name: string;
  role: string;
  image: string;
};

const users: User[] = [
  {
    id: 1,
    name: "Sarah",
    role: "Manager",
    image: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: 2,
    name: "John",
    role: "Server",
    image: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: 3,
    name: "Mick",
    role: "Kitchen",
    image: "https://i.pravatar.cc/100?img=3",
  },
  {
    id: 4,
    name: "Olly Schroeder",
    role: "Cashier",
    image: "https://i.pravatar.cc/100?img=4",
  },
];

const roleColors: Record<string, string> = {
  Manager: "bg-purple-100 text-purple-600",
  Server: "bg-blue-100 text-blue-600",
  Kitchen: "bg-orange-100 text-orange-600",
  Cashier: "bg-gray-200 text-gray-600",
};

const StaffCard = ({ user }: { user: User }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition">
      {/* Top Section */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={user.image}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover"
          />

          <div>
            <h2 className="font-semibold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-400">PIN: **** (Hidden)</p>
          </div>
        </div>

        {/* Role Badge */}
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${roleColors[user.role]}`}
        >
          {user.role}
        </span>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between mt-6">
        {/* Delete Button */}
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition">
          <FaRegTrashAlt />
        </button>

        {/* Edit Button */}
        <button className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
          <FiEdit />
          Edit Profile
        </button>
      </div>
    </div>
  );
};

const EmployeesCard = () => {
  return (
    <div>
      <div>
        <AddEmployeeDialog />
      </div>
      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <StaffCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeesCard;
