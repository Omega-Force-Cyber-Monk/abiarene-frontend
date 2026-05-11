import { useState } from "react";
import {
  useGetSupportTicketByIdQuery,
  useAddSupportMessageMutation,
  useUpdateSupportTicketMutation,
} from "@/redux/features/manager/support/supportApi";
import {
  statusColors,
  statusLabels,
  SupportStatus,
} from "@/redux/features/manager/support/supportTypes";
import { Send, ArrowLeft } from "lucide-react";

interface TicketDetailsProps {
  ticketId: string;
  onBack: () => void;
}

const TicketDetails = ({ ticketId, onBack }: TicketDetailsProps) => {
  const {
    data: ticket,
    isLoading,
    refetch,
  } = useGetSupportTicketByIdQuery(ticketId);
  const [addMessage] = useAddSupportMessageMutation();
  const [updateTicket] = useUpdateSupportTicketMutation();
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    setSending(true);
    try {
      await addMessage({
        id: ticketId,
        data: { message: newMessage },
      }).unwrap();
      setNewMessage("");
      refetch();
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setSending(false);
    }
  };

  const handleStatusUpdate = async (newStatus: SupportStatus) => {
    try {
      await updateTicket({
        id: ticketId,
        data: { status: newStatus },
      }).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-8">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-8">
        <div className="text-center text-red-500">Ticket not found</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md w-full mx-auto">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Queue
        </button>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              {ticket.issueType}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Ticket #{ticket.id.slice(0, 8)} • {ticket.tenant.name}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={ticket.status}
              onChange={(e) =>
                handleStatusUpdate(e.target.value as SupportStatus)
              }
              className={`text-sm font-medium px-3 py-1 rounded-full border cursor-pointer ${statusColors[ticket.status]}`}
            >
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="p-5 space-y-4 max-h-[500px] overflow-y-auto">
        {ticket.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderRole === "MANAGER" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.senderRole === "MANAGER"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold">
                  {message.senderName}
                </span>
                <span className="text-xs opacity-75">
                  {formatDateTime(message.createdAt)}
                </span>
              </div>
              <p className="text-sm">{message.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-5 border-t border-gray-100">
        <div className="flex gap-3">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 rounded-xl p-3 text-sm text-slate-700 resize-none outline-none border border-gray-200 focus:border-purple-400"
            rows={3}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <button
            onClick={handleSendMessage}
            disabled={sending || !newMessage.trim()}
            className="self-end bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
