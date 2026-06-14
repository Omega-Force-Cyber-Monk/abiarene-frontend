// pages/admin/tenants/TenantsManagement.tsx (updated version)
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import {
  FaUsersCog,
  FaUserPlus,
  FaEdit,
  FaTrash,
  FaTicketAlt,
  FaEye,
  FaKey,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  useGetTenantsQuery,
  useGetTenantRolesQuery,
  useDeleteTenantUserMutation,
  useGetTenantUsersQuery,
} from "@/redux/features/admin/adminTenant/adminTenantApi";
import {
  Tenant,
  TenantUser,
} from "@/redux/features/admin/adminTenant/adminTenant.types";
import { toast } from "sonner";
import Loader from "../Shared/Loader";
import RolesManagementModal from "./RolesManagementModal";
import { CreateTenantUserModal } from "./CreateTenantUserModal";
import { EditTenantUserModal } from "./EditTenantUserModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

import { CreateVoucherModals } from "./CreateVoucherModals";
import { ViewVouchersModals } from "./ViewVouchersModals";
import { ResetSupervisorPasswordModal } from "./ResetSupervisorPasswordModal";

const TenantsManagement = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [showRolesModal, setShowRolesModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<TenantUser | null>(null);
  const [userToDelete, setUserToDelete] = useState<{
    userId: string;
    tenantId: string;
    userName: string;
  } | null>(null);
  const [selectedTenantForUsers, setSelectedTenantForUsers] =
    useState<Tenant | null>(null);

  // New states for voucher management
  const [showCreateVoucherModal, setShowCreateVoucherModal] = useState(false);
  const [showViewVouchersModal, setShowViewVouchersModal] = useState(false);
  const [selectedTenantForVoucher, setSelectedTenantForVoucher] =
    useState<Tenant | null>(null);

  // States for Reset Password
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [selectedTenantForReset, setSelectedTenantForReset] =
    useState<Tenant | null>(null);

  const { data, isLoading, error, refetch } = useGetTenantsQuery({
    page,
    limit: 10,
    search: searchTerm,
  });

  const [deleteTenantUser] = useDeleteTenantUserMutation();

  // Fetch roles for selected tenant (for user management)
  const { data: rolesData, refetch: refetchRoles } = useGetTenantRolesQuery(
    {
      tenantId: selectedTenantForUsers?.id || "",
      params: { page: 1, limit: 20 },
    },
    { skip: !selectedTenantForUsers?.id },
  );

  // Fetch users for selected tenant
  const { data: tenantUsers, refetch: refetchUsers } = useGetTenantUsersQuery(
    { tenantId: selectedTenantForUsers?.id || "" },
    { skip: !selectedTenantForUsers?.id },
  );

  const tenants = data?.data || [];
  const total = data?.meta?.total || 0;
  const totalPages = data?.meta?.totalPages || 0;
  const roles = rolesData?.data || [];

  const handleSearch = () => {
    setSearchTerm(searchInput);
    setPage(1);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleManageRoles = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setShowRolesModal(true);
  };

  const handleAddUser = (tenant: Tenant) => {
    setSelectedTenantForUsers(tenant);
    setShowCreateUserModal(true);
  };

  const handleEditUser = (user: TenantUser, tenant: Tenant) => {
    setSelectedUser(user);
    setSelectedTenantForUsers(tenant);
    setShowEditUserModal(true);
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      await deleteTenantUser({
        tenantId: userToDelete.tenantId,
        userId: userToDelete.userId,
      }).unwrap();
      toast.success(`User ${userToDelete.userName} deleted successfully`);
      setShowDeleteModal(false);
      setUserToDelete(null);
      refetchUsers();
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete user");
      console.error(err);
    }
  };

  const openDeleteModal = (
    userId: string,
    tenantId: string,
    userName: string,
  ) => {
    setUserToDelete({ userId, tenantId, userName });
    setShowDeleteModal(true);
  };

  // New handlers for voucher management
  const handleAddVoucher = (tenant: Tenant) => {
    setSelectedTenantForVoucher(tenant);
    setShowCreateVoucherModal(true);
  };

  const handleViewVouchers = (tenant: Tenant) => {
    setSelectedTenantForVoucher(tenant);
    setShowViewVouchersModal(true);
  };

  const handleVoucherSuccess = () => {
    refetch(); // Refresh tenant data if needed
  };

  const handleResetPassword = (tenant: Tenant) => {
    setSelectedTenantForReset(tenant);
    setShowResetPasswordModal(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case "ACTIVE":
        return "bg-[#EDE6F4] text-[#6D2C93]";
      case "INACTIVE":
        return "bg-gray-100 text-gray-700";
      case "SUSPENDED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getUserStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case "ACTIVE":
        return "bg-green-100 text-green-700";
      case "INACTIVE":
        return "bg-gray-100 text-gray-500";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  };

  const formatDateTime = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid date";
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 shadow-2xl rounded-3xl">
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
        <div className="text-center mt-4">
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-[#052350] text-white rounded-lg hover:bg-[#041a3d]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-6 shadow-2xl rounded-3xl">
        {/* Search Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex-1 w-full sm:max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search by business name..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-3 py-3 shadow-sm rounded-full outline-none focus:ring-2 focus:ring-[#052350] border border-gray-200"
              />
              <CiSearch
                onClick={handleSearch}
                className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-[#052350]"
              />
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Total Businesses: <span className="font-semibold">{total}</span>
          </div>
        </div>

        {/* Tenants Table */}
        <div className="grid grid-cols-1 gap-5">
          <div className="w-full">
            <div className="w-full overflow-x-auto bg-white rounded-xl shadow-sm">
              <table className="min-w-[1000px] w-full text-sm">
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
                    <th className="px-6 py-4 text-left text-[#6A6A65] text-base font-semibold">
                      Created At
                    </th>
                    <th className="px-6 py-4 text-center text-[#6A6A65] text-base font-semibold">
                      Actions
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
                        <span className="capitalize px-2 py-1 bg-gray-100 rounded-full text-xs">
                          {tenant.industry}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadge(tenant.status)}`}
                        >
                          {tenant.status?.charAt(0).toUpperCase() +
                            tenant.status?.slice(1).toLowerCase()}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="font-semibold text-[#052350]">
                          CFA {tenant.subscriptionFee}
                        </span>
                        /mo
                      </td>
                      <td className="px-6 py-5 text-gray-600">
                        {formatDate(tenant.lastSync)}
                      </td>
                      <td className="px-6 py-5 text-gray-600">
                        {formatDate(tenant.createdAt)}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleAddVoucher(tenant)}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg cursor-pointer whitespace-nowrap hover:bg-green-700 transition duration-200 shadow-sm"
                            title="Add Voucher"
                          >
                            <FaTicketAlt className="text-white" />
                            <span>Add Voucher</span>
                          </button>

                          {/* Reset Password Button */}
                          <button
                            onClick={() => handleResetPassword(tenant)}
                            className="p-2 text-sm font-medium text-yellow-600 bg-yellow-50 rounded-lg cursor-pointer hover:bg-yellow-100 transition duration-200"
                            title="Reset Supervisor Password"
                          >
                            <FaKey className="w-4 h-4" />
                          </button>

                          {/* View Vouchers Button */}
                          <button
                            onClick={() => handleViewVouchers(tenant)}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#052350] bg-blue-100 rounded-lg cursor-pointer whitespace-nowrap hover:bg-blue-200 transition duration-200"
                            title="View Vouchers"
                          >
                            <FaEye className="w-4 h-4" />
                            <span>View</span>
                          </button>

                          {/* Add User Button */}
                          <button
                            onClick={() => handleAddUser(tenant)}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#052350] rounded-lg cursor-pointer whitespace-nowrap hover:bg-[#041a3d] transition duration-200 shadow-sm"
                            title="Add User"
                          >
                            <FaUserPlus className="text-white" />
                            <span>Add User</span>
                          </button>

                          {/* Manage Roles Button */}
                          <button
                            onClick={() => handleManageRoles(tenant)}
                            className="p-2 text-sm font-medium text-[#052350] bg-[#EDE6F4] rounded-lg cursor-pointer hover:bg-[#e0d5ec] transition duration-200"
                            title="Manage Roles"
                          >
                            <FaUsersCog className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {tenants.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <p>No tenants found</p>
                          {searchTerm && (
                            <button
                              onClick={() => {
                                setSearchInput("");
                                setSearchTerm("");
                              }}
                              className="text-[#052350] underline"
                            >
                              Clear search
                            </button>
                          )}
                        </div>
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
          <div className="mt-6 flex items-center justify-between px-2 sm:px-4 py-3 flex-wrap gap-3">
            <div className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-medium">{data?.meta?.count || 0}</span> of{" "}
              <span className="font-medium">{total}</span> tenants
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="cursor-pointer rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Previous
              </button>
              <div className="min-w-[50px] rounded-md border border-[#E3E3E4] bg-gray-50 px-3 py-1.5 text-center text-sm font-medium text-gray-700 shadow-sm">
                {page} / {totalPages}
              </div>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="cursor-pointer rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Users List Section (when a tenant is selected for user management) */}
      {selectedTenantForUsers && (
        <div className="mt-6 p-6 shadow-2xl rounded-3xl bg-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Users - {selectedTenantForUsers.name}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Manage users for this tenant
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedTenantForUsers(null);
                setShowCreateUserModal(false);
                setShowEditUserModal(false);
              }}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              Close
            </button>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">
                    PIN
                  </th>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-gray-600 font-semibold">
                    Created At
                  </th>
                  <th className="px-4 py-3 text-center text-gray-600 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {tenantUsers && tenantUsers.length > 0 ? (
                  tenantUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className="capitalize px-2 py-1 bg-[#EDE6F4] text-[#6D2C93] rounded-full text-xs">
                          {user.role?.name || "N/A"}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-gray-600">
                        ••••
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${getUserStatusBadge(user.status)}`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">
                        {formatDateTime(user.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() =>
                              handleEditUser(user, selectedTenantForUsers)
                            }
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit User"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              openDeleteModal(
                                user.id,
                                selectedTenantForUsers.id,
                                user.name,
                              )
                            }
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete User"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <p>No users found for this tenant</p>
                        <button
                          onClick={() => handleAddUser(selectedTenantForUsers)}
                          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#052350] rounded-lg hover:bg-[#041a3d] transition"
                        >
                          <FaUserPlus className="w-4 h-4" />
                          Add First User
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Roles Management Modal */}
      {selectedTenant && showRolesModal && (
        <RolesManagementModal
          tenant={selectedTenant}
          onClose={() => {
            setShowRolesModal(false);
            setSelectedTenant(null);
          }}
          onSuccess={() => {
            refetch();
          }}
        />
      )}

      {/* Create User Modal */}
      {selectedTenantForUsers && showCreateUserModal && (
        <CreateTenantUserModal
          isOpen={showCreateUserModal}
          onClose={() => {
            setShowCreateUserModal(false);
            if (!showEditUserModal) {
              setSelectedTenantForUsers(null);
            }
          }}
          tenantId={selectedTenantForUsers.id}
          roles={roles}
          onSuccess={() => {
            refetchUsers();
            refetch();
          }}
        />
      )}

      {/* Edit User Modal */}
      {selectedUser && selectedTenantForUsers && showEditUserModal && (
        <EditTenantUserModal
          isOpen={showEditUserModal}
          onClose={() => {
            setShowEditUserModal(false);
            setSelectedUser(null);
            if (!showCreateUserModal) {
              setSelectedTenantForUsers(null);
            }
          }}
          tenantId={selectedTenantForUsers.id}
          user={selectedUser}
          roles={roles}
          onSuccess={() => {
            refetchUsers();
            refetch();
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && userToDelete && (
        <DeleteConfirmationModal
          title="Delete User"
          message={`Are you sure you want to delete user "${userToDelete.userName}"? This action cannot be undone.`}
          onConfirm={handleDeleteUser}
          onCancel={() => {
            setShowDeleteModal(false);
            setUserToDelete(null);
          }}
        />
      )}

      {/* Create Voucher Modal */}
      {selectedTenantForVoucher && showCreateVoucherModal && (
        <CreateVoucherModals
          isOpen={showCreateVoucherModal}
          onClose={() => {
            setShowCreateVoucherModal(false);
            setSelectedTenantForVoucher(null);
          }}
          tenantId={selectedTenantForVoucher.id}
          tenantName={selectedTenantForVoucher.name}
          onSuccess={handleVoucherSuccess}
        />
      )}

      {/* View Vouchers Modal */}
      {selectedTenantForVoucher && showViewVouchersModal && (
        <ViewVouchersModals
          isOpen={showViewVouchersModal}
          onClose={() => {
            setShowViewVouchersModal(false);
            setSelectedTenantForVoucher(null);
          }}
          tenantId={selectedTenantForVoucher.id}
          tenantName={selectedTenantForVoucher.name}
        />
      )}

      {/* Reset Supervisor Password Modal */}
      {selectedTenantForReset && showResetPasswordModal && (
        <ResetSupervisorPasswordModal
          isOpen={showResetPasswordModal}
          onClose={() => {
            setShowResetPasswordModal(false);
            setSelectedTenantForReset(null);
          }}
          tenantId={selectedTenantForReset.id}
          tenantName={selectedTenantForReset.name}
        />
      )}
    </>
  );
};

export default TenantsManagement;

// // pages/admin/tenants/TenantsManagement.tsx
// import { useState } from "react";
// import { CiSearch } from "react-icons/ci";
// import { FaUsersCog, FaUserPlus, FaEdit, FaTrash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import {
//   useGetTenantsQuery,
//   useGetTenantRolesQuery,
//   useDeleteTenantUserMutation,
//   useGetTenantUsersQuery,
// } from "@/redux/features/admin/adminTenant/adminTenantApi";
// import {
//   Tenant,
//   TenantUser,
// } from "@/redux/features/admin/adminTenant/adminTenant.types";
// import { toast } from "sonner";
// import Loader from "../Shared/Loader";
// import RolesManagementModal from "./RolesManagementModal";
// import { CreateTenantUserModal } from "./CreateTenantUserModal";
// import { EditTenantUserModal } from "./EditTenantUserModal";
// import DeleteConfirmationModal from "./DeleteConfirmationModal";

// const TenantsManagement = () => {
//   const navigate = useNavigate();
//   const [page, setPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchInput, setSearchInput] = useState("");
//   const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
//   const [showRolesModal, setShowRolesModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showCreateUserModal, setShowCreateUserModal] = useState(false);
//   const [showEditUserModal, setShowEditUserModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<TenantUser | null>(null);
//   const [userToDelete, setUserToDelete] = useState<{
//     userId: string;
//     tenantId: string;
//     userName: string;
//   } | null>(null);
//   const [selectedTenantForUsers, setSelectedTenantForUsers] =
//     useState<Tenant | null>(null);

//   // const { data, isLoading, error, refetch } = useGetTenantsQuery({
//   //   page,
//   //   limit: 10,
//   //   search: searchTerm,
//   // });

//   const { data, isLoading, error, refetch } = useGetTenantsQuery({
//     page,
//     limit: 10,
//     search: searchTerm,
//   });

//   const [deleteTenantUser] = useDeleteTenantUserMutation();

//   // Fetch roles for selected tenant (for user management)
//   const { data: rolesData, refetch: refetchRoles } = useGetTenantRolesQuery(
//     {
//       tenantId: selectedTenantForUsers?.id || "",
//       params: { page: 1, limit: 20 },
//     },
//     { skip: !selectedTenantForUsers?.id },
//   );

//   // Fetch users for selected tenant
//   const { data: tenantUsers, refetch: refetchUsers } = useGetTenantUsersQuery(
//     { tenantId: selectedTenantForUsers?.id || "" },
//     { skip: !selectedTenantForUsers?.id },
//   );

//   const tenants = data?.data || [];
//   const total = data?.meta?.total || 0;
//   const totalPages = data?.meta?.totalPages || 0;
//   // const tenants = data?.data || [];
//   // const total = data?.total || 0;
//   // const totalPages = Math.ceil(total / 10);
//   const roles = rolesData?.data || [];

//   const handleSearch = () => {
//     setSearchTerm(searchInput);
//     setPage(1);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   };

//   const handleManageRoles = (tenant: Tenant) => {
//     setSelectedTenant(tenant);
//     setShowRolesModal(true);
//   };

//   const handleAddUser = (tenant: Tenant) => {
//     setSelectedTenantForUsers(tenant);
//     setShowCreateUserModal(true);
//   };

//   const handleEditUser = (user: TenantUser, tenant: Tenant) => {
//     setSelectedUser(user);
//     setSelectedTenantForUsers(tenant);
//     setShowEditUserModal(true);
//   };

//   const handleDeleteUser = async () => {
//     if (!userToDelete) return;

//     try {
//       await deleteTenantUser({
//         tenantId: userToDelete.tenantId,
//         userId: userToDelete.userId,
//       }).unwrap();
//       toast.success(`User ${userToDelete.userName} deleted successfully`);
//       setShowDeleteModal(false);
//       setUserToDelete(null);
//       refetchUsers();
//       refetch();
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Failed to delete user");
//       console.error(err);
//     }
//   };

//   const openDeleteModal = (
//     userId: string,
//     tenantId: string,
//     userName: string,
//   ) => {
//     setUserToDelete({ userId, tenantId, userName });
//     setShowDeleteModal(true);
//   };

//   const getStatusBadge = (status: string) => {
//     switch (status?.toUpperCase()) {
//       case "ACTIVE":
//         return "bg-[#EDE6F4] text-[#6D2C93]";
//       case "INACTIVE":
//         return "bg-gray-100 text-gray-700";
//       case "SUSPENDED":
//         return "bg-red-100 text-red-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   const getUserStatusBadge = (status: string) => {
//     switch (status?.toUpperCase()) {
//       case "ACTIVE":
//         return "bg-green-100 text-green-700";
//       case "INACTIVE":
//         return "bg-gray-100 text-gray-500";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

//   const formatDate = (dateString: string) => {
//     try {
//       return new Date(dateString).toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//       });
//     } catch {
//       return "Invalid date";
//     }
//   };

//   const formatDateTime = (dateString: string) => {
//     try {
//       return new Date(dateString).toLocaleString("en-US", {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//     } catch {
//       return "Invalid date";
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="p-6 shadow-2xl rounded-3xl">
//         <Loader />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6 shadow-2xl rounded-3xl">
//         <div className="text-center text-red-600">
//           Error loading tenants. Please try again later.
//         </div>
//         <div className="text-center mt-4">
//           <button
//             onClick={() => refetch()}
//             className="px-4 py-2 bg-[#052350] text-white rounded-lg hover:bg-[#041a3d]"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="p-6 shadow-2xl rounded-3xl">
//         {/* Search Row */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//           <div className="flex-1 w-full sm:max-w-md">
//             <div className="relative w-full">
//               <input
//                 type="text"
//                 placeholder="Search by business name..."
//                 value={searchInput}
//                 onChange={(e) => setSearchInput(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 className="w-full pl-10 pr-3 py-3 shadow-sm rounded-full outline-none focus:ring-2 focus:ring-[#052350] border border-gray-200"
//               />
//               <CiSearch
//                 onClick={handleSearch}
//                 className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-[#052350]"
//               />
//             </div>
//           </div>

//           <div className="text-sm text-gray-600">
//             Total Businesses: <span className="font-semibold">{total}</span>
//           </div>
//         </div>

//         {/* Tenants Table */}
//         <div className="grid grid-cols-1 gap-5">
//           <div className="w-full">
//             <div className="w-full overflow-x-auto bg-white rounded-xl shadow-sm">
//               <table className="min-w-[1000px] w-full text-sm">
//                 <thead className="border-b border-[#DBE0E5] bg-[#F8F8F8]">
//                   <tr>
//                     <th className="px-6 py-4 text-left whitespace-nowrap text-[#6A6A65] text-base font-semibold">
//                       Business Name
//                     </th>
//                     <th className="px-6 py-4 text-left text-[#6A6A65] text-base font-semibold">
//                       Industry
//                     </th>
//                     <th className="px-6 py-4 text-left text-[#6A6A65] text-base font-semibold">
//                       Status
//                     </th>
//                     <th className="px-6 py-4 text-left whitespace-nowrap text-[#6A6A65] text-base font-semibold">
//                       Subscription Fee
//                     </th>
//                     <th className="px-6 py-4 text-left whitespace-nowrap text-[#6A6A65] text-base font-semibold">
//                       Last Sync
//                     </th>
//                     <th className="px-6 py-4 text-left text-[#6A6A65] text-base font-semibold">
//                       Created At
//                     </th>
//                     <th className="px-6 py-4 text-center text-[#6A6A65] text-base font-semibold">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {tenants.map((tenant: Tenant) => (
//                     <tr
//                       key={tenant.id}
//                       className="border-b border-gray-100 hover:bg-gray-50 transition"
//                     >
//                       <td className="px-6 py-5">
//                         <div className="font-semibold text-gray-900 whitespace-nowrap">
//                           {tenant.name}
//                         </div>
//                       </td>
//                       <td className="px-6 py-5">
//                         <span className="capitalize px-2 py-1 bg-gray-100 rounded-full text-xs">
//                           {tenant.industry}
//                         </span>
//                       </td>
//                       <td className="px-6 py-5">
//                         <span
//                           className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadge(tenant.status)}`}
//                         >
//                           {tenant.status?.charAt(0).toUpperCase() +
//                             tenant.status?.slice(1).toLowerCase()}
//                         </span>
//                       </td>
//                       <td className="px-6 py-5">
//                         <span className="font-semibold text-[#052350]">
//                           ${tenant.subscriptionFee}
//                         </span>
//                         /mo
//                       </td>
//                       <td className="px-6 py-5 text-gray-600">
//                         {formatDate(tenant.lastSync)}
//                       </td>
//                       <td className="px-6 py-5 text-gray-600">
//                         {formatDate(tenant.createdAt)}
//                       </td>
//                       <td className="px-6 py-5">
//                         <div className="flex items-center justify-center gap-2">
//                           <button
//                             onClick={() => handleAddUser(tenant)}
//                             className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#052350] rounded-lg cursor-pointer whitespace-nowrap hover:bg-[#041a3d] transition duration-200 shadow-sm"
//                             title="Add User"
//                           >
//                             <FaUserPlus className="text-white" />
//                             <span>Add User</span>
//                           </button>
//                           <button
//                             onClick={() => handleManageRoles(tenant)}
//                             className="p-2 text-sm font-medium text-[#052350] bg-[#EDE6F4] rounded-lg cursor-pointer hover:bg-[#e0d5ec] transition duration-200"
//                             title="Manage Roles"
//                           >
//                             <FaUsersCog className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                   {tenants.length === 0 && (
//                     <tr>
//                       <td
//                         colSpan={7}
//                         className="px-6 py-12 text-center text-gray-500"
//                       >
//                         <div className="flex flex-col items-center gap-2">
//                           <p>No tenants found</p>
//                           {searchTerm && (
//                             <button
//                               onClick={() => {
//                                 setSearchInput("");
//                                 setSearchTerm("");
//                               }}
//                               className="text-[#052350] underline"
//                             >
//                               Clear search
//                             </button>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>

//         {/* Pagination */}
//         {totalPages > 0 && (
//           // <div className="mt-6 flex items-center justify-between px-2 sm:px-4 py-3 flex-wrap gap-3">
//           //   <div className="text-sm text-gray-600">
//           //     Showing <span className="font-medium">{tenants.length}</span> of{" "}
//           //     <span className="font-medium">{total}</span> tenants
//           //   </div>
//           //   <div className="flex items-center gap-2">
//           //     <button
//           //       onClick={() => setPage((p) => Math.max(1, p - 1))}
//           //       disabled={page === 1}
//           //       className="cursor-pointer rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
//           //     >
//           //       Previous
//           //     </button>
//           //     <div className="min-w-[50px] rounded-md border border-[#E3E3E4] bg-gray-50 px-3 py-1.5 text-center text-sm font-medium text-gray-700 shadow-sm">
//           //       {page} / {totalPages}
//           //     </div>
//           //     <button
//           //       onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//           //       disabled={page === totalPages}
//           //       className="cursor-pointer rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
//           //     >
//           //       Next
//           //     </button>
//           //   </div>
//           // </div>
//           <div className="mt-6 flex items-center justify-between px-2 sm:px-4 py-3 flex-wrap gap-3">
//             <div className="text-sm text-gray-600">
//               Showing{" "}
//               <span className="font-medium">{data?.meta?.count || 0}</span> of{" "}
//               <span className="font-medium">{total}</span> tenants
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setPage((p) => Math.max(1, p - 1))}
//                 disabled={page === 1}
//                 className="cursor-pointer rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
//               >
//                 Previous
//               </button>
//               <div className="min-w-[50px] rounded-md border border-[#E3E3E4] bg-gray-50 px-3 py-1.5 text-center text-sm font-medium text-gray-700 shadow-sm">
//                 {page} / {totalPages}
//               </div>
//               <button
//                 onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//                 disabled={page === totalPages}
//                 className="cursor-pointer rounded-lg border px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Users List Section (when a tenant is selected for user management) */}
//       {selectedTenantForUsers && (
//         <div className="mt-6 p-6 shadow-2xl rounded-3xl bg-white">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">
//                 Users - {selectedTenantForUsers.name}
//               </h2>
//               <p className="text-sm text-gray-500 mt-1">
//                 Manage users for this tenant
//               </p>
//             </div>
//             <button
//               onClick={() => {
//                 setSelectedTenantForUsers(null);
//                 setShowCreateUserModal(false);
//                 setShowEditUserModal(false);
//               }}
//               className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
//             >
//               Close
//             </button>
//           </div>

//           {/* Users Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-gray-600 font-semibold">
//                     Name
//                   </th>
//                   <th className="px-4 py-3 text-left text-gray-600 font-semibold">
//                     Email
//                   </th>
//                   <th className="px-4 py-3 text-left text-gray-600 font-semibold">
//                     Role
//                   </th>
//                   <th className="px-4 py-3 text-left text-gray-600 font-semibold">
//                     PIN
//                   </th>
//                   <th className="px-4 py-3 text-left text-gray-600 font-semibold">
//                     Status
//                   </th>
//                   <th className="px-4 py-3 text-left text-gray-600 font-semibold">
//                     Created At
//                   </th>
//                   <th className="px-4 py-3 text-center text-gray-600 font-semibold">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tenantUsers && tenantUsers.length > 0 ? (
//                   tenantUsers.map((user) => (
//                     <tr
//                       key={user.id}
//                       className="border-b border-gray-100 hover:bg-gray-50 transition"
//                     >
//                       <td className="px-4 py-3 font-medium text-gray-900">
//                         {user.name}
//                       </td>
//                       <td className="px-4 py-3 text-gray-600">{user.email}</td>
//                       <td className="px-4 py-3">
//                         <span className="capitalize px-2 py-1 bg-[#EDE6F4] text-[#6D2C93] rounded-full text-xs">
//                           {user.role?.name || "N/A"}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3 font-mono text-gray-600">
//                         ••••
//                       </td>
//                       <td className="px-4 py-3">
//                         <span
//                           className={`rounded-full px-2 py-1 text-xs font-medium ${getUserStatusBadge(user.status)}`}
//                         >
//                           {user.status}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3 text-gray-500 text-xs">
//                         {formatDateTime(user.createdAt)}
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="flex items-center justify-center gap-2">
//                           <button
//                             onClick={() =>
//                               handleEditUser(user, selectedTenantForUsers)
//                             }
//                             className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
//                             title="Edit User"
//                           >
//                             <FaEdit className="w-4 h-4" />
//                           </button>
//                           <button
//                             onClick={() =>
//                               openDeleteModal(
//                                 user.id,
//                                 selectedTenantForUsers.id,
//                                 user.name,
//                               )
//                             }
//                             className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
//                             title="Delete User"
//                           >
//                             <FaTrash className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan={7}
//                       className="px-4 py-8 text-center text-gray-500"
//                     >
//                       <div className="flex flex-col items-center gap-2">
//                         <p>No users found for this tenant</p>
//                         <button
//                           onClick={() => handleAddUser(selectedTenantForUsers)}
//                           className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#052350] rounded-lg hover:bg-[#041a3d] transition"
//                         >
//                           <FaUserPlus className="w-4 h-4" />
//                           Add First User
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Roles Management Modal */}
//       {selectedTenant && showRolesModal && (
//         <RolesManagementModal
//           tenant={selectedTenant}
//           onClose={() => {
//             setShowRolesModal(false);
//             setSelectedTenant(null);
//           }}
//           onSuccess={() => {
//             refetch();
//           }}
//         />
//       )}

//       {/* Create User Modal */}
//       {selectedTenantForUsers && showCreateUserModal && (
//         <CreateTenantUserModal
//           isOpen={showCreateUserModal}
//           onClose={() => {
//             setShowCreateUserModal(false);
//             if (!showEditUserModal) {
//               setSelectedTenantForUsers(null);
//             }
//           }}
//           tenantId={selectedTenantForUsers.id}
//           roles={roles}
//           onSuccess={() => {
//             refetchUsers();
//             refetch();
//           }}
//         />
//       )}

//       {/* Edit User Modal */}
//       {selectedUser && selectedTenantForUsers && showEditUserModal && (
//         <EditTenantUserModal
//           isOpen={showEditUserModal}
//           onClose={() => {
//             setShowEditUserModal(false);
//             setSelectedUser(null);
//             if (!showCreateUserModal) {
//               setSelectedTenantForUsers(null);
//             }
//           }}
//           tenantId={selectedTenantForUsers.id}
//           user={selectedUser}
//           roles={roles}
//           onSuccess={() => {
//             refetchUsers();
//             refetch();
//           }}
//         />
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && userToDelete && (
//         <DeleteConfirmationModal
//           title="Delete User"
//           message={`Are you sure you want to delete user "${userToDelete.userName}"? This action cannot be undone.`}
//           onConfirm={handleDeleteUser}
//           onCancel={() => {
//             setShowDeleteModal(false);
//             setUserToDelete(null);
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default TenantsManagement;
