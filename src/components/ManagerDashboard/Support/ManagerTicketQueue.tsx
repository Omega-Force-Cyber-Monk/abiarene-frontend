import { MessageCircle } from "lucide-react";
import { useGetSupportTicketsQuery } from "@/redux/features/manager/support/supportApi";
import {
  statusColors,
  statusLabels,
  SupportStatus,
} from "@/redux/features/manager/support/supportTypes";
import { useState } from "react";

const ManagerTicketQueue = () => {
  const {
    data: ticketsResponse,
    isLoading,
    error,
    refetch,
  } = useGetSupportTicketsQuery({ page: 1, limit: 20 });
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const tickets = ticketsResponse?.data || [];

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleStatusChange = async (
    id: string,
    currentStatus: SupportStatus,
  ) => {
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
      // await updateTicket({ id, data: { status: newStatus } }).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to update ticket status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getLatestMessage = (ticket: any) => {
    if (ticket.messages && ticket.messages.length > 0) {
      const latestMessage = ticket.messages[ticket.messages.length - 1];
      return latestMessage.message;
    }
    return ticket.description;
  };

  const getMessageCount = (ticket: any) => {
    return ticket.messages?.length || 1;
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
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md w-full mx-auto">
      {/* Header */}
      <div className="p-5 flex items-center justify-between border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-700">Support Queue</h2>

        {/* COUNT BADGE */}
        <span className="bg-purple-100 text-purple-600 text-sm font-semibold px-3 py-1 rounded-full">
          {ticketsResponse?.meta?.total || 0}
        </span>
      </div>

      {/* List */}
      <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer"
              onClick={() => handleStatusChange(ticket.id, ticket.status)}
            >
              {/* LEFT SIDE */}
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-gray-700">
                    {ticket.issueType}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <MessageCircle className="w-3 h-3" />
                    <span>{getMessageCount(ticket)}</span>
                  </div>
                  {updatingId === ticket.id && (
                    <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  )}
                </div>

                <p className="text-sm text-gray-500 line-clamp-2">
                  {getLatestMessage(ticket).length > 100
                    ? `${getLatestMessage(ticket).substring(0, 100)}...`
                    : getLatestMessage(ticket)}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[ticket.status]}`}
                  >
                    {statusLabels[ticket.status]}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatDate(ticket.createdAt)}
                  </span>
                  <span className="text-xs text-gray-400">
                    {ticket.tenant.name}
                  </span>
                </div>

                {ticket.response && (
                  <p className="text-xs text-green-600 mt-1">
                    Response: {ticket.response}
                  </p>
                )}
              </div>

              {/* RIGHT SIDE */}
              <div className="flex flex-col items-end ml-4">
                {/* Time */}
                <span className="text-sm text-gray-400">
                  {formatTime(ticket.createdAt)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No support tickets found
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerTicketQueue;
