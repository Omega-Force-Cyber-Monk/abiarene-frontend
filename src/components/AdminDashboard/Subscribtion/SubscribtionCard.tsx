import React, { useState } from "react";
import { SubscriptionPrice } from "@/redux/features/admin/subscription/subscription";
import { getCurrencySymbol } from "@/hooks/useCurrencies";

interface SubscriptionCardProps {
  plan: SubscriptionPrice;
  onEdit: (plan: SubscriptionPrice) => void;
  onDelete: (id: string) => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  plan,
  onEdit,
  onDelete,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const getPlanColor = () => {
    switch (plan.planType) {
      case "FREE":
        return "bg-gray-100 text-gray-700";
      case "MONTHLY":
        return "bg-blue-100 text-blue-700";
      case "YEARLY":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getAmountDisplay = () => {
    if (plan.planType === "FREE") {
      return "FREE";
    }
    const symbol = getCurrencySymbol(plan.currency);
    return `${symbol}${plan.amount.toFixed(2)}`;
  };

  const getDurationDisplay = () => {
    switch (plan.planType) {
      case "MONTHLY":
        return "/month";
      case "YEARLY":
        return "/year";
      default:
        return "";
    }
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Menu Button */}
      <div className="absolute top-4 right-4">
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>

          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl z-20">
                <div className="py-2">
                  <button
                    onClick={() => {
                      onEdit(plan);
                      setShowMenu(false);
                    }}
                    className="flex w-full cursor-pointer items-center px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      onDelete(plan.id);
                      setShowMenu(false);
                    }}
                    className="flex w-full cursor-pointer items-center px-4 py-3 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-gray-100 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="p-6 text-center">
        {/* Badges */}
        <div className="mb-4 flex items-center justify-center gap-2">
          <span
            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getPlanColor()}`}
          >
            {plan.planType}
          </span>
          <span
            className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
              plan.isActive
                ? "bg-green-100 text-green-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {plan.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Plan Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>

        {/* Price */}
        <div className="mt-4 mb-3">
          <span className="text-4xl font-bold text-gray-900">
            {getAmountDisplay()}
          </span>
          <span className="text-gray-500 text-sm">{getDurationDisplay()}</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 min-h-[40px] flex items-center justify-center">
          {plan.description || "No description provided"}
        </p>

        {/* Edit Action Button */}
        <button
          onClick={() => onEdit(plan)}
          className="mt-6 w-full py-2.5 px-4 rounded-xl font-medium cursor-pointer border border-[#052350] text-[#052350] hover:bg-[#052350] hover:text-white transition-all duration-200"
        >
          Edit Plan
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
