import { useState } from "react";
import { ChevronRight } from "lucide-react";

type Status = "open" | "closed";

type Item = {
  id: number;
  title: string;
  description: string;
  time: string;
  status: Status;
};

const initialData: Item[] = [
  {
    id: 1,
    title: "DOUALA SUPERMARKET",
    description: "Printer driver configuration",
    time: "02:49",
    status: "closed",
  },
  {
    id: 2,
    title: "DOUALA SUPERMARKET",
    description: "Network issue troubleshooting",
    time: "01:20",
    status: "open",
  },
  {
    id: 3,
    title: "CITY MART",
    description: "POS system not responding",
    time: "00:45",
    status: "open",
  },
  {
    id: 4,
    title: "MEGA STORE",
    description: "Software installation",
    time: "03:10",
    status: "closed",
  },
  {
    id: 5,
    title: "FRESH BAZAAR",
    description: "Internet connectivity issue",
    time: "01:55",
    status: "open",
  },
  {
    id: 6,
    title: "GREEN SHOP",
    description: "Barcode scanner setup",
    time: "02:15",
    status: "closed",
  },
  {
    id: 7,
    title: "SUPER DEALS",
    description: "Payment gateway error",
    time: "01:05",
    status: "open",
  },
];

const SupportQueueDashboard = () => {
  const [data] = useState(initialData.slice(0, 4)); // only 4 cards

  const getStatusBadge = (status: Status) => {
    return status === "closed" ? (
      <span className="text-xs font-medium text-gray-400">Closed</span>
    ) : (
      <span className="text-xs font-medium text-green-600">Open</span>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-md w-full mx-auto">
      {/* Header */}
      <div className="p-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-700">Support Queue</h2>

        <span className="bg-purple-100 text-purple-600 text-sm font-semibold px-3 py-1 rounded-full">
          {data.length}
        </span>
      </div>

      {/* GRID: 2 LEFT, 2 RIGHT */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
          >
            {/* LEFT SIDE */}
            <div className="flex flex-col">
              <p className="text-sm font-semibold text-gray-700">
                {item.title}
              </p>
              <p className="text-sm text-gray-400">{item.description}</p>
              <div className="mt-1">{getStatusBadge(item.status)}</div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col items-end">
              <span className="text-sm text-gray-400">{item.time}</span>
              <ChevronRight className="w-5 h-5 text-gray-400 mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportQueueDashboard;
