type MenuModalProps = {
  tableId: number | string;
  onClose: () => void;
};

export const MenuModal = ({ tableId, onClose }: MenuModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-10">
      <div className="bg-white w-full h-full max-w-6xl rounded-3xl overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Table {tableId} Menu</h2>
          <button onClick={onClose} className="text-2xl text-gray-400">&times;</button>
        </div>

        {/* Modal Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Food Items Grid */}
          <div className="flex-[2] p-6 overflow-y-auto grid grid-cols-2 gap-4">
            {/* Map your menu items here */}
          </div>

          {/* Right: Order Summary */}
          <div className="flex-1 bg-gray-100 p-6 border-l flex flex-col">
            <h3 className="font-bold mb-4 uppercase text-xs text-gray-500">
              Current Order
            </h3>

            {/* Order list and Total price */}

            <button className="mt-auto bg-[#0A2540] text-white py-4 rounded-xl font-bold">
              SEND TO KITCHEN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};