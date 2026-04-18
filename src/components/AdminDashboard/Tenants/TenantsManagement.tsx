import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  useGetTenantsQuery,
  // useDeleteTenantMutation,
} from "@/redux/features/admin/adminTenant/adminTenantApi";
import { Tenant } from "@/redux/features/admin/adminTenant/adminTenant.types";
// import { toast } from "sonner";
import Loader from "../Shared/Loader";

const TenantsManagement = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading, error } = useGetTenantsQuery({
    page,
    limit: 10,
    search: searchTerm,
  });

  // const [deleteTenant] = useDeleteTenantMutation();

  const tenants = data?.data || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / 10);

  const handleSearch = () => {
    setSearchTerm(searchInput);
    setPage(1);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // const handleDelete = async (id: string, name: string) => {
  //   if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
  //     try {
  //       await deleteTenant(id).unwrap();
  //       toast.success("Tenant deleted successfully");
  //       refetch();
  //     } catch (err) {
  //       toast.error("Failed to delete tenant");
  //       console.error(err);
  //     }
  //   }
  // };

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-[#EDE6F4] text-[#6D2C93]";
      case "inactive":
        return "bg-gray-100 text-gray-700";
      case "suspended":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 shadow-2xl rounded-3xl">
        <div className="text-center text-red-600">
          Error loading tenants. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 shadow-2xl rounded-3xl">
      {/* Search + Add Button Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex-1 w-full sm:max-w-md">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search by business name"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pl-10 pr-3 py-3 shadow-sm rounded-full outline-none focus:ring-2 focus:ring-[#052350] border border-gray-200"
            />
            <CiSearch
              onClick={handleSearch}
              className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
            />
          </div>
        </div>

        {/* <button
          onClick={() => navigate("/admin-dashboard/tenants/new")}
          className="cursor-pointer text-base font-semibold text-white bg-[#052350] px-6 py-2 rounded-full hover:bg-[#061E49] transition"
        >
          + New Business
        </button> */}
      </div>

      {/* Table */}
      <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4 gap-5">
        <div className="xl:col-span-4 w-full">
          <div className="w-full overflow-x-auto bg-white rounded-xl shadow-sm">
            <table className="min-w-[800px] w-full text-sm">
              <thead className="border-b border-[#DBE0E5] bg-[#F8F8F8]">
                <tr>
                  <th className="px-6 py-4 text-left whitespace-nowrap text-[#6A6A65] text-base font-semibold">
                    Business Name
                  </th>
                  <th className="px-6 py-4 text-left text-[#6A6A65] text-base font-semibold">
                    Industry
                  </th>
                  <th className="px-6 py-4 text-left text-[#6A6A65] text-base font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left whitespace-nowrap text-[#6A6A65] text-base font-semibold">
                    Subscription Fee
                  </th>
                  <th className="px-6 py-4 text-left whitespace-nowrap text-[#6A6A65] text-base font-semibold">
                    Last Sync
                  </th>
                  <th className="px-6 py-4 text-center text-[#6A6A65] text-base font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {tenants.map((tenant: Tenant) => (
                  <tr
                    key={tenant.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-5">
                      <div className="font-semibold text-gray-900 whitespace-nowrap">
                        {tenant.name}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="capitalize">{tenant.industry}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadge(tenant.status)}`}
                      >
                        {tenant.status?.charAt(0).toUpperCase() +
                          tenant.status?.slice(1).toLowerCase()}
                      </span>
                    </td>
                    <td className="px-6 py-5">${tenant.subscriptionFee}/mo</td>
                    <td className="px-6 py-5">
                      {new Date(tenant.lastSync).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() =>
                            navigate(`/admin-dashboard/tenants/${tenant.id}`)
                          }
                          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#052350] rounded-full cursor-pointer whitespace-nowrap hover:bg-[#041a3d] transition duration-200 shadow-sm"
                        >
                          <span>Add User</span>
                          <FaAngleRight className="text-white" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {tenants.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No tenants found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="mt-6 flex items-center justify-between px-2 sm:px-4 py-3">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{tenants.length}</span> of{" "}
            <span className="font-medium">{total}</span> tenants
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="cursor-pointer rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <div className="min-w-[50px] rounded-md border border-[#E3E3E4] bg-gray-50 px-3 py-1.5 text-center text-sm font-medium text-gray-700 shadow-sm">
              {page} / {totalPages}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="cursor-pointer rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TenantsManagement;

// import { useState } from "react";

// import { CiSearch } from "react-icons/ci";
// import { FaAngleRight } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// const TenantsManagement = () => {
//   // const [, setIsDialogOpen] = useState(false);
//   // const [, setSelectedUser] = useState<any>(null);
//   const navigate = useNavigate();

//   const [users] = useState([
//     {
//       id: "USR-001",
//       name: "John Smith",
//       industry: "Supermarket",
//       status: "active",
//       subscription: "$199.99/mo",
//     },
//     {
//       id: "USR-002",
//       name: "Sarah Johnson",
//       industry: "Restaurant",
//       status: "active",
//       subscription: "$149.99/mo",
//     },
//     {
//       id: "USR-003",
//       name: "Michael Chen",
//       industry: "Ear",
//       status: "active",
//       subscription: "$99.99/mo",
//     },
//     {
//       id: "USR-004",
//       name: "Emily Rodriguez",
//       industry: "Merchant",
//       status: "suspended",
//       subscription: "$199.99/mo",
//     },
//     {
//       id: "USR-005",
//       name: "David Kim",
//       industry: "Retail",
//       status: "suspended",
//       subscription: "$129.99/mo",
//     },
//     {
//       id: "USR-006",
//       name: "Lisa Thompson",
//       industry: "Retail",
//       status: "active",
//       subscription: "$249.99/mo",
//     },
//   ]);

//   // const openDialog = (user: any) => {
//   //   setSelectedUser(user);
//   //   setIsDialogOpen(true);
//   // };

//   const getStatusBadge = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "active":
//         return "bg-[#EDE6F4] text-[#6D2C93]";
//       case "suspended":
//         return "bg-red-100 text-red-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   return (
//     <div className="p-6 shadow-2xl  rounded-3xl">
//       {/* Search + Add Button Row */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//         <div className="flex-1 w-full sm:max-w-md">
//           <div className="relative w-full hidden md:block">
//             <input
//               type="text"
//               placeholder="Search by name"
//               className="w-full pl-10 pr-3 py-3 shadow-2xl  rounded-full outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <CiSearch className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
//           </div>
//         </div>

//         <button className=" cursor-pointer text-base font-semibold text-[#08163B]">
//           View all
//         </button>
//       </div>

//       {/* Table */}
//       <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-4 gap-5">
//         <div className="xl:col-span-4 w-full">
//           <div className="w-full overflow-x-auto bg-white rounded-xl shadow-sm ">
//             <table className="min-w-[800px] w-full text-sm">
//               <thead className="border-b border-[#DBE0E5] bg-[#F8F8F8]">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-[#6A6A65] text-base font-semibold">
//                     Business Name
//                   </th>
//                   <th className="px-6 py-4 text-left text-[#6A6A65] text-base font-semibold">
//                     Industry
//                   </th>
//                   <th className="px-6 py-4 text-left text-[#6A6A65] text-base font-semibold">
//                     Status
//                   </th>
//                   <th className="px-6 py-4 text-left text-[#6A6A65] text-base font-semibold">
//                     Subscriptions
//                   </th>
//                   <th className="px-6 py-4 text-center text-[#6A6A65] text-base font-semibold">
//                     Action
//                   </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {users.map((user) => (
//                   <tr
//                     key={user.id}
//                     className="border-b border-gray-100 hover:bg-gray-50 transition"
//                   >
//                     <td className="px-6 py-5">
//                       <div className="font-semibold text-gray-900 whitespace-nowrap">
//                         {user.name}
//                       </div>
//                     </td>
//                     {/* <td className="px-6 py-5 text-gray-700 whitespace-nowrap">
//                       {user.industry}
//                     </td> */}
//                     <td className="px-6 py-5">
//                       <span
//                         className={`rounded-full px-3 py-1 text-xs font-medium `}
//                       >
//                         {user.industry}
//                       </span>
//                     </td>
//                     <td className="px-6 py-5">
//                       <span
//                         className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadge(user.status)}`}
//                       >
//                         {user.status.charAt(0).toUpperCase() +
//                           user.status.slice(1)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-5"> {user.subscription}</td>

//                     <td className="px-6 py-5 text-right">
//                       <button
//                         // onClick={() => openDialog(user)}
//                         onClick={() =>
//                           navigate(`/admin-dashboard/tenants/${user.id}`)
//                         }
//                         className=" cursor-pointer"
//                       >
//                         <FaAngleRight className="text-[#A4A7AE]" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Pagination */}
//       <div className="mt-6 flex items-center justify-between px-2 sm:px-4 py-3">
//         <div className="text-sm text-gray-600">
//           Showing <span className="font-medium">{users.length}</span> of{" "}
//           <span className="font-medium">20</span> users
//         </div>
//         <div className="flex items-center gap-2">
//           <button className="cursor-pointer rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100">
//             Prev
//           </button>
//           <div className="min-w-[50px] rounded-md border border-[#E3E3E4] bg-gray-50 px-3 py-1.5 text-center text-sm font-medium text-gray-700 shadow-sm">
//             1 / 5
//           </div>
//           <button className="cursor-pointer rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100">
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TenantsManagement;
