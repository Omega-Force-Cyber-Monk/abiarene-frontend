// src/components/admin/vouchers/ViewVouchersModal.tsx
import { useState } from "react";
import { FaTimes, FaCopy, FaCheck, FaTrash } from "react-icons/fa";
import {
  useGetSubscriptionVouchersByTenantQuery,
  useDeleteSubscriptionVoucherMutation,
} from "@/redux/features/admin/subscriptionVoucher/subscriptionVoucherApi";
import { SubscriptionVoucher } from "@/redux/features/admin/subscriptionVoucher/subscriptionVoucher";

import { toast } from "sonner";

interface ViewVouchersModalProps {
  isOpen: boolean;
  onClose: () => void;
  tenantId: string;
  tenantName: string;
}

export const ViewVouchersModals = ({
  isOpen,
  onClose,
  tenantId,
  tenantName,
}: ViewVouchersModalProps) => {
  const {
    data: vouchers,
    isLoading,
    refetch,
  } = useGetSubscriptionVouchersByTenantQuery(tenantId, { skip: !isOpen });
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [deleteVoucher, { isLoading: isDeleting }] =
    useDeleteSubscriptionVoucherMutation();
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleDeleteVoucher = async (voucherId: string) => {
    if (confirmDeleteId !== voucherId) {
      setConfirmDeleteId(voucherId);
      // Auto-reset confirmation after 3 seconds
      setTimeout(() => setConfirmDeleteId(null), 3000);
      return;
    }
    try {
      await deleteVoucher(voucherId).unwrap();
      toast.success("Voucher deleted successfully!");
      setConfirmDeleteId(null);
    } catch {
      toast.error("Failed to delete voucher. Please try again.");
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success("Voucher code copied to clipboard!");
    setTimeout(() => setCopiedCode(null), 2000);
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

  const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
  };

  const getVoucherStatus = (voucher: SubscriptionVoucher) => {
    if (!voucher.isActive)
      return { text: "Inactive", color: "bg-gray-100 text-gray-700" };
    if (voucher.usedAt)
      return { text: "Used", color: "bg-red-100 text-red-700" };
    if (isExpired(voucher.expiresAt))
      return { text: "Expired", color: "bg-yellow-100 text-yellow-700" };
    return { text: "Active", color: "bg-green-100 text-green-700" };
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-[0.4px] transition-opacity"
          onClick={onClose}
        />

        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Vouchers - {tenantName}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Manage subscription vouchers for this tenant
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            {isLoading ? (
              <div className="py-12">
                <p>Loading vouchers...</p>
              </div>
            ) : vouchers && vouchers.length > 0 ? (
              <div className="space-y-4">
                {vouchers.map((voucher) => (
                  <div
                    key={voucher.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <code className="text-lg font-mono font-bold text-[#052350]">
                              {voucher.code}
                            </code>
                            <button
                              onClick={() => copyToClipboard(voucher.code)}
                              className="p-1 text-gray-400 hover:text-[#052350] transition"
                              title="Copy code"
                            >
                              {copiedCode === voucher.code ? (
                                <FaCheck className="w-4 h-4 text-green-600" />
                              ) : (
                                <FaCopy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-medium ${getVoucherStatus(voucher).color}`}
                          >
                            {getVoucherStatus(voucher).text}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                          <div>
                            <span className="text-gray-500">Amount Off %:</span>
                            <span className="ml-2 font-semibold text-green-600">
                              {voucher.amountOff}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Expires:</span>
                            <span
                              className={`ml-2 ${isExpired(voucher.expiresAt) ? "text-red-600" : "text-gray-700"}`}
                            >
                              {formatDate(voucher.expiresAt)}
                            </span>
                          </div>
                          {voucher.usedAt && (
                            <>
                              <div>
                                <span className="text-gray-500">Used At:</span>
                                <span className="ml-2 text-gray-700">
                                  {formatDateTime(voucher.usedAt)}
                                </span>
                              </div>
                              {voucher.usedByUserId && (
                                <div>
                                  <span className="text-gray-500">
                                    Used By User ID:
                                  </span>
                                  <span className="ml-2 text-gray-700 font-mono text-xs">
                                    {voucher.usedByUserId}
                                  </span>
                                </div>
                              )}
                            </>
                          )}
                          <div>
                            <span className="text-gray-500">Created:</span>
                            <span className="ml-2 text-gray-700">
                              {formatDateTime(voucher.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start ml-4">
                        <button
                          onClick={() => handleDeleteVoucher(voucher.id)}
                          disabled={isDeleting}
                          className={`p-2 rounded-lg transition cursor-pointer text-sm font-medium flex items-center gap-1.5 ${
                            confirmDeleteId === voucher.id
                              ? "bg-red-600 text-white hover:bg-red-700"
                              : "text-gray-400 hover:text-red-600 hover:bg-red-50"
                          }`}
                          title={
                            confirmDeleteId === voucher.id
                              ? "Click again to confirm delete"
                              : "Delete voucher"
                          }
                        >
                          <FaTrash className="w-3.5 h-3.5" />
                          {confirmDeleteId === voucher.id && (
                            <span>Confirm</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No vouchers found for this tenant
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Click the "Add Voucher" button to create one
                </p>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={() => refetch()}
              className="px-4 py-2 text-sm text-[#052350] hover:text-[#041a3d] font-medium"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


// // src/components/admin/vouchers/ViewVouchersModal.tsx
// import { useState } from "react";
// import { FaTimes, FaCopy, FaCheck } from "react-icons/fa";
// import { useGetSubscriptionVouchersByTenantQuery } from "@/redux/features/admin/subscriptionVoucher/subscriptionVoucherApi";
// import { SubscriptionVoucher } from "@/redux/features/admin/subscriptionVoucher/subscriptionVoucher";

// import { toast } from "sonner";

// interface ViewVouchersModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   tenantId: string;
//   tenantName: string;
// }

// export const ViewVouchersModals = ({
//   isOpen,
//   onClose,
//   tenantId,
//   tenantName,
// }: ViewVouchersModalProps) => {
//   const {
//     data: vouchers,
//     isLoading,
//     refetch,
//   } = useGetSubscriptionVouchersByTenantQuery(tenantId, { skip: !isOpen });
//   const [copiedCode, setCopiedCode] = useState<string | null>(null);

//   const copyToClipboard = (code: string) => {
//     navigator.clipboard.writeText(code);
//     setCopiedCode(code);
//     toast.success("Voucher code copied to clipboard!");
//     setTimeout(() => setCopiedCode(null), 2000);
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

//   const isExpired = (expiresAt: string) => {
//     return new Date(expiresAt) < new Date();
//   };

//   const getVoucherStatus = (voucher: SubscriptionVoucher) => {
//     if (!voucher.isActive)
//       return { text: "Inactive", color: "bg-gray-100 text-gray-700" };
//     if (voucher.usedAt)
//       return { text: "Used", color: "bg-red-100 text-red-700" };
//     if (isExpired(voucher.expiresAt))
//       return { text: "Expired", color: "bg-yellow-100 text-yellow-700" };
//     return { text: "Active", color: "bg-green-100 text-green-700" };
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto">
//       <div className="flex min-h-screen items-center justify-center p-4">
//         <div
//           className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-[0.4px] transition-opacity"
//           onClick={onClose}
//         />

//         <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
//           <div className="flex items-center justify-between p-6 border-b border-gray-200">
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">
//                 Vouchers - {tenantName}
//               </h2>
//               <p className="text-sm text-gray-500 mt-1">
//                 Manage subscription vouchers for this tenant
//               </p>
//             </div>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-600 transition"
//             >
//               <FaTimes className="w-5 h-5" />
//             </button>
//           </div>

//           <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
//             {isLoading ? (
//               <div className="py-12">
//                 <p>Loading vouchers...</p>
//               </div>
//             ) : vouchers && vouchers.length > 0 ? (
//               <div className="space-y-4">
//                 {vouchers.map((voucher) => (
//                   <div
//                     key={voucher.id}
//                     className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
//                   >
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <div className="flex items-center gap-3 mb-2">
//                           <div className="flex items-center gap-2">
//                             <code className="text-lg font-mono font-bold text-[#052350]">
//                               {voucher.code}
//                             </code>
//                             <button
//                               onClick={() => copyToClipboard(voucher.code)}
//                               className="p-1 text-gray-400 hover:text-[#052350] transition"
//                               title="Copy code"
//                             >
//                               {copiedCode === voucher.code ? (
//                                 <FaCheck className="w-4 h-4 text-green-600" />
//                               ) : (
//                                 <FaCopy className="w-4 h-4" />
//                               )}
//                             </button>
//                           </div>
//                           <span
//                             className={`rounded-full px-2 py-1 text-xs font-medium ${getVoucherStatus(voucher).color}`}
//                           >
//                             {getVoucherStatus(voucher).text}
//                           </span>
//                         </div>

//                         <div className="grid grid-cols-2 gap-4 text-sm mt-3">
//                           <div>
//                             <span className="text-gray-500">Amount Off:</span>
//                             <span className="ml-2 font-semibold text-green-600">
//                               ${voucher.amountOff}
//                             </span>
//                           </div>
//                           <div>
//                             <span className="text-gray-500">Expires:</span>
//                             <span
//                               className={`ml-2 ${isExpired(voucher.expiresAt) ? "text-red-600" : "text-gray-700"}`}
//                             >
//                               {formatDate(voucher.expiresAt)}
//                             </span>
//                           </div>
//                           {voucher.usedAt && (
//                             <>
//                               <div>
//                                 <span className="text-gray-500">Used At:</span>
//                                 <span className="ml-2 text-gray-700">
//                                   {formatDateTime(voucher.usedAt)}
//                                 </span>
//                               </div>
//                               {voucher.usedByUserId && (
//                                 <div>
//                                   <span className="text-gray-500">
//                                     Used By User ID:
//                                   </span>
//                                   <span className="ml-2 text-gray-700 font-mono text-xs">
//                                     {voucher.usedByUserId}
//                                   </span>
//                                 </div>
//                               )}
//                             </>
//                           )}
//                           <div>
//                             <span className="text-gray-500">Created:</span>
//                             <span className="ml-2 text-gray-700">
//                               {formatDateTime(voucher.createdAt)}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <p className="text-gray-500">
//                   No vouchers found for this tenant
//                 </p>
//                 <p className="text-sm text-gray-400 mt-2">
//                   Click the "Add Voucher" button to create one
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="p-6 border-t border-gray-200 bg-gray-50">
//             <button
//               onClick={() => refetch()}
//               className="px-4 py-2 text-sm text-[#052350] hover:text-[#041a3d] font-medium"
//             >
//               Refresh
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
