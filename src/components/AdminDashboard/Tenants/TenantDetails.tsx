// // TenantDetails.tsx - Updated version
// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   // useGetTenantByIdQuery,
//   useGetRolesByTenantQuery,
//   useGetUsersByTenantQuery,
//   useUpdateTenantUserMutation,
// } from "@/redux/features/admin/adminTenant/adminTenantApi";
// import { FaArrowLeft, FaPlus } from "react-icons/fa";

// import { toast } from "sonner";
// import { CreateTenantUserModal } from "./CreateTenantUserModal";
// import { EditTenantUserModal } from "./EditTenantUserModal";

// const TenantDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [editingUser, setEditingUser] = useState<any>(null);

//   // const { data: tenant, isLoading: tenantLoading } = useGetTenantByIdQuery(id!);
//   const {
//     data: roles,
//     isLoading: tenantLoading,
//     refetch: refetchRoles,
//   } = useGetRolesByTenantQuery({
//     tenantId: id!,
//     page: 1,
//     limit: 50,
//   });
//   const { data: users, refetch: refetchUsers } = useGetUsersByTenantQuery({
//     tenantId: id!,
//     page: 1,
//     limit: 50,
//   });

//   console.log(users, "sdsaaaaaaasdasd");
//   const [updateUser] = useUpdateTenantUserMutation();

//   const handleToggleUserStatus = async (user: any) => {
//     const newStatus = user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
//     try {
//       await updateUser({
//         tenantId: id!,
//         userId: user.id,
//         data: { status: newStatus },
//       }).unwrap();
//       toast.success(`User ${newStatus.toLowerCase()} successfully`);
//       refetchUsers();
//     } catch (error: any) {
//       toast.error(error?.data?.message || "Failed to update user status");
//     }
//   };

//   if (tenantLoading) {
//     return (
//       <div className="p-6 flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#052350]"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <button
//         onClick={() => navigate("/admin-dashboard/tenants")}
//         className="flex items-center gap-2 cursor-pointer text-[#052350] mb-6  hover:text-[#052350]"
//       >
//         <FaArrowLeft /> Back to Tenants
//       </button>

//       <div className="bg-white rounded-xl shadow-sm p-6">
//         {/* <h1 className="text-2xl font-bold mb-4">{tenant?.name}</h1>

//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div>
//             <p className="text-gray-500">Industry</p>
//             <p className="font-semibold capitalize">{tenant?.industry}</p>
//           </div>
//           <div>
//             <p className="text-gray-500">Status</p>
//             <p className="font-semibold">{tenant?.status}</p>
//           </div>
//           <div>
//             <p className="text-gray-500">Subscription Fee</p>
//             <p className="font-semibold">${tenant?.subscriptionFee}/mo</p>
//           </div>
//           <div>
//             <p className="text-gray-500">Last Sync</p>
//             <p className="font-semibold">
//               {new Date(tenant?.lastSync || "").toLocaleString()}
//             </p>
//           </div>
//         </div> */}

//         {/* Roles Section */}
//         <div className="border-t pt-6 border-gray-200">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">
//               Roles ({roles?.data?.length || 0})
//             </h2>
//           </div>
//           <div className="space-y-2">
//             {roles?.data?.map((role) => (
//               <div
//                 key={role.id}
//                 className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
//               >
//                 <span>{role.name}</span>
//                 <span
//                   className={`px-2 py-1 rounded-full text-xs ${
//                     role.isActive
//                       ? "bg-green-100 text-green-700"
//                       : "bg-red-100 text-red-700"
//                   }`}
//                 >
//                   {role.isActive ? "Active" : "Inactive"}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Users Section */}
//         <div className="border-t pt-6 mt-6 border-gray-200">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">
//               Users ({users?.data?.length || 0})
//             </h2>
//             <button
//               onClick={() => setIsCreateModalOpen(true)}
//               className="flex items-center gap-2 cursor-pointer text-base font-semibold text-white bg-[#052350] px-5 py-2 rounded-full hover:bg-[#061E49] transition-all duration-200"
//             >
//               <FaPlus size={14} />
//               <span>Add User</span>
//             </button>
//           </div>

//           {users?.data?.length === 0 ? (
//             <div className="text-center py-8 text-gray-500">
//               No users found. Click "Add User" to create one.
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-4 py-3 text-left">Name</th>
//                     <th className="px-4 py-3 text-left">PIN</th>
//                     <th className="px-4 py-3 text-left">Role</th>
//                     <th className="px-4 py-3 text-left">Status</th>
//                     {/* <th className="px-4 py-3 text-center">Actions</th> */}
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100">
//                   {users?.data?.map((user) => (
//                     <tr key={user.id} className="hover:bg-gray-50">
//                       <td className="px-4 py-3 font-medium">{user.name}</td>
//                       <td className="px-4 py-3 font-mono">{user.pin}</td>
//                       <td className="px-4 py-3">
//                         <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
//                           {user.role?.name || "N/A"}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3">
//                         <button
//                           onClick={() => handleToggleUserStatus(user)}
//                           className={`px-2 py-1 rounded-full text-xs font-medium cursor-pointer transition ${
//                             user.status === "ACTIVE"
//                               ? "bg-green-100 text-green-700 hover:bg-green-200"
//                               : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                           }`}
//                         >
//                           {user.status}
//                         </button>
//                       </td>
//                       {/* <td className="px-4 py-3">
//                         <div className="flex items-center justify-center gap-2">
//                           <button
//                             onClick={() => setEditingUser(user)}
//                             className="p-1 text-blue-600 hover:bg-blue-50 rounded transition"
//                             title="Edit"
//                           >
//                             <FaEdit size={16} />
//                           </button>
//                           <button
//                             onClick={() => handleDeleteUser(user.id, user.name)}
//                             className="p-1 text-red-600 hover:bg-red-50 rounded transition"
//                             title="Delete"
//                           >
//                             <FaTrash size={14} />
//                           </button>
//                         </div>
//                       </td> */}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Create User Modal */}
//       <CreateTenantUserModal
//         isOpen={isCreateModalOpen}
//         onClose={() => setIsCreateModalOpen(false)}
//         tenantId={id!}
//         roles={roles?.data || []}
//         onSuccess={() => {
//           refetchUsers();
//           refetchRoles();
//         }}
//       />

//       {/* Edit User Modal */}
//       {editingUser && (
//         <EditTenantUserModal
//           isOpen={!!editingUser}
//           onClose={() => setEditingUser(null)}
//           tenantId={id!}
//           user={editingUser}
//           roles={roles?.data || []}
//           onSuccess={() => {
//             refetchUsers();
//             setEditingUser(null);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default TenantDetails;
