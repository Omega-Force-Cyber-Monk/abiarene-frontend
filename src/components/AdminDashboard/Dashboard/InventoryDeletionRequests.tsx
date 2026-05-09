import { useState } from "react";

import { FaRegCircleCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";

type Item = {
  id: number;
  title: string;
  rentID: string;
};

const initialData: Item[] = [
  {
    id: 1,
    title: "Onion",
    rentID: "RENE-3878",
  },
  {
    id: 2,
    title: "Onion",
    rentID: "RENE-3879",
  },
  {
    id: 3,
    title: "Onion",
    rentID: "RENE-3880",
  },
  {
    id: 4,
    title: "Onion",
    rentID: "RENE-3881",
  },
];

const InventoryDeletionRequests = () => {
  const [data] = useState(initialData);

  return (
    <div className="bg-white rounded-2xl shadow-md w-full mx-auto">
      {/* Header */}
      <div className="p-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-700">
          Inventory Deletion Requests
        </h2>

        <span className="bg-purple-100 text-purple-600 text-sm font-semibold px-3 py-1 rounded-full">
          {data.length}
        </span>
      </div>

      {/* List */}
      {/* <div className="p-4 space-y-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
          >
           
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-gray-700">
                {item.title}
              </p>
              <p className="text-xs text-gray-400">ID{item.rentID}</p>
            </div>

           
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full bg-[#061B43] hover:bg-green-100 transition">
                <FaRegCircleCheck className="w-5 h-5 text-white" />
              </button>

              <button>
                <RxCrossCircled className="w-10 h-10 text-[#061B43]" />
              </button>
            </div>
          </div>
        ))}
      </div> */}
      {/* List */}
      <div className="p-4">
        <div className="space-y-3 max-h-[210px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
            >
              {/* LEFT SIDE */}
              <div className="flex flex-col space-y-3">
                <p className="text-sm font-semibold text-gray-700">
                  {item.title}
                </p>
                <p className="text-xs text-gray-400">ID{item.rentID}</p>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex items-center gap-3">
                <button className="p-2 rounded-full bg-[#061B43] cursor-pointer ">
                  <FaRegCircleCheck className="w-5 h-5 text-white" />
                </button>

                <button className="cursor-pointer">
                  <RxCrossCircled className="w-10 h-10 text-[#061B43]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InventoryDeletionRequests;
