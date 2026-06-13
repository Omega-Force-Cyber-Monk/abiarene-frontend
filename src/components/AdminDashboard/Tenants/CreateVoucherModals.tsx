// src/components/admin/vouchers/CreateVoucherModal.tsx
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useCreateSubscriptionVoucherMutation } from "@/redux/features/admin/subscriptionVoucher/subscriptionVoucherApi";
import { toast } from "sonner";

interface CreateVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  tenantId: string;
  tenantName: string;
  onSuccess: () => void;
}

export const CreateVoucherModals = ({
  isOpen,
  onClose,
  tenantId,
  tenantName,
  onSuccess,
}: CreateVoucherModalProps) => {
  const [createVoucher, { isLoading }] = useCreateSubscriptionVoucherMutation();
  const [formData, setFormData] = useState({
    code: "",
    amountOff: 0,
    expiresAt: "",
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.code.trim()) {
      toast.error("Voucher code is required");
      return;
    }

    if (formData.amountOff <= 0) {
      toast.error("Amount off must be greater than 0");
      return;
    }

    if (!formData.expiresAt) {
      toast.error("Expiration date is required");
      return;
    }

    try {
      await createVoucher({
        tenantId,
        data: {
          code: formData.code.toUpperCase(),
          amountOff: formData.amountOff,
          expiresAt: new Date(formData.expiresAt).toISOString(),
          isActive: formData.isActive,
        },
      }).unwrap();

      toast.success("Voucher created successfully!");
      onSuccess();
      onClose();
      setFormData({
        code: "",
        amountOff: 0,
        expiresAt: "",
        isActive: true,
      });
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create voucher");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-[0.4px] transition-opacity"
          onClick={onClose}
        />

        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Create Voucher for {tenantName}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 cursor-pointer hover:text-gray-600 transition"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Voucher Code *
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                placeholder="e.g., SUMMER2024"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#052350] focus:border-transparent outline-none"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Code will be automatically converted to uppercase
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount Off ($) *
              </label>
              <input
                type="number"
                value={formData.amountOff}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amountOff: parseFloat(e.target.value),
                  })
                }
                placeholder="e.g., 29"
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#052350] focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiration Date *
              </label>
              <input
                type="datetime-local"
                value={formData.expiresAt}
                onChange={(e) =>
                  setFormData({ ...formData, expiresAt: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#052350] focus:border-transparent outline-none"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#052350] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#052350]"></div>
                <span className="ml-3 text-sm font-medium text-gray-900">
                  {formData.isActive ? "Active" : "Inactive"}
                </span>
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border cursor-pointer border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-2 cursor-pointer bg-[#052350] text-white rounded-lg hover:bg-[#041a3d] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating..." : "Create Voucher"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
