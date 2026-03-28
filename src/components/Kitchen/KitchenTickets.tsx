import { useState } from "react";
// import { FiPrinter } from "react-icons/fi";

import { MdSend } from "react-icons/md";
import print from "@/assets/primepos/logo/print.svg";

type TicketItem = {
  id: number;
  name: string;
  notes?: string[];
};

type Ticket = {
  id: number;
  time: string;
  ticketNumber: string;
  items: TicketItem[];
  status: "Preparing" | "Ready" | "Completed";
};

const initialTickets: Ticket[] = [
  {
    id: 1,
    time: "13:41",
    ticketNumber: "9418621",
    items: [
      { id: 1, name: "PANEER TIKKA", notes: ["Extra Spicy"] },
      { id: 2, name: "GARLIC NAAN", notes: ["Less Salt", "No Onion"] },
      { id: 3, name: "MANGO LASSI" },
    ],
    status: "Preparing",
  },
  {
    id: 2,
    time: "13:41",
    ticketNumber: "9418621",
    items: [
      { id: 1, name: "PANEER TIKKA" },
      { id: 2, name: "GARLIC NAAN" },
      { id: 3, name: "MANGO LASSI" },
    ],
    status: "Preparing",
  },
  {
    id: 3,
    time: "13:41",
    ticketNumber: "9418621",
    items: [
      { id: 1, name: "PANEER TIKKA" },
      { id: 2, name: "MANGO LASSI" },
    ],
    status: "Ready",
  },
  {
    id: 4,
    time: "13:41",
    ticketNumber: "9418621",
    items: [
      { id: 1, name: "PANEER TIKKA", notes: ["Extra Spicy"] },
      { id: 2, name: "MANGO LASSI" },
    ],
    status: "Ready",
  },
  {
    id: 5,
    time: "13:41",
    ticketNumber: "9418621",
    items: [
      { id: 1, name: "PANEER TIKKA", notes: ["Extra Spicy"] },
      { id: 2, name: "GARLIC NAAN", notes: ["Less Salt", "No Onion"] },
      { id: 3, name: "MANGO LASSI" },
    ],
    status: "Completed",
  },
];

export default function KitchenTickets() {
  const [activeTab, setActiveTab] = useState<"Active" | "Archive">("Active");

  const filteredTickets = initialTickets.filter((ticket) =>
    activeTab === "Active"
      ? ticket.status !== "Completed"
      : ticket.status === "Completed",
  );

  return (
    <div className="p-6 ">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Kitchen Production
        </h1>

        <div className="flex bg-gray-200 rounded-full p-1">
          {["Active", "Archive"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-1.5 text-sm rounded-full transition ${
                activeTab === tab
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-[#E6E7EB] rounded-2xl  shadow-md hover:shadow-md transition flex flex-col justify-between"
          >
            {/* Card Body */}
            <div className="p-5">
              {/* Top */}
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-gray-400">{ticket.time}</span>

                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    ticket.status === "Preparing"
                      ? "bg-yellow-100 text-yellow-700"
                      : ticket.status === "Ready"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {ticket.status}
                </span>
              </div>

              {/* Ticket ID */}
              <p className="text-sm text-gray-500 mb-3">
                Ticket #{ticket.ticketNumber}
              </p>

              {/* Items */}
              <ul className="space-y-2">
                {ticket.items.map((item) => (
                  <li key={item.id}>
                    <p className="font-medium text-gray-800 text-sm">
                      {item.name}
                    </p>

                    {item.notes && (
                      <ul className="ml-4 mt-1 text-xs text-gray-500 list-disc">
                        {item.notes.map((note, idx) => (
                          <li key={idx}>{note}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer */}
            <div className="border-t px-5 py-3 flex items-center justify-between">
              {/* Print Icon */}
              <button className="flex items-center gap-2 text-gray-500 hover:text-black text-sm">
                {/* <FiPrinter />
                Print */}
                <img src={print} alt="" />
              </button>

              {/* Action Button */}
              {ticket.status === "Preparing" && (
                <button className="flex items-center gap-2 bg-[#042554] hover:bg-[#031c3f] text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-200">
                  <span>Bump to Ready</span>
                  <MdSend className="text-lg" />
                </button>
              )}

              {ticket.status === "Ready" && (
                <button className="bg-gray-500 hover:bg-gray-600 text-white text-sm px-4 py-1.5 rounded-md transition">
                  Archive
                </button>
              )}

              {ticket.status === "Completed" && (
                <span className="text-xs text-gray-400">Completed</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
