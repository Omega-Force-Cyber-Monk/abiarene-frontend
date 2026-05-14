import { ChevronRight, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  useGetAdminSupportTicketsQuery,
  useUpdateAdminSupportTicketMutation,
} from "@/redux/features/admin/support/adminsupportApi";
import {
  statusColors,
  statusLabels,
  SupportStatus,
  SupportTicket,
} from "@/redux/features/admin/support/adminsupportTypes";
import { useState } from "react";

const SupportQueueDashboard = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const {
    data: ticketsResponse,
    isLoading,
    error,
    refetch,
  } = useGetAdminSupportTicketsQuery({ page, limit: 20 });
  const [updateTicket] = useUpdateAdminSupportTicketMutation();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Extract tickets from response
  const tickets = ticketsResponse?.data || [];
  const totalCount = ticketsResponse?.meta?.total || 0;
  const totalPages = ticketsResponse?.meta?.totalPages || 0;

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const getFirstMessage = (ticket: SupportTicket) => {
    if (ticket.messages && ticket.messages.length > 0) {
      return ticket.messages[0].message;
    }
    return ticket.description || "No message";
  };

  const getLatestMessage = (ticket: SupportTicket) => {
    if (ticket.messages && ticket.messages.length > 0) {
      const latestMessage = ticket.messages[ticket.messages.length - 1];
      return {
        message: latestMessage.message,
        senderRole: latestMessage.senderRole,
        time: latestMessage.createdAt,
      };
    }
    return null;
  };

  const getSubject = (ticket: SupportTicket) => {
    return ticket.issueType || `Ticket ${ticket.id.slice(0, 8)}`;
  };

  const getUnreadCount = (ticket: SupportTicket) => {
    // Assuming messages from MANAGER are unread for admin
    return (
      ticket.messages?.filter((msg) => msg.senderRole === "MANAGER").length || 0
    );
  };

  const handleTicketClick = (ticketId: string) => {
    navigate(`/admin-dashboard/ticket-queue`);
  };

  const handleStatusChange = async (
    e: React.MouseEvent,
    id: string,
    currentStatus: SupportStatus,
  ) => {
    e.stopPropagation();
    setUpdatingId(id);
    try {
      let newStatus: SupportStatus = "OPEN";
      switch (currentStatus) {
        case "OPEN":
          newStatus = "IN_PROGRESS";
          break;
        case "IN_PROGRESS":
          newStatus = "RESOLVED";
          break;
        case "RESOLVED":
          newStatus = "CLOSED";
          break;
        case "CLOSED":
          newStatus = "CLOSED";
          break;
      }
      await updateTicket({ id, data: { status: newStatus } }).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to update ticket status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-md w-full mx-auto p-8">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-md w-full mx-auto p-8">
        <div className="text-center text-red-500">
          Failed to load tickets. Please try again later.
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md w-full mx-auto">
      {/* Header */}
      <div className="p-5 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-gray-700">Support Queue</h2>
          <span className="bg-purple-100 text-purple-600 text-sm font-semibold px-3 py-1 rounded-full">
            {totalCount}
          </span>
        </div>
        <button
          onClick={handleRefresh}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* List */}
      <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
        {tickets.length > 0 ? (
          tickets.map((ticket: SupportTicket) => {
            const unreadCount = getUnreadCount(ticket);
            const latestMessage = getLatestMessage(ticket);

            return (
              <div
                key={ticket.id}
                className={`flex items-start justify-between p-4 rounded-xl hover:shadow-md transition-all cursor-pointer ${
                  unreadCount > 0
                    ? "bg-purple-50 border-l-4 border-l-purple-500"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
                onClick={() => handleTicketClick(ticket.id)}
              >
                {/* LEFT SIDE */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <p className="text-sm font-semibold text-gray-700">
                      {getSubject(ticket)}
                    </p>
                    {ticket.tenant && (
                      <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded">
                        {ticket.tenant.name}
                      </span>
                    )}
                    {updatingId === ticket.id && (
                      <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {unreadCount > 0 && (
                      <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {getFirstMessage(ticket)}
                  </p>

                  {latestMessage &&
                    latestMessage.message !== getFirstMessage(ticket) && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                          <span className="font-medium">
                            {latestMessage.senderRole === "ADMIN"
                              ? "Admin: "
                              : "Customer: "}
                          </span>
                          {latestMessage.message.length > 80
                            ? `${latestMessage.message.substring(0, 80)}...`
                            : latestMessage.message}
                        </p>
                      </div>
                    )}

                  <div className="flex items-center gap-3 mt-3 flex-wrap">
                    <button
                      onClick={(e) =>
                        handleStatusChange(e, ticket.id, ticket.status)
                      }
                      className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[ticket.status]} hover:opacity-80 transition`}
                    >
                      {statusLabels[ticket.status]}
                    </button>
                    <span className="text-xs text-gray-400">
                      Messages: {ticket.messages?.length || 0}
                    </span>
                    <span className="text-xs text-gray-400">
                      Created: {formatDate(ticket.createdAt)}
                    </span>
                    <span
                      className="text-xs text-gray-400"
                      title={new Date(ticket.updatedAt).toLocaleString()}
                    >
                      Updated: {formatRelativeTime(ticket.updatedAt)}
                    </span>
                  </div>

                  {ticket.response && (
                    <p className="text-xs text-green-600 mt-2 bg-green-50 p-2 rounded">
                      Response: {ticket.response}
                    </p>
                  )}
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col items-end ml-4 flex-shrink-0">
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {formatTime(ticket.createdAt)}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 mt-2" />
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">📭</div>
            <p className="text-gray-500">No support tickets found</p>
            <p className="text-xs text-gray-400 mt-1">
              Tickets will appear here when customers submit support requests
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 text-sm bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 text-sm bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SupportQueueDashboard;

// import { ChevronRight } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import {
//   useGetAdminSupportTicketsQuery,
//   useUpdateAdminSupportTicketMutation,
// } from "@/redux/features/admin/support/adminsupportApi";
// import {
//   statusColors,
//   statusLabels,
//   SupportStatus,
//   SupportTicket,
// } from "@/redux/features/admin/support/adminsupportTypes";
// import { useState } from "react";

// const SupportQueueDashboard = () => {
//   const navigate = useNavigate();
//   const {
//     data: tickets,
//     isLoading,
//     error,
//     refetch,
//   } = useGetAdminSupportTicketsQuery();
//   const [updateTicket] = useUpdateAdminSupportTicketMutation();
//   const [updatingId, setUpdatingId] = useState<string | null>(null);

//   const formatTime = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };

//   const getFirstMessage = (ticket: SupportTicket) => {
//     if (ticket.messages && ticket.messages.length > 0) {
//       return ticket.messages[0].message;
//     }
//     return ticket.description || "No message";
//   };

//   const getSubject = (ticket: SupportTicket) => {
//     return ticket.issueType || `Ticket ${ticket.id.slice(0, 8)}`;
//   };

//   const handleTicketClick = (ticketId: string) => {
//     navigate(`/admin-dashboard/ticket-queue/${ticketId}`);
//   };

//   const handleStatusChange = async (
//     e: React.MouseEvent,
//     id: string,
//     currentStatus: SupportStatus,
//   ) => {
//     e.stopPropagation();
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
//           tickets.map((ticket: SupportTicket) => (
//             <div
//               key={ticket.id}
//               className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer"
//               onClick={() => handleTicketClick(ticket.id)}
//             >
//               {/* LEFT SIDE */}
//               <div className="flex flex-col flex-1">
//                 <div className="flex items-center gap-2 mb-1">
//                   <p className="text-sm font-semibold text-gray-700">
//                     {getSubject(ticket)}
//                   </p>
//                   {ticket.tenant && (
//                     <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded">
//                       {ticket.tenant.name}
//                     </span>
//                   )}
//                   {updatingId === ticket.id && (
//                     <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
//                   )}
//                 </div>

//                 <p className="text-sm text-gray-500 line-clamp-2">
//                   {getFirstMessage(ticket).length > 100
//                     ? `${getFirstMessage(ticket).substring(0, 100)}...`
//                     : getFirstMessage(ticket)}
//                 </p>

//                 <div className="flex items-center gap-2 mt-2">
//                   <button
//                     onClick={(e) =>
//                       handleStatusChange(e, ticket.id, ticket.status)
//                     }
//                     className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[ticket.status]} hover:opacity-80 transition`}
//                   >
//                     {statusLabels[ticket.status]}
//                   </button>
//                   <span className="text-xs text-gray-400">
//                     {formatDate(ticket.createdAt)}
//                   </span>
//                   <span className="text-xs text-gray-400">
//                     Messages: {ticket.messages?.length || 0}
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

// export default SupportQueueDashboard;

// import { ChevronRight } from "lucide-react";
// import {
//   useGetAdminSupportTicketsQuery,
//   useUpdateAdminSupportTicketMutation,
// } from "@/redux/features/admin/support/adminsupportApi";
// import {
//   statusColors,
//   statusLabels,
//   SupportStatus,
// } from "@/redux/features/admin/support/adminsupportTypes";
// import { useState } from "react";

// const SupportQueueDashboard = () => {
//   const {
//     data: tickets,
//     isLoading,
//     error,
//     refetch,
//   } = useGetAdminSupportTicketsQuery();
//   const [updateTicket] = useUpdateAdminSupportTicketMutation();
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

// export default SupportQueueDashboard;

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
//   {
//     id: 5,
//     title: "FRESH BAZAAR",
//     description: "Internet connectivity issue",
//     time: "01:55",
//     status: "open",
//   },
//   {
//     id: 6,
//     title: "GREEN SHOP",
//     description: "Barcode scanner setup",
//     time: "02:15",
//     status: "closed",
//   },
//   {
//     id: 7,
//     title: "SUPER DEALS",
//     description: "Payment gateway error",
//     time: "01:05",
//     status: "open",
//   },
// ];

// const SupportQueueDashboard = () => {
//   const [data] = useState(initialData.slice(0, 4)); // only 4 cards

//   const getStatusBadge = (status: Status) => {
//     return status === "closed" ? (
//       <span className="text-xs font-medium text-gray-400">Closed</span>
//     ) : (
//       <span className="text-xs font-medium text-green-600">Open</span>
//     );
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-md w-full mx-auto">
//       {/* Header */}
//       <div className="p-5 flex items-center justify-between">
//         <h2 className="text-lg font-semibold text-gray-700">Support Queue</h2>

//         <span className="bg-purple-100 text-purple-600 text-sm font-semibold px-3 py-1 rounded-full">
//           {data.length}
//         </span>
//       </div>

//       {/* GRID: 2 LEFT, 2 RIGHT */}
//       <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
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
//               <span className="text-sm text-gray-400">{item.time}</span>
//               <ChevronRight className="w-5 h-5 text-gray-400 mt-2" />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SupportQueueDashboard;
