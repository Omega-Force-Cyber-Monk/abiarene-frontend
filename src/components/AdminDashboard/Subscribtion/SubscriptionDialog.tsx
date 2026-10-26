import React, { useEffect, useState } from "react";
import {
  CreateSubscriptionPriceRequest,
  PlanType,
  SubscriptionPrice,
} from "@/redux/features/admin/subscription/subscription";
import { useCurrencies } from "@/hooks/useCurrencies";

interface SubscriptionDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateSubscriptionPriceRequest) => void;
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
  const [formData, setFormData] = useState<CreateSubscriptionPriceRequest>({
    planType: "MONTHLY",
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
        description: initialData.description || "",
        amount: initialData.amount,
        currency: initialData.currency || "USD",
        isActive: initialData.isActive ?? true,
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
    setErrors({});
  }, [initialData, open]);

  const handlePlanTypeChange = (newPlanType: PlanType) => {
    setFormData((prev) => ({
      ...prev,
      planType: newPlanType,
      amount: newPlanType === "FREE" ? 0 : prev.amount,
    }));
    if (errors.amount) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.amount;
        return copy;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (formData.planType !== "FREE" && formData.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0 for paid plans";
    }
    if (formData.amount < 0) {
      newErrors.amount = "Amount cannot be negative";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        description: formData.description.trim(),
        amount: formData.planType === "FREE" ? 0 : Number(formData.amount),
      });
    }
  };

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLoading) {
        onClose();
      }
    };
    if (open) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, isLoading]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => {
          if (!isLoading) onClose();
        }}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl transform transition-all animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {initialData
                ? "Edit Subscription Plan"
                : "Create Subscription Plan"}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Configure plan details and pricing information
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition disabled:opacity-50"
            aria-label="Close dialog"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit}>
          {/* Body */}
          <div className="px-6 py-5 space-y-5 max-h-[70vh] overflow-y-auto">
            {/* Plan Type */}
            <div>
              <label htmlFor="sub-plan-type" className="text-sm font-medium text-gray-700">
                Plan Type <span className="text-red-500">*</span>
              </label>
              <select
                id="sub-plan-type"
                value={formData.planType}
                onChange={(e) => handlePlanTypeChange(e.target.value as PlanType)}
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
              <label htmlFor="sub-description" className="text-sm font-medium text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="sub-description"
                value={formData.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                  if (errors.description) {
                    setErrors((prev) => {
                      const copy = { ...prev };
                      delete copy.description;
                      return copy;
                    });
                  }
                }}
                rows={3}
                className={`mt-2 w-full px-4 py-2.5 border rounded-lg outline-none 
                focus:ring-2 focus:ring-[#052350] ${
                  errors.description ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Enter plan description or perks included..."
              />
              {errors.description && (
                <p className="text-xs text-red-500 mt-1">{errors.description}</p>
              )}
            </div>

            {/* Amount + Currency */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="sub-amount" className="text-sm font-medium text-gray-700">
                  Amount {formData.planType !== "FREE" && <span className="text-red-500">*</span>}
                </label>
                <div className="relative mt-2">
                  <input
                    id="sub-amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.planType === "FREE" ? 0 : formData.amount === 0 ? "" : formData.amount}
                    placeholder="0.00"
                    disabled={formData.planType === "FREE"}
                    onChange={(e) => {
                      const val = e.target.value === "" ? 0 : parseFloat(e.target.value);
                      setFormData({
                        ...formData,
                        amount: isNaN(val) ? 0 : val,
                      });
                      if (errors.amount) {
                        setErrors((prev) => {
                          const copy = { ...prev };
                          delete copy.amount;
                          return copy;
                        });
                      }
                    }}
                    className={`w-full px-4 py-2.5 border rounded-lg outline-none 
                    focus:ring-2 focus:ring-[#052350] ${
                      formData.planType === "FREE"
                        ? "bg-gray-100 cursor-not-allowed text-gray-500"
                        : ""
                    } ${errors.amount ? "border-red-500" : "border-gray-200"}`}
                  />
                </div>
                {errors.amount && (
                  <p className="text-xs text-red-500 mt-1">{errors.amount}</p>
                )}
                {formData.planType === "FREE" && (
                  <p className="text-xs text-gray-500 mt-1">Amount is locked to 0 for Free Plan</p>
                )}
              </div>

              <div>
                <label htmlFor="sub-currency" className="text-sm font-medium text-gray-700">
                  Currency
                </label>
                <select
                  id="sub-currency"
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

            {/* Toggle Active */}
            <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg border border-gray-100">
              <div>
                <span className="text-sm font-medium text-gray-800 block">
                  Active Plan
                </span>
                <span className="text-xs text-gray-500">
                  {formData.isActive ? "Plan is visible and purchasable" : "Plan is hidden / disabled"}
                </span>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={formData.isActive}
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
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 rounded-lg cursor-pointer border border-gray-200 text-gray-600 
                       hover:bg-gray-50 transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
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
        </form>
      </div>
    </div>
  );
};

export default SubscriptionDialog;
