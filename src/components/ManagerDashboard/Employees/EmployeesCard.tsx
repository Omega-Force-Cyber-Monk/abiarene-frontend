import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { IoIosSave, IoMdClose } from "react-icons/io";
import AddEmployeeDialog from "./AddEmployeeDialog";

type User = {
  id: number;
  name: string;
  role: string;
  image: string;
  pin?: string;
};

const users: User[] = [
  {
    id: 1,
    name: "Sarah",
    role: "Manager",
    image: "https://i.pravatar.cc/100?img=1",
    pin: "1234",
  },
  {
    id: 2,
    name: "John",
    role: "Server",
    image: "https://i.pravatar.cc/100?img=2",
    pin: "2345",
  },
  {
    id: 3,
    name: "Mick",
    role: "Kitchen",
    image: "https://i.pravatar.cc/100?img=3",
    pin: "3456",
  },
  {
    id: 4,
    name: "Olly Schroeder",
    role: "Cashier",
    image: "https://i.pravatar.cc/100?img=4",
    pin: "4567",
  },
  {
    id: 5,
    name: "Emily Watson",
    role: "Server",
    image: "https://i.pravatar.cc/100?img=5",
    pin: "5678",
  },
  {
    id: 6,
    name: "David Khan",
    role: "Manager",
    image: "https://i.pravatar.cc/100?img=6",
    pin: "6789",
  },
  {
    id: 7,
    name: "Ayaan Rahman",
    role: "Kitchen",
    image: "https://i.pravatar.cc/100?img=7",
    pin: "7890",
  },
  {
    id: 8,
    name: "Sophia Lee",
    role: "Cashier",
    image: "https://i.pravatar.cc/100?img=8",
    pin: "8901",
  },

  // ---- extra users ----
  {
    id: 9,
    name: "Michael Brown",
    role: "Server",
    image: "https://i.pravatar.cc/100?img=9",
    pin: "9012",
  },
  {
    id: 10,
    name: "Isabella Ahmed",
    role: "Manager",
    image: "https://i.pravatar.cc/100?img=10",
    pin: "1122",
  },
  {
    id: 11,
    name: "Daniel Roy",
    role: "Kitchen",
    image: "https://i.pravatar.cc/100?img=11",
    pin: "2233",
  },
  {
    id: 12,
    name: "Emma Johnson",
    role: "Cashier",
    image: "https://i.pravatar.cc/100?img=12",
    pin: "3344",
  },
  {
    id: 13,
    name: "Liam Smith",
    role: "Server",
    image: "https://i.pravatar.cc/100?img=13",
    pin: "4455",
  },
  {
    id: 14,
    name: "Nora Hossain",
    role: "Kitchen",
    image: "https://i.pravatar.cc/100?img=14",
    pin: "5566",
  },
  {
    id: 15,
    name: "James Wilson",
    role: "Manager",
    image: "https://i.pravatar.cc/100?img=15",
    pin: "6677",
  },
  {
    id: 16,
    name: "Olivia Martinez",
    role: "Cashier",
    image: "https://i.pravatar.cc/100?img=16",
    pin: "7788",
  },
];

const roleColors: Record<string, string> = {
  Manager: "bg-purple-100 text-purple-600",
  Server: "bg-blue-100 text-blue-600",
  Kitchen: "bg-orange-100 text-orange-600",
  Cashier: "bg-gray-200 text-gray-600",
};

// Edit Employee Dialog Component
const EditEmployeeDialog = ({
  user,
  isOpen,
  onClose,
  onUpdate,
}: {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedUser: User) => void;
}) => {
  const [formData, setFormData] = useState({
    name: user.name,
    role: user.role,
    pin: user.pin || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      ...user,
      name: formData.name,
      role: formData.role,
      pin: formData.pin,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex bg-black/50 backdrop-blur-[0.2px] bg-opacity-50 items-center justify-center bg-opacity-50">
      <div className="bg-[#FFF7EC] rounded-2xl shadow-xl p-6 w-full max-w-2xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 border-b border-[#C6CAD1] pb-2">
          <h2 className="text-lg font-semibold text-gray-800">
            Edit Employee Profile
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 cursor-pointer hover:text-red-500"
          >
            <IoMdClose size={22} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-[#6C7787]">Employee Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g. John Doe"
                className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
                required
              />
            </div>

            <div>
              <label className="text-sm text-[#6C7787]">System Role</label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
                required
              >
                <option value="Manager">Manager</option>
                <option value="Server">Server</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Cashier">Cashier</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-[#6C7787]">
                Quick-Login PIN (4 digits)
              </label>
              <input
                type="number"
                value={formData.pin}
                onChange={(e) =>
                  setFormData({ ...formData, pin: e.target.value })
                }
                placeholder="Enter 4-digit PIN"
                className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
                minLength={4}
                maxLength={4}
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end items-center gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 text-[#684F1A] border-[#684F1A] cursor-pointer py-2 rounded-full border text-base font-medium hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex cursor-pointer items-center gap-2 px-6 py-2.5 rounded-full bg-[#061E49] text-white text-sm font-medium shadow-sm hover:bg-[#0A2A66] transition-all duration-200"
            >
              <IoIosSave className="text-lg" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const StaffCard = ({
  user,
  onEdit,
  onDelete,
}: {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition">
      {/* Top Section */}
      <div className="flex items-start justify-between">
        <div className="space-y-3 gap-3">
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

const EmployeesCard = () => {
  const [employees, setEmployees] = useState<User[]>(users);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdate = (updatedUser: User) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === updatedUser.id ? updatedUser : emp,
      ),
    );
  };

  const handleDelete = (userId: number) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees((prevEmployees) =>
        prevEmployees.filter((emp) => emp.id !== userId),
      );
    }
  };

  const handleAddEmployee = (newEmployee: User) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  return (
    <div>
      <div>
        <AddEmployeeDialog onAddEmployee={handleAddEmployee} />
      </div>
      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {employees.map((user) => (
            <StaffCard
              key={user.id}
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      {/* Edit Dialog */}
      {editingUser && (
        <EditEmployeeDialog
          user={editingUser}
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default EmployeesCard;

// import { FaRegTrashAlt } from "react-icons/fa";
// import { FiEdit } from "react-icons/fi";
// import AddEmployeeDialog from "./AddEmployeeDialog";

// type User = {
//   id: number;
//   name: string;
//   role: string;
//   image: string;
// };

// const users: User[] = [
//   {
//     id: 1,
//     name: "Sarah",
//     role: "Manager",
//     image: "https://i.pravatar.cc/100?img=1",
//   },
//   {
//     id: 2,
//     name: "John",
//     role: "Server",
//     image: "https://i.pravatar.cc/100?img=2",
//   },
//   {
//     id: 3,
//     name: "Mick",
//     role: "Kitchen",
//     image: "https://i.pravatar.cc/100?img=3",
//   },
//   {
//     id: 4,
//     name: "Olly Schroeder",
//     role: "Cashier",
//     image: "https://i.pravatar.cc/100?img=4",
//   },

//   // new 4 users
//   {
//     id: 5,
//     name: "Emily Watson",
//     role: "Server",
//     image: "https://i.pravatar.cc/100?img=5",
//   },
//   {
//     id: 6,
//     name: "David Khan",
//     role: "Manager",
//     image: "https://i.pravatar.cc/100?img=6",
//   },
//   {
//     id: 7,
//     name: "Ayaan Rahman",
//     role: "Kitchen",
//     image: "https://i.pravatar.cc/100?img=7",
//   },
//   {
//     id: 8,
//     name: "Sophia Lee",
//     role: "Cashier",
//     image: "https://i.pravatar.cc/100?img=8",
//   },
// ];

// const roleColors: Record<string, string> = {
//   Manager: "bg-purple-100 text-purple-600",
//   Server: "bg-blue-100 text-blue-600",
//   Kitchen: "bg-orange-100 text-orange-600",
//   Cashier: "bg-gray-200 text-gray-600",
// };

// const StaffCard = ({ user }: { user: User }) => {
//   return (
//     <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition">
//       {/* Top Section */}
//       <div className="flex items-start justify-between">
//         <div className="space-y-3 gap-3">
//           <img
//             src={user.image}
//             alt={user.name}
//             className="w-12 h-12 rounded-full object-cover"
//           />

//           <div>
//             <h2 className="font-semibold text-gray-800">{user.name}</h2>
//             <p className="text-sm text-gray-400">PIN: **** (Hidden)</p>
//           </div>
//         </div>

//         {/* Role Badge */}
//         <span
//           className={`text-xs px-3 py-1 rounded-full font-medium ${roleColors[user.role]}`}
//         >
//           {user.role}
//         </span>
//       </div>

//       {/* Bottom Section */}
//       <div className="flex items-center justify-between mt-6">
//         {/* Delete Button */}
//         <button className="w-10 cursor-pointer h-10 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition">
//           <FaRegTrashAlt />
//         </button>

//         {/* Edit Button */}
//         <button className="flex cursor-pointer items-center gap-2 px-5 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
//           <FiEdit />
//           Edit Profile
//         </button>
//       </div>
//     </div>
//   );
// };

// const EmployeesCard = () => {
//   return (
//     <div>
//       <div>
//         <AddEmployeeDialog />
//       </div>
//       <div className="mt-6">
//         <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
//           {users.map((user) => (
//             <StaffCard key={user.id} user={user} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeesCard;
