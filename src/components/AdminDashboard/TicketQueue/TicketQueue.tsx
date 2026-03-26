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
const TicketQueue = () => {
  const [data] = useState(initialData);

  const getStatusBadge = (status: Status) => {
    return status === "closed" ? (
      <span className="text-xs font-medium text-gray-400">Closed</span>
    ) : (
      <span className="text-xs font-medium text-green-600">Open</span>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-md w-full  mx-auto">
      {/* Header */}
      <div className="p-5  flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-700">Support Queue</h2>

        {/* COUNT BADGE */}
        <span className="bg-purple-100 text-purple-600 text-sm font-semibold px-3 py-1 rounded-full">
          {data.length}
        </span>
      </div>

      {/* List */}
      <div className="p-4 space-y-3">
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
              {/* Time */}
              <span className="text-sm text-gray-400">{item.time}</span>

              {/* Arrow */}
              <ChevronRight className="w-5 h-5 text-gray-400 mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketQueue;

// import { useState } from "react";
// import { MoreVertical, CheckCircle, XCircle } from "lucide-react";

// type Status = "refund" | "resolved" | "dismissed";

// type Item = {
//   id: number;
//   name: string;
//   reason: string;
//   date: string;
//   status: Status;
// };

// const initialReports: Item[] = [
//   {
//     id: 1,
//     name: "Alex Rivera",
//     reason: "Inappropriate behavior",
//     date: "05/03/2026",
//     status: "resolved",
//   },
//   {
//     id: 2,
//     name: "Sarah Jenkins",
//     reason: "Spam messages",
//     date: "07/03/2026",
//     status: "refund",
//   },
//   {
//     id: 3,
//     name: "Marcus Chen",
//     reason: "Offensive language",
//     date: "06/03/2026",
//     status: "dismissed",
//   },
// ];

// const initialRefunds: Item[] = [
//   {
//     id: 4,
//     name: "John Carter",
//     reason: "Subscription refund",
//     date: "04/03/2026",
//     status: "refund",
//   },
//   {
//     id: 5,
//     name: "Emily Watson",
//     reason: "Duplicate payment",
//     date: "03/03/2026",
//     status: "resolved",
//   },
// ];

// const TicketQueue = () => {
//   const [activeTab, setActiveTab] = useState<"reports" | "refunds">("reports");
//   const [reports, setReports] = useState(initialReports);
//   const [refunds, setRefunds] = useState(initialRefunds);
//   const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
//   const [loading, setLoading] = useState<number | null>(null);

//   const data = activeTab === "reports" ? reports : refunds;

//   const updateStatus = async (id: number, status: Status) => {
//     setLoading(id);

//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 500));

//     const updater = (list: Item[]) =>
//       list.map((item) => (item.id === id ? { ...item, status } : item));

//     if (activeTab === "reports") {
//       setReports(updater);
//     } else {
//       setRefunds(updater);
//     }

//     setLoading(null);
//     setDropdownOpen(null);
//   };

//   const handleDropdownAction = (id: number, action: "warn" | "ban") => {
//     console.log(`${action} user with id: ${id}`);
//     setDropdownOpen(null);
//     // Add your actual logic here
//   };

//   const getStatusBadge = (status: Status) => {
//     switch (status) {
//       case "resolved":
//         return (
//           <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full whitespace-nowrap">
//             Resolved
//           </span>
//         );
//       case "dismissed":
//         return (
//           <span className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full whitespace-nowrap">
//             Dismissed
//           </span>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className=" ">
//       <div className="bg-white rounded-2xl shadow-md w-full mx-auto">
//         {/* Header - Modified for left title and right buttons */}
//         <div className="p-4 md:p-6 border-b border-gray-100">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
//               Support Queue
//             </h2>

//             {/* Tab buttons - Now on the right for desktop */}
//             <div className="flex flex-col sm:flex-row gap-2 sm:gap-0  md:w-auto">
//               <button
//                 onClick={() => setActiveTab("reports")}
//                 className={`px-4 md:px-6 py-2 md:py-3 rounded-full cursor-pointer text-sm md:text-base font-medium transition-all duration-200 whitespace-nowrap ${
//                   activeTab === "reports"
//                     ? "bg-[#FBE8FF] text-[#D043EC] shadow-md"
//                     : "bg-transparent text-[#89A2C0] hover:bg-gray-200"
//                 }`}
//               >
//                 ({reports.length})
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* List */}
//         <div className="p-4 md:p-6">
//           {data.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-gray-400">No items to display</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {data.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 relative"
//                 >
//                   {/* Left section */}
//                   <div className="flex gap-3 min-w-0 flex-1">
//                     {/* {getStatusIcon(item.status)} */}

//                     <div className="min-w-0 flex-1">
//                       <p className="font-medium text-gray-700 truncate">
//                         {item.name}
//                       </p>
//                       <p className="text-sm text-gray-400 truncate">
//                         {item.reason} • {item.date}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Right section */}
//                   <div className="flex items-center justify-end gap-3 sm:gap-4 flex-wrap sm:flex-nowrap">
//                     {/* Loading state */}
//                     {loading === item.id && (
//                       <div className="absolute inset-0 bg-white bg-opacity-50 rounded-xl flex items-center justify-center">
//                         <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
//                       </div>
//                     )}

//                     {/* Refund action buttons */}
//                     {item.status === "refund" && (
//                       <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm">
//                         <button
//                           onClick={() => updateStatus(item.id, "resolved")}
//                           disabled={loading !== null}
//                           className="p-1 hover:bg-green-50 rounded-md transition-all duration-200 disabled:opacity-50"
//                           title="Resolve"
//                         >
//                           <CheckCircle className="text-green-600 w-5 h-5" />
//                         </button>
//                         <button
//                           onClick={() => updateStatus(item.id, "dismissed")}
//                           disabled={loading !== null}
//                           className="p-1 hover:bg-red-50 rounded-md transition-all duration-200 disabled:opacity-50"
//                           title="Dismiss"
//                         >
//                           <XCircle className="text-red-500 w-5 h-5" />
//                         </button>
//                       </div>
//                     )}

//                     {/* Status badges */}
//                     {getStatusBadge(item.status)}

//                     {/* Dropdown */}
//                     <div className="relative">
//                       <button
//                         onClick={() =>
//                           setDropdownOpen(
//                             dropdownOpen === item.id ? null : item.id,
//                           )
//                         }
//                         className="p-1 hover:bg-gray-200 rounded-full transition-colors"
//                         aria-label="More options"
//                       >
//                         <MoreVertical className="text-gray-400 w-5 h-5" />
//                       </button>

//                       {dropdownOpen === item.id && (
//                         <>
//                           {/* Backdrop for mobile */}
//                           <div
//                             className="fixed inset-0 z-10 sm:hidden"
//                             onClick={() => setDropdownOpen(null)}
//                           />

//                           {/* Dropdown menu */}
//                           <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
//                             <button
//                               onClick={() =>
//                                 handleDropdownAction(item.id, "warn")
//                               }
//                               className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700 transition-colors"
//                             >
//                               Send Warning
//                             </button>
//                             <button
//                               onClick={() =>
//                                 handleDropdownAction(item.id, "ban")
//                               }
//                               className="w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm text-red-600 transition-colors"
//                             >
//                               Ban User
//                             </button>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TicketQueue;
