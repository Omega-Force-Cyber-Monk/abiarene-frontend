import { MessageCircle } from "lucide-react";
import {
  SupportTicket,
  statusColors,
  statusLabels,
  SupportStatus,
} from "@/redux/features/manager/support/supportTypes";

interface Props {
  ticket: SupportTicket;
  isSelected: boolean;
  onClick: () => void;
}

export default function TicketListItem({ ticket, isSelected, onClick }: Props) {
  const latestMessage =
    ticket.messages?.[ticket.messages.length - 1]?.message ||
    ticket.description;
  const messageCount = ticket.messages?.length || 1;
  const date = new Date(ticket.createdAt).toLocaleDateString();
  const time = new Date(ticket.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const safeStatus = ticket.status as SupportStatus;

  return (
    <div
      onClick={onClick}
      className={`group flex flex-col p-5 rounded-[1.75rem] cursor-pointer transition-all duration-300 border ${
        isSelected
          ? "bg-[#0A1F4E] border-[#0A1F4E] shadow-xl shadow-[#0A1F4E]/20"
          : "bg-white border-slate-100 hover:border-slate-200 hover:shadow-lg hover:shadow-slate-200/50"
      }`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <p className={`text-[13px] font-bold leading-tight tracking-tight transition-colors ${isSelected ? "text-white" : "text-slate-800"}`}>
          {ticket.issueType}
        </p>
        <span
          className={`shrink-0 text-[9px] font-black px-2.5 py-1 rounded-full tracking-widest uppercase border transition-all ${
            isSelected 
              ? "bg-white/20 text-white border-white/20" 
              : (statusColors[safeStatus] ?? "bg-slate-100 text-slate-500 border-slate-200")
          }`}
        >
          {statusLabels[safeStatus] ?? ticket.status}
        </span>
      </div>

      {/* Preview message */}
      <p className={`text-[12px] line-clamp-2 mb-4 leading-relaxed font-medium transition-colors ${isSelected ? "text-white/70" : "text-slate-500"}`}>
        {latestMessage}
      </p>

      {/* Bottom row */}
      <div className={`flex items-center justify-between pt-4 border-t transition-colors ${isSelected ? "border-white/10" : "border-slate-50"}`}>
        <div className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-tighter transition-colors ${isSelected ? "text-white/60" : "text-slate-400"}`}>
          <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md ${isSelected ? "bg-white/10" : "bg-slate-50"}`}>
            <MessageCircle className="w-3 h-3" />
            <span>{messageCount}</span>
          </div>
          <span className="opacity-40">·</span>
          <span>{ticket.tenant.name}</span>
        </div>
        <span className={`text-[10px] font-bold transition-colors ${isSelected ? "text-white/40" : "text-slate-300"}`}>
          {time}
        </span>
      </div>
    </div>
  );
}
