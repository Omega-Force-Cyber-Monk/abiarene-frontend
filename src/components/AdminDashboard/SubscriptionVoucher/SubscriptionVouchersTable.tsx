import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import SectionTitle from "@/common/SectionTitle";
import {
  useGetAllSubscriptionVouchersQuery,
  useCreateSubscriptionVoucherMutation,
  useUpdateSubscriptionVoucherMutation,
  useDeleteSubscriptionVoucherMutation,
} from "@/redux/features/admin/subscriptionVoucher/subscriptionVoucherApi";
import {
  SubscriptionVoucher,
  VoucherFormData,
} from "@/redux/features/admin/subscriptionVoucher/subscriptionVoucher";
import VoucherDialog from "./VoucherDialog";
import Loader from "../Shared/Loader";

const SubscriptionVouchersTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingVoucher, setEditingVoucher] =
    useState<SubscriptionVoucher | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const {
    data: vouchers = [],
    isLoading,
    refetch,
  } = useGetAllSubscriptionVouchersQuery();
  const [createVoucher, { isLoading: isCreating }] =
    useCreateSubscriptionVoucherMutation();
  const [updateVoucher, { isLoading: isUpdating }] =
    useUpdateSubscriptionVoucherMutation();
  const [deleteVoucher, { isLoading: isDeleting }] =
    useDeleteSubscriptionVoucherMutation();

  // Filter vouchers based on search term
  const filteredVouchers = vouchers.filter(
    (voucher) =>
      voucher.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voucher.tenant?.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const paginatedVouchers = filteredVouchers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const handleCreate = () => {
    setEditingVoucher(null);
    setDialogOpen(true);
  };

  const handleEdit = (voucher: SubscriptionVoucher) => {
    setEditingVoucher(voucher);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this voucher?")) {
      try {
        await deleteVoucher(id).unwrap();
        setSnackbar({
          open: true,
          message: "Voucher deleted successfully",
          severity: "success",
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: "Failed to delete voucher",
          severity: "error",
        });
      }
    }
  };

  const handleDialogSubmit = async (data: VoucherFormData) => {
    try {
      if (editingVoucher) {
        await updateVoucher({
          id: editingVoucher.id,
          data: {
            code: data.code,
            amountOff: data.amountOff,
            expiresAt: data.expiresAt,
            isActive: data.isActive,
          },
        }).unwrap();
        setSnackbar({
          open: true,
          message: "Voucher updated successfully",
          severity: "success",
        });
      } else {
        // For creation, we need a tenant ID. You might want to select a tenant
        // For now, using first tenant or you can add a tenant selector
        if (vouchers.length > 0 && vouchers[0].tenantId) {
          await createVoucher({
            tenantId: vouchers[0].tenantId,
            data: {
              code: data.code,
              amountOff: data.amountOff,
              expiresAt: data.expiresAt,
              isActive: data.isActive,
            },
          }).unwrap();
          setSnackbar({
            open: true,
            message: "Voucher created successfully",
            severity: "success",
          });
        } else {
          setSnackbar({
            open: true,
            message: "No tenant available. Please add a tenant first.",
            severity: "error",
          });
        }
      }
      setDialogOpen(false);
    } catch (error) {
      setSnackbar({
        open: true,
        message: editingVoucher
          ? "Failed to update voucher"
          : "Failed to create voucher",
        severity: "error",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
  };

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="">
      {/* Header Section */}
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-4">
        {/* Title */}

        <div>
          <SectionTitle title="All Subscription Vouchers" description="" />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search by code or tenant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {/* Buttons */}

          {/* <button
            onClick={handleCreate}
            className="group w-full cursor-pointer sm:w-auto bg-[#052350] hover:bg-[#061E49] active:scale-[0.98] text-white px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <FiPlus className="w-5 h-5 transition-transform duration-200 group-hover:rotate-90" />
            <span className="font-medium tracking-wide whitespace-nowrap">
              Create Voucher
            </span>
          </button> */}
          <button
            onClick={() => refetch()}
            className="w-full sm:w-auto border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="grid grid-cols-1 gap-5">
        <div className="w-full">
          <div className="w-full overflow-x-auto bg-white rounded-xl shadow-sm">
            <table className="min-w-[1000px] w-full text-sm">
              <thead className="border-b border-[#DBE0E5] bg-[#F8F8F8]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Voucher Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tenant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount Off
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expiry Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usage
                  </th>
                  {/* <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th> */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedVouchers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <span className="text-gray-500">
                        No vouchers found. Click "Create Voucher" to add one.
                      </span>
                    </td>
                  </tr>
                ) : (
                  paginatedVouchers.map((voucher) => (
                    <tr key={voucher.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-gray-900">
                          {voucher.code}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {voucher.tenant?.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-[#052350] text-white rounded-full">
                           {voucher.amountOff}% OFF
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {voucher.isActive && !isExpired(voucher.expiresAt) ? (
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            Active
                          </span>
                        ) : isExpired(voucher.expiresAt) ? (
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                            Expired
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        <span title={formatDate(voucher.expiresAt)}>
                          {formatDate(voucher.expiresAt)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {voucher.usedAt ? (
                          <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                            Used
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            Unused
                          </span>
                        )}
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-3">
                         
                          <button
                            onClick={() => handleEdit(voucher)}
                            disabled={voucher.usedAt !== null}
                            title="Edit"
                            className={`group flex cursor-pointer items-center justify-center w-9 h-9 rounded-lg transition-all duration-200
      ${
        voucher.usedAt !== null
          ? "bg-gray-100 text-gray-300 cursor-not-allowed"
          : "bg-white text-[#052350] hover:bg-[#052350] hover:text-white shadow-sm hover:shadow-md"
      }`}
                          >
                            <svg
                              className="w-4 h-4 transition-transform duration-200 group-hover:scale-110"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>

                       
                          <button
                            onClick={() => handleDelete(voucher.id)}
                            disabled={voucher.usedAt !== null}
                            title="Delete"
                            className={`group flex cursor-pointer items-center justify-center w-9 h-9 rounded-lg transition-all duration-200
      ${
        voucher.usedAt !== null
          ? "bg-gray-100 text-gray-300 cursor-not-allowed"
          : "bg-white text-red-600 hover:bg-red-600 hover:text-white shadow-sm hover:shadow-md"
      }`}
                          >
                            <svg
                              className="w-4 h-4 transition-transform duration-200 group-hover:scale-110"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td> */}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {/* Pagination */}
        <div className="px-4 sm:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          {/* Rows per page */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="text-sm text-gray-700">Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-fit"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>

          {/* Showing info */}
          <div className="text-sm text-gray-700 text-center sm:text-left">
            Showing{" "}
            <span className="font-medium">
              {filteredVouchers.length === 0 ? 0 : page * rowsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min((page + 1) * rowsPerPage, filteredVouchers.length)}
            </span>{" "}
            of <span className="font-medium">{filteredVouchers.length}</span>{" "}
            results
          </div>

          {/* Buttons */}
          <div className="flex justify-between sm:justify-end gap-2 w-full sm:w-auto">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 0}
              className={`px-3 py-1 rounded-md text-sm transition w-1/2 sm:w-auto ${
                page === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Previous
            </button>

            <button
              onClick={() => setPage(page + 1)}
              disabled={(page + 1) * rowsPerPage >= filteredVouchers.length}
              className={`px-3 py-1 rounded-md text-sm transition w-1/2 sm:w-auto ${
                (page + 1) * rowsPerPage >= filteredVouchers.length
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Dialog for Create/Edit */}
      <VoucherDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleDialogSubmit}
        initialData={
          editingVoucher
            ? {
                code: editingVoucher.code,
                amountOff: editingVoucher.amountOff,
                expiresAt: editingVoucher.expiresAt,
                isActive: editingVoucher.isActive,
              }
            : undefined
        }
        title={editingVoucher ? "Edit Voucher" : "Create New Voucher"}
        loading={isCreating || isUpdating}
      />

      {/* Snackbar for notifications */}
      {snackbar.open && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div
            className={`rounded-lg shadow-lg p-4 ${
              snackbar.severity === "success"
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <div className="flex items-center gap-3">
              {snackbar.severity === "success" ? (
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              <p
                className={`text-sm ${
                  snackbar.severity === "success"
                    ? "text-green-800"
                    : "text-red-800"
                }`}
              >
                {snackbar.message}
              </p>
              <button
                onClick={() =>
                  setSnackbar((prev) => ({ ...prev, open: false }))
                }
                className="ml-4"
              >
                <svg
                  className="w-4 h-4 text-gray-400 hover:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionVouchersTable;
