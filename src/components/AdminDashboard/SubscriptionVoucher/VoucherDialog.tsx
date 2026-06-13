import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { VoucherFormData } from "@/redux/features/admin/subscriptionVoucher/subscriptionVoucher";

const PRIMARY_COLOR = "#052350";

const voucherSchema = z.object({
  code: z.string().min(1, "Voucher code is required").max(50, "Code too long"),

  amountOff: z
    .number()
    .min(1, "Amount must be at least 1")
    .max(9999, "Amount too high"),

  expiresAt: z.string().min(1, "Expiry date is required"),

  isActive: z.boolean(),
});

interface VoucherDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: VoucherFormData) => void;
  initialData?: VoucherFormData;
  title: string;
  loading?: boolean;
}

const VoucherDialog: React.FC<VoucherDialogProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
  title,
  loading = false,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VoucherFormData>({
    resolver: zodResolver(voucherSchema),

    defaultValues: {
      code: "",
      amountOff: 0,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 16),
      isActive: true,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        expiresAt: initialData.expiresAt.slice(0, 16),
      });
    } else {
      reset({
        code: "",
        amountOff: 0,
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 16),
        isActive: true,
      });
    }
  }, [initialData, reset, open]);

  const onFormSubmit = (data: VoucherFormData) => {
    onSubmit({
      ...data,
      expiresAt: new Date(data.expiresAt).toISOString(),
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center px-4 py-8">
        <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div
            className="rounded-t-2xl px-6 py-5 text-white"
            style={{ backgroundColor: PRIMARY_COLOR }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="mt-1 text-sm text-gray-200">
                  Create and manage subscription vouchers easily.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-xl transition hover:bg-white/20"
              >
                ×
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="space-y-5 px-6 py-6">
              {/* Voucher Code */}
              <Controller
                name="code"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Voucher Code
                    </label>

                    <input
                      {...field}
                      type="text"
                      placeholder="e.g. SUMMER2026"
                      disabled={loading}
                      className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm outline-none transition-all duration-200 focus:bg-white ${
                        errors.code
                          ? "border-red-500 focus:ring-2 focus:ring-red-200"
                          : "border-gray-200 focus:border-[#052350] focus:ring-4 focus:ring-[#052350]/10"
                      }`}
                    />

                    {errors.code && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.code.message}
                      </p>
                    )}
                  </div>
                )}
              />

              {/* Amount Off */}
              <Controller
                name="amountOff"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Discount Amount ($)
                    </label>

                    <input
                      {...field}
                      type="number"
                      placeholder="Enter amount"
                      disabled={loading}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm outline-none transition-all duration-200 focus:bg-white ${
                        errors.amountOff
                          ? "border-red-500 focus:ring-2 focus:ring-red-200"
                          : "border-gray-200 focus:border-[#052350] focus:ring-4 focus:ring-[#052350]/10"
                      }`}
                    />

                    {errors.amountOff && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.amountOff.message}
                      </p>
                    )}
                  </div>
                )}
              />

              {/* Expiry Date */}
              <Controller
                name="expiresAt"
                control={control}
                render={({ field }) => (
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Expiry Date & Time
                    </label>

                    <input
                      {...field}
                      type="datetime-local"
                      disabled={loading}
                      className={`w-full rounded-xl border bg-gray-50 px-4 py-3 text-sm outline-none transition-all duration-200 focus:bg-white ${
                        errors.expiresAt
                          ? "border-red-500 focus:ring-2 focus:ring-red-200"
                          : "border-gray-200 focus:border-[#052350] focus:ring-4 focus:ring-[#052350]/10"
                      }`}
                    />

                    {errors.expiresAt && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.expiresAt.message}
                      </p>
                    )}
                  </div>
                )}
              />

              {/* Active Status */}
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <label className="flex cursor-pointer items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800">
                          Active Voucher
                        </h4>
                        <p className="text-xs text-gray-500">
                          Enable or disable this voucher.
                        </p>
                      </div>

                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        disabled={loading}
                        className="h-5 w-5 cursor-pointer rounded border-gray-300 text-[#052350] focus:ring-[#052350]"
                      />
                    </label>
                  </div>
                )}
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4 rounded-b-2xl">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="cursor-pointer rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                style={{ backgroundColor: PRIMARY_COLOR }}
                className="cursor-pointer rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Voucher"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VoucherDialog;

// import React, { useEffect } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { VoucherFormData } from "@/redux/features/admin/subscriptionVoucher/subscriptionVoucher";

// const voucherSchema = z.object({
//   code: z.string().min(1, "Voucher code is required").max(50, "Code too long"),
//   amountOff: z
//     .number()
//     .min(1, "Amount must be at least 1")
//     .max(9999, "Amount too high"),
//   expiresAt: z.string().min(1, "Expiry date is required"),
//   isActive: z.boolean(),
// });

// interface VoucherDialogProps {
//   open: boolean;
//   onClose: () => void;
//   onSubmit: (data: VoucherFormData) => void;
//   initialData?: VoucherFormData;
//   title: string;
//   loading?: boolean;
// }

// const VoucherDialog: React.FC<VoucherDialogProps> = ({
//   open,
//   onClose,
//   onSubmit,
//   initialData,
//   title,
//   loading = false,
// }) => {
//   const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<VoucherFormData>({
//     resolver: zodResolver(voucherSchema),
//     defaultValues: {
//       code: "",
//       amountOff: 0,
//       expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
//         .toISOString()
//         .slice(0, 16),
//       isActive: true,
//     },
//   });

//   useEffect(() => {
//     if (initialData) {
//       reset({
//         ...initialData,
//         expiresAt: initialData.expiresAt.slice(0, 16),
//       });
//     } else {
//       reset({
//         code: "",
//         amountOff: 0,
//         expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
//           .toISOString()
//           .slice(0, 16),
//         isActive: true,
//       });
//     }
//   }, [initialData, reset, open]);

//   const onFormSubmit = (data: VoucherFormData) => {
//     onSubmit({
//       ...data,
//       expiresAt: new Date(data.expiresAt).toISOString(),
//     });
//   };

//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto">
//       <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
//         {/* Background overlay */}
//         <div
//           className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
//           onClick={onClose}
//         ></div>

//         {/* Modal panel */}
//         <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
//           <form onSubmit={handleSubmit(onFormSubmit)}>
//             <div className="bg-white px-6 pt-5 pb-4">
//               <div className="mb-4">
//                 <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
//               </div>

//               <div className="space-y-4">
//                 {/* Voucher Code */}
//                 <div>
//                   <Controller
//                     name="code"
//                     control={control}
//                     render={({ field }) => (
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Voucher Code
//                         </label>
//                         <input
//                           {...field}
//                           type="text"
//                           placeholder="e.g., SUMMER-2024"
//                           disabled={loading}
//                           className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
//                             errors.code ? "border-red-500" : "border-gray-300"
//                           }`}
//                         />
//                         {errors.code && (
//                           <p className="mt-1 text-sm text-red-600">
//                             {errors.code.message}
//                           </p>
//                         )}
//                       </div>
//                     )}
//                   />
//                 </div>

//                 {/* Amount Off */}
//                 <div>
//                   <Controller
//                     name="amountOff"
//                     control={control}
//                     render={({ field }) => (
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Amount Off ($)
//                         </label>
//                         <input
//                           {...field}
//                           type="number"
//                           placeholder="Enter discount amount"
//                           disabled={loading}
//                           onChange={(e) =>
//                             field.onChange(Number(e.target.value))
//                           }
//                           className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
//                             errors.amountOff
//                               ? "border-red-500"
//                               : "border-gray-300"
//                           }`}
//                         />
//                         {errors.amountOff && (
//                           <p className="mt-1 text-sm text-red-600">
//                             {errors.amountOff.message}
//                           </p>
//                         )}
//                       </div>
//                     )}
//                   />
//                 </div>

//                 {/* Expiry Date */}
//                 <div>
//                   <Controller
//                     name="expiresAt"
//                     control={control}
//                     render={({ field }) => (
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Expiry Date & Time
//                         </label>
//                         <input
//                           {...field}
//                           type="datetime-local"
//                           disabled={loading}
//                           className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
//                             errors.expiresAt
//                               ? "border-red-500"
//                               : "border-gray-300"
//                           }`}
//                         />
//                         {errors.expiresAt && (
//                           <p className="mt-1 text-sm text-red-600">
//                             {errors.expiresAt.message}
//                           </p>
//                         )}
//                       </div>
//                     )}
//                   />
//                 </div>

//                 {/* Active Status */}
//                 <div>
//                   <Controller
//                     name="isActive"
//                     control={control}
//                     render={({ field }) => (
//                       <label className="flex items-center gap-3 cursor-pointer">
//                         <input
//                           type="checkbox"
//                           checked={field.value}
//                           onChange={field.onChange}
//                           disabled={loading}
//                           className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                         />
//                         <span className="text-sm text-gray-700">Active</span>
//                       </label>
//                     )}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Dialog Actions */}
//             <div className="bg-gray-50 px-6 py-3 flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 disabled={loading}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? "Saving..." : "Save"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VoucherDialog;
