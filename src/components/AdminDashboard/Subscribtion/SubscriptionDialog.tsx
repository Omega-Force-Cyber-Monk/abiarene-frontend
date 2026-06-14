import React, { useEffect, useState } from "react";
import {
  PlanType,
  SubscriptionPrice,
} from "@/redux/features/admin/subscription/subscription";
import { useCurrencies } from "@/hooks/useCurrencies";

interface SubscriptionDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: SubscriptionPrice | null;
  isLoading: boolean;
}

const SubscriptionDialog: React.FC<SubscriptionDialogProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}) => {
  const [formData, setFormData] = useState({
    planType: "MONTHLY" as PlanType,
    description: "",
    amount: 0,
    currency: "USD",
    isActive: true,
  });

  const { currencies } = useCurrencies();

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        planType: initialData.planType,
        description: initialData.description,
        amount: initialData.amount,
        currency: initialData.currency,
        isActive: initialData.isActive,
      });
    } else {
      setFormData({
        planType: "MONTHLY",
        description: "",
        amount: 0,
        currency: "USD",
        isActive: true,
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (formData.amount <= 0 && formData.planType !== "FREE") {
      newErrors.amount = "Amount must be greater than 0";
    }
    if (formData.amount < 0) {
      newErrors.amount = "Amount cannot be negative";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 rounded-2xl bg-white shadow-2xl transform transition-all">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900">
            {initialData
              ? "Edit Subscription Plan"
              : "Create Subscription Plan"}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Configure plan details and pricing information
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Plan Type */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Plan Type
            </label>
            <select
              value={formData.planType}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  planType: e.target.value as PlanType,
                })
              }
              className="mt-2 w-full px-4 py-2.5 border border-gray-200 rounded-lg 
                       focus:ring-2 focus:ring-[#052350] focus:border-[#052350] outline-none"
            >
              <option value="FREE">Free Plan</option>
              <option value="MONTHLY">Monthly Plan</option>
              <option value="YEARLY">Yearly Plan</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className={`mt-2 w-full px-4 py-2.5 border rounded-lg outline-none 
              focus:ring-2 focus:ring-[#052350] ${
                errors.description ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="Enter plan description..."
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Amount + Currency */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                value={formData.amount}
                disabled={formData.planType === "FREE"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amount: parseFloat(e.target.value) || 0,
                  })
                }
                className={`mt-2 w-full px-4 py-2.5 border rounded-lg outline-none 
                focus:ring-2 focus:ring-[#052350] ${
                  formData.planType === "FREE"
                    ? "bg-gray-100 cursor-not-allowed"
                    : ""
                } ${errors.amount ? "border-red-500" : "border-gray-200"}`}
              />
              {errors.amount && (
                <p className="text-xs text-red-500 mt-1">{errors.amount}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Currency
              </label>
              <select
                value={formData.currency}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    currency: e.target.value,
                  })
                }
                className="mt-2 w-full px-4 py-2.5 border border-gray-200 rounded-lg 
                         focus:ring-2 focus:ring-[#052350] outline-none"
              >
                {currencies.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.code} - {curr.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Toggle */}
          <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg">
            <span className="text-sm font-medium text-gray-700">
              Active Plan
            </span>

            <button
              type="button"
              onClick={() =>
                setFormData({ ...formData, isActive: !formData.isActive })
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition 
              ${formData.isActive ? "bg-[#052350]" : "bg-gray-300"}`}
            >
              <span
                className={`inline-block h-5 w-5 transform bg-white rounded-full transition 
                ${formData.isActive ? "translate-x-5" : "translate-x-1"}`}
              />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg cursor-pointer border border-gray-200 text-gray-600 
                     hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-5 py-2 cursor-pointer rounded-lg bg-[#052350] text-white font-medium 
                     hover:bg-[#061E49] transition disabled:opacity-50"
          >
            {isLoading
              ? "Processing..."
              : initialData
                ? "Update Plan"
                : "Create Plan"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDialog;
