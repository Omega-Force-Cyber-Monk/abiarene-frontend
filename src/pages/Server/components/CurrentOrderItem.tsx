import React from "react";
import { X, Minus, Plus } from "lucide-react";

interface CurrentOrderItemProps {
  name: string;
  price: number;
  quantity: number;
  customizations?: string[];
  onRemove?: () => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
}

export const CurrentOrderItem: React.FC<CurrentOrderItemProps> = ({
  name,
  price,
  quantity,
  customizations,
  onRemove,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-2 sm:mb-3 shadow-sm relative group">
      <div className="flex justify-between items-start mb-1 sm:mb-2">
        <div className="flex-1 min-w-0 pr-2">
          <h4 className="text-[#0A2540] font-semibold text-xs sm:text-sm truncate">{name}</h4>
          <p className="text-[#0A2540]/60 text-[10px] sm:text-xs font-medium mt-0.5">${price.toFixed(2)}</p>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 rounded-full px-1.5 sm:px-2 py-0.5 sm:py-1 scale-90 sm:scale-100 origin-right">
            <button 
                onClick={onDecrease}
                className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:text-black hover:border-black transition-colors"
            >
                <Minus size={10} className="sm:w-3 sm:h-3" />
            </button>
            <span className="text-xs sm:text-sm font-semibold min-w-[10px] sm:min-w-[12px] text-center">{quantity}</span>
            <button 
                onClick={onIncrease}
                className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full border border-gray-300 text-gray-400 hover:text-black hover:border-black transition-colors"
            >
                <Plus size={10} className="sm:w-3 sm:h-3" />
            </button>
        </div>

        <button 
            onClick={onRemove}
            className="text-red-400 hover:text-red-600 transition-colors ml-1 sm:ml-2 p-1"
        >
            <X size={12} className="sm:w-3.5 sm:h-3.5" />
        </button>
      </div>

      {customizations && customizations.length > 0 && (
        <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-1 sm:mt-2">
          {customizations.map((tag, index) => (
            <span 
              key={index} 
              className="px-1.5 sm:px-2 py-0.5 bg-[#E8F0FE] text-[#0A2540] text-[8px] sm:text-[10px] rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
