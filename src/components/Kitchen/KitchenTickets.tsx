import { useState } from "react";
import { MdSend } from "react-icons/md";
import print from "@/assets/primepos/logo/print.svg";

type TicketItem = {
  id: number;
  name: string;
  notes?: string[];
};

type TicketStatus = "Preparing" | "Ready" | "Completed";

type Ticket = {
  id: number;
  time: string;
  ticketNumber: string;
  items: TicketItem[];
  status: TicketStatus;
};

const initialTickets: Ticket[] = [
  {
    id: 1,
    time: "13:41",
    ticketNumber: "9418621",
    items: [
      { id: 1, name: "PANEER TIKKA", notes: ["Extra Spicy", "Well Grilled"] },
      { id: 2, name: "GARLIC NAAN", notes: ["Less Salt", "No Onion"] },
      { id: 3, name: "BUTTER RICE", notes: ["Hot"] },
    ],
    status: "Preparing",
  },
  {
    id: 2,
    time: "13:45",
    ticketNumber: "9418622",
    items: [
      { id: 1, name: "MANGO LASSI" },
      { id: 2, name: "CHICKEN BIRYANI", notes: ["Extra Spicy"] },
    ],
    status: "Preparing",
  },
  {
    id: 3,
    time: "13:50",
    ticketNumber: "9418623",
    items: [
      { id: 1, name: "PANEER TIKKA" },
      { id: 2, name: "MANGO LASSI" },
      { id: 3, name: "FRENCH FRIES", notes: ["Crispy", "Extra Salt"] },
    ],
    status: "Ready",
  },
  {
    id: 4,
    time: "13:55",
    ticketNumber: "9418624",
    items: [
      { id: 1, name: "GARLIC NAAN" },
      { id: 2, name: "CHICKEN WINGS", notes: ["BBQ Sauce"] },
    ],
    status: "Completed",
  },
  {
    id: 5,
    time: "14:00",
    ticketNumber: "9418625",
    items: [
      { id: 1, name: "VEG BURGER", notes: ["No Onion", "Extra Cheese"] },
      { id: 2, name: "COKE" },
      { id: 3, name: "ONION RINGS", notes: ["Crispy"] },
    ],
    status: "Preparing",
  },
  {
    id: 6,
    time: "14:05",
    ticketNumber: "9418626",
    items: [
      { id: 1, name: "CHICKEN PIZZA", notes: ["Thin Crust", "Extra Cheese"] },
      { id: 2, name: "LEMON JUICE", notes: ["Less Sugar"] },
    ],
    status: "Ready",
  },
  {
    id: 7,
    time: "14:10",
    ticketNumber: "9418627",
    items: [
      { id: 1, name: "FISH CURRY", notes: ["Spicy", "Hot Served"] },
      { id: 2, name: "STEAM RICE" },
      { id: 3, name: "SALAD", notes: ["No Onion", "Extra Lemon"] },
    ],
    status: "Preparing",
  },
  {
    id: 8,
    time: "14:15",
    ticketNumber: "9418628",
    items: [
      { id: 1, name: "CHOCOLATE SHAKE" },
      { id: 2, name: "FRENCH TOAST", notes: ["Maple Syrup"] },
    ],
    status: "Completed",
  },
];

export default function KitchenTickets() {
  const [activeTab, setActiveTab] = useState<"Active" | "Archive">("Active");
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);

  // Move Preparing → Ready
  const handleBumpToReady = (id: number) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "Ready" } : t)),
    );
  };

  // Move Ready → Completed (Archive)
  const handleArchive = (id: number) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "Completed" } : t)),
    );
  };

  const filteredTickets = tickets.filter((ticket) =>
    activeTab === "Active"
      ? ticket.status !== "Completed"
      : ticket.status === "Completed",
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Kitchen Production
          </h1>
          <p>Live Ticket Stream</p>
        </div>

        <div className="flex bg-gray-200 rounded-full p-1">
          {["Active", "Archive"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-1.5 text-sm rounded-full cursor-pointer transition ${
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-[#E6E7EB] rounded-2xl shadow-md flex flex-col justify-between"
          >
            <div className="p-5">
              {/* Top */}
              <div className="flex justify-between mb-3">
                <span className="text-xs text-gray-400">IN{ticket.time}</span>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
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

              <p className="text-sm text-gray-500 mb-3">
                Ticket #{ticket.ticketNumber}
              </p>

              <hr className="border-dashed border-gray-400 my-3" />

              {/* Items */}
              <ul className="space-y-2">
                {ticket.items.map((item) => (
                  <li key={item.id}>
                    <p className="font-medium text-sm">{item.name}</p>

                    {item.notes && (
                      <ul className="ml-4 text-xs text-gray-500 list-disc">
                        {item.notes.map((note, i) => (
                          <li key={i}>{note}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className=" text-center">
              {ticket.status === "Ready" && (
                <span className="text-lg font-medium mb-5 text-[#31B97A] animate-pulse">
                  WAITING FOR SERVER.......
                </span>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 flex items-center justify-between">
              <img src={print} alt="print" className="w-9 h-9" />

              {ticket.status === "Preparing" && (
                <button
                  onClick={() => handleBumpToReady(ticket.id)}
                  className="flex items-center cursor-pointer gap-2 bg-[#042554] text-white px-4 py-2 rounded-full"
                >
                  Bump to Ready <MdSend />
                </button>
              )}

              {ticket.status === "Ready" && (
                <button
                  onClick={() => handleArchive(ticket.id)}
                  className="bg-gray-600 text-white px-4 py-1.5 rounded-md"
                >
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
