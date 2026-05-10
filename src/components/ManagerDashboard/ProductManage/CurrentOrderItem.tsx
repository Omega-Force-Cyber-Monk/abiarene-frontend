// components/CurrentOrderItem.tsx

export interface CurrentOrderItemProps {
  name: string;
  price: number;
  quantity: number;
  customizations?: string[];
}

export const CurrentOrderItem = ({
  name,
  price,
  quantity,
  customizations,
}: CurrentOrderItemProps) => {
  return (
    <div className="mb-4 pb-4 border-b border-gray-200 last:border-0">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-800">{name}</span>
            <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
              x{quantity}
            </span>
          </div>
          {customizations && customizations.length > 0 && (
            <div className="mt-1 flex flex-wrap gap-1">
              {customizations.slice(0, 2).map((custom, idx) => (
                <span
                  key={idx}
                  className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full"
                >
                  {custom}
                </span>
              ))}
              {customizations.length > 2 && (
                <span className="text-xs text-gray-400">
                  +{customizations.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
        <span className="font-semibold text-gray-700">
          ${(price * quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
};
