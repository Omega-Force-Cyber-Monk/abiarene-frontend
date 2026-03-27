import { useState } from "react";

type Item = {
  id: number;
  title: string;
  rentID: string;
  left?: number;
};

const initialData: Item[] = [
  {
    id: 1,
    title: "Farm Chicken",
    rentID: "RENE-1001",
    left: 5,
  },
  {
    id: 2,
    title: "Farm Chicken",
    rentID: "RENE-1002",
    left: 3,
  },
];

const StockAlerts = () => {
  const [data] = useState(initialData);

  return (
    <div className="bg-white rounded-2xl shadow-md w-full mx-auto">
      {/* Header */}
      <div className="p-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-700">Stock Alerts</h2>

        <span className="bg-purple-100 text-purple-600 text-sm font-semibold px-3 py-1 rounded-full">
          Stock Alerts
        </span>
      </div>

      {/* List */}
      <div className="p-4">
        <div className="space-y-3 max-h-[210px] overflow-y-auto pr-2">
          {data.map((item) => (
            <div
              key={item.id}
              className="relative flex justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
            >
              {/* TOP RIGHT: STOCK LEFT */}

              {/* LEFT SIDE CONTENT */}
              <div className="flex flex-col space-y-2">
                <p className="text-sm font-semibold text-gray-700">
                  {item.title}
                </p>
                <p className="text-xs text-gray-400">Barcade: {item.rentID}</p>
              </div>

              {/* RESTOCK BUTTON */}

              <div className=" space-y-2">
                <p className=" text-red-500 font-semibold">5 left</p>
                <p className="text-sm text-[#067647] ">Restock</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockAlerts;
