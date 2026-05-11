import { useState } from "react";
import { MessageCircle } from "lucide-react";
import AdminTicketList from "./components/AdminTicketList";
import AdminTicketChat from "./components/AdminTicketChat";

const TicketQueue = () => {
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl w-full overflow-hidden border border-gray-100/50 mt-10" style={{ height: "750px" }}>
      <div className="flex h-full">

        {/* LEFT: Ticket List */}
        <div
          className={`border-r border-gray-50 flex flex-col overflow-hidden transition-all duration-300 w-full md:w-[420px] shrink-0 ${
            selectedTicketId ? "hidden md:flex" : "flex"
          }`}
        >
          <AdminTicketList
            selectedId={selectedTicketId}
            onSelect={setSelectedTicketId}
          />
        </div>

        {/* RIGHT: Chat Panel / Empty State */}
        <div 
          className={`flex-1 flex flex-col overflow-hidden bg-white relative ${
            selectedTicketId ? "flex" : "hidden md:flex"
          }`}
        >
          {selectedTicketId ? (
            <>
              {/* Mobile back button */}
              <div className="md:hidden px-4 pt-3 absolute top-0 left-0 z-10">
                <button
                  onClick={() => setSelectedTicketId(null)}
                  className="text-xs font-bold text-[#0A1F4E] bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-100 shadow-sm hover:bg-white transition-all cursor-pointer flex items-center gap-1"
                >
                  ← Back
                </button>
              </div>
              <AdminTicketChat ticketId={selectedTicketId} />
            </>
          ) : (
            /* Empty state */
            <div className="flex-1 flex flex-col items-center justify-center bg-[#F8FAFC]/30 gap-6 p-12 text-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-[2.5rem] bg-white shadow-xl flex items-center justify-center text-[#0A1F4E] animate-bounce-subtle">
                  <MessageCircle size={40} strokeWidth={1.5} />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-blue-400 border-4 border-white shadow-lg animate-pulse" />
              </div>
              <div className="max-w-xs space-y-2">
                <h3 className="text-xl font-black text-[#1E293B]">Admin Control Hub</h3>
                <p className="text-[13px] text-slate-400 font-bold leading-relaxed uppercase tracking-tight">
                  Select a support session to assist tenants and manage ticket status
                </p>
              </div>
              
              <style>{`
                @keyframes bounce-subtle {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-8px); }
                }
                .animate-bounce-subtle {
                  animation: bounce-subtle 3s ease-in-out infinite;
                }
              `}</style>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketQueue;

// import { ChevronRight } from "lucide-react";
// import {
//   useGetSupportTicketsQuery,
//   useUpdateSupportTicketMutation,
// } from "@/redux/features/manager/support/supportApi";
// import {
//   statusColors,
//   statusLabels,
//   SupportStatus,
// } from "@/redux/features/manager/support/supportTypes";
// import { useState } from "react";

// const TicketQueue = () => {
//   const {
//     data: tickets,
//     isLoading,
//     error,
//     refetch,
//   } = useGetSupportTicketsQuery();
//   const [updateTicket] = useUpdateSupportTicketMutation();
//   const [updatingId, setUpdatingId] = useState<string | null>(null);

//   const formatTime = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };

//   const handleStatusChange = async (
//     id: string,
//     currentStatus: SupportStatus,
//   ) => {
//     setUpdatingId(id);
//     try {
//       let newStatus: SupportStatus = "OPEN";
//       switch (currentStatus) {
//         case "OPEN":
//           newStatus = "IN_PROGRESS";
//           break;
//         case "IN_PROGRESS":
//           newStatus = "RESOLVED";
//           break;
//         case "RESOLVED":
//           newStatus = "CLOSED";
//           break;
//         case "CLOSED":
//           newStatus = "CLOSED";
//           break;
//       }
//       await updateTicket({ id, data: { status: newStatus } }).unwrap();
//       refetch();
//     } catch (err) {
//       console.error("Failed to update ticket status:", err);
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="bg-white rounded-2xl shadow-md w-full mx-auto p-8">
//         <div className="flex justify-center items-center">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-white rounded-2xl shadow-md w-full mx-auto p-8">
//         <div className="text-center text-red-500">
//           Failed to load tickets. Please try again later.
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-2xl shadow-md w-full mx-auto">
//       {/* Header */}
//       <div className="p-5 flex items-center justify-between border-b border-gray-100">
//         <h2 className="text-lg font-semibold text-gray-700">Support Queue</h2>

//         {/* COUNT BADGE */}
//         <span className="bg-purple-100 text-purple-600 text-sm font-semibold px-3 py-1 rounded-full">
//           {tickets?.length || 0}
//         </span>
//       </div>

//       {/* List */}
//       <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto">
//         {tickets && tickets.length > 0 ? (
//           tickets.map((ticket) => (
//             <div
//               key={ticket.id}
//               className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer"
//               onClick={() => handleStatusChange(ticket.id, ticket.status)}
//             >
//               {/* LEFT SIDE */}
//               <div className="flex flex-col flex-1">
//                 <div className="flex items-center gap-2 mb-1">
//                   <p className="text-sm font-semibold text-gray-700">
//                     {ticket.subject}
//                   </p>
//                   {updatingId === ticket.id && (
//                     <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
//                   )}
//                 </div>

//                 <p className="text-sm text-gray-500 line-clamp-2">
//                   {ticket.message.length > 100
//                     ? `${ticket.message.substring(0, 100)}...`
//                     : ticket.message}
//                 </p>

//                 <div className="flex items-center gap-2 mt-2">
//                   <span
//                     className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[ticket.status]}`}
//                   >
//                     {statusLabels[ticket.status]}
//                   </span>
//                   <span className="text-xs text-gray-400">
//                     {formatDate(ticket.createdAt)}
//                   </span>
//                 </div>

//                 {ticket.response && (
//                   <p className="text-xs text-green-600 mt-1">
//                     Response: {ticket.response}
//                   </p>
//                 )}
//               </div>

//               {/* RIGHT SIDE */}
//               <div className="flex flex-col items-end ml-4">
//                 {/* Time */}
//                 <span className="text-sm text-gray-400">
//                   {formatTime(ticket.createdAt)}
//                 </span>

//                 {/* Arrow */}
//                 <ChevronRight className="w-5 h-5 text-gray-400 mt-2" />
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center py-8 text-gray-500">
//             No support tickets found
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TicketQueue;

// import { useState } from "react";
// import { ChevronRight } from "lucide-react";

// type Status = "open" | "closed";

// type Item = {
//   id: number;
//   title: string;
//   description: string;
//   time: string;
//   status: Status;
// };

// const initialData: Item[] = [
//   {
//     id: 1,
//     title: "DOUALA SUPERMARKET",
//     description: "Printer driver configuration",
//     time: "02:49",
//     status: "closed",
//   },
//   {
//     id: 2,
//     title: "DOUALA SUPERMARKET",
//     description: "Network issue troubleshooting",
//     time: "01:20",
//     status: "open",
//   },
//   {
//     id: 3,
//     title: "CITY MART",
//     description: "POS system not responding",
//     time: "00:45",
//     status: "open",
//   },
//   {
//     id: 4,
//     title: "MEGA STORE",
//     description: "Software installation",
//     time: "03:10",
//     status: "closed",
//   },
// ];
// const TicketQueue = () => {
//   const [data] = useState(initialData);

//   const getStatusBadge = (status: Status) => {
//     return status === "closed" ? (
//       <span className="text-xs font-medium text-gray-400">Closed</span>
//     ) : (
//       <span className="text-xs font-medium text-green-600">Open</span>
//     );
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-md w-full  mx-auto">
//       {/* Header */}
//       <div className="p-5  flex items-center justify-between">
//         <h2 className="text-lg font-semibold text-gray-700">Support Queue</h2>

//         {/* COUNT BADGE */}
//         <span className="bg-purple-100 text-purple-600 text-sm font-semibold px-3 py-1 rounded-full">
//           {data.length}
//         </span>
//       </div>

//       {/* List */}
//       <div className="p-4 space-y-3">
//         {data.map((item) => (
//           <div
//             key={item.id}
//             className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
//           >
//             {/* LEFT SIDE */}
//             <div className="flex flex-col">
//               <p className="text-sm font-semibold text-gray-700">
//                 {item.title}
//               </p>

//               <p className="text-sm text-gray-400">{item.description}</p>

//               <div className="mt-1">{getStatusBadge(item.status)}</div>
//             </div>

//             {/* RIGHT SIDE */}
//             <div className="flex flex-col items-end">
//               {/* Time */}
//               <span className="text-sm text-gray-400">{item.time}</span>

//               {/* Arrow */}
//               <ChevronRight className="w-5 h-5 text-gray-400 mt-2" />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TicketQueue;
