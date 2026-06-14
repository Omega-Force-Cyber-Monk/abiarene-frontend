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
        {/* Plan Type Badge */}
        <div className="mb-4">
          <span
            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getPlanColor()}`}
          >
            {plan.planType}
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
        <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

        {/* Active Status */}
        {!plan.isActive && (
          <div className="mt-2">
            <span className="inline-flex px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
              Inactive
            </span>
          </div>
        )}

        {/* Select Button */}
        <button
          className={`mt-6 w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
            plan.planType === "FREE"
              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
              : "bg-[#052350] text-white hover:bg-[#061E49]"
          }`}
        >
          Select Plan
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;

// import React from "react";

// const plans = [
//   {
//     id: 1,
//     name: "BEGINNER",
//     price: 1500,
//     duration: "MO",
//     popular: false,
//   },
//   {
//     id: 2,
//     name: "THE HEADLINER",
//     price: 3200,
//     duration: "MO",
//     popular: true,
//   },
//   {
//     id: 3,
//     name: "THE PRODUCTION",
//     price: 7500,
//     duration: "MO",
//     popular: false,
//   },
// ];

// const SubscribtionCard = () => {
//   return (
//     <section className="w-full ">
//       <div>
//         <button>Create New Subscription Plan</button>
//       </div>
//       <div className=" w-full grid md:grid-cols-3 gap-8">
//         {plans.map((plan) => (
//           <div
//             key={plan.id}
//             className={`relative rounded-2xl p-8 text-center shadow-lg transition
//             ${
//               plan.popular
//                 ? "bg-gradient-to-b from-orange-50 to-white scale-105 border-2 border-orange-300"
//                 : "bg-white border border-gray-200"
//             }`}
//           >
//             {/* Badge */}
//             {plan.popular && (
//               <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-900 text-white text-xs px-4 py-1 rounded-full">
//                 MOST POPULAR
//               </div>
//             )}

//             {/* Title */}
//             <h2 className="text-lg font-semibold tracking-wider text-gray-500">
//               {plan.name}
//             </h2>

//             {/* Price */}
//             <div className="mt-6 flex items-end justify-center gap-1">
//               <span className="text-4xl font-bold text-gray-700">
//                 ${plan.price}
//               </span>
//               <span className="text-gray-400 font-medium">
//                 /{plan.duration}
//               </span>
//             </div>

//             {/* Button */}
//             <button
//               className={`mt-8 px-6 py-3 rounded-full w-full font-medium transition
//               ${
//                 plan.popular
//                   ? "bg-blue-900 text-white hover:bg-blue-800"
//                   : "bg-orange-50 text-gray-700 hover:bg-orange-100"
//               }`}
//             >
//               Select
//             </button>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default SubscribtionCard;
