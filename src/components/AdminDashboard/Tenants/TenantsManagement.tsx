import { useState } from "react";

import { CiSearch } from "react-icons/ci";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const TenantsManagement = () => {
  // const [, setIsDialogOpen] = useState(false);
  // const [, setSelectedUser] = useState<any>(null);
  const navigate = useNavigate();

  const [users] = useState([
    {
      id: "USR-001",
      name: "John Smith",
      industry: "Supermarket",
      status: "active",
      subscription: "$199.99/mo",
    },
    {
      id: "USR-002",
      name: "Sarah Johnson",
      industry: "Restaurant",
      status: "active",
      subscription: "$149.99/mo",
    },
    {
      id: "USR-003",
      name: "Michael Chen",
      industry: "Ear",
      status: "active",
      subscription: "$99.99/mo",
    },
    {
      id: "USR-004",
      name: "Emily Rodriguez",
      industry: "Merchant",
      status: "suspended",
      subscription: "$199.99/mo",
    },
    {
      id: "USR-005",
      name: "David Kim",
      industry: "Retail",
      status: "suspended",
      subscription: "$129.99/mo",
    },
    {
      id: "USR-006",
      name: "Lisa Thompson",
      industry: "Retail",
      status: "active",
      subscription: "$249.99/mo",
    },
  ]);

  // const openDialog = (user: any) => {
  //   setSelectedUser(user);
  //   setIsDialogOpen(true);
  // };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-[#EDE6F4] text-[#6D2C93]";
      case "suspended":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 shadow-2xl  rounded-3xl">
      {/* Search + Add Button Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex-1 w-full sm:max-w-md">
          <div className="relative w-full hidden md:block">
            <input
              type="text"
              placeholder="Search by name"
              className="w-full pl-10 pr-3 py-3 shadow-2xl  rounded-full outline-none focus:ring-2 focus:ring-blue-400"
            />
            <CiSearch className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <button className=" cursor-pointer text-base font-semibold text-[#08163B]">
          View all
        </button>
      </div>

      {/* Table */}
      <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4 gap-5">
        <div className="xl:col-span-4 w-full">
          <div className="w-full overflow-x-auto bg-white rounded-xl shadow-sm ">
            <table className="min-w-[800px] w-full text-sm">
              <thead className="border-b border-[#DBE0E5] bg-[#F8F8F8]">
                <tr>
                  <th className="px-6 py-4 text-left text-[#6A6A65] text-base font-semibold">
                    Business Name
                  </th>
                  <th className="px-6 py-4 text-left text-[#6A6A65] text-base font-semibold">
                    Industry
                  </th>
                  <th className="px-6 py-4 text-left text-[#6A6A65] text-base font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-[#6A6A65] text-base font-semibold">
                    Subscriptions
                  </th>
                  <th className="px-6 py-4 text-center text-[#6A6A65] text-base font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-5">
                      <div className="font-semibold text-gray-900 whitespace-nowrap">
                        {user.name}
                      </div>
                    </td>
                    {/* <td className="px-6 py-5 text-gray-700 whitespace-nowrap">
                      {user.industry}
                    </td> */}
                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium `}
                      >
                        {user.industry}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadge(user.status)}`}
                      >
                        {user.status.charAt(0).toUpperCase() +
                          user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-5"> {user.subscription}</td>

                    <td className="px-6 py-5 text-right">
                      <button
                        // onClick={() => openDialog(user)}
                        onClick={() =>
                          navigate(`/admin-dashboard/tenants/${user.id}`)
                        }
                        className=" cursor-pointer"
                      >
                        <FaAngleRight className="text-[#A4A7AE]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between px-2 sm:px-4 py-3">
        <div className="text-sm text-gray-600">
          Showing <span className="font-medium">{users.length}</span> of{" "}
          <span className="font-medium">20</span> users
        </div>
        <div className="flex items-center gap-2">
          <button className="cursor-pointer rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100">
            Prev
          </button>
          <div className="min-w-[50px] rounded-md border border-[#E3E3E4] bg-gray-50 px-3 py-1.5 text-center text-sm font-medium text-gray-700 shadow-sm">
            1 / 5
          </div>
          <button className="cursor-pointer rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenantsManagement;
