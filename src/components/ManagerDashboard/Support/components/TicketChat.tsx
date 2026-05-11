import { useState, useRef, useEffect } from "react";
import { Loader2, Send } from "lucide-react";
import {
  useGetSupportTicketByIdQuery,
  useAddSupportMessageMutation,
} from "@/redux/features/manager/support/supportApi";
import { SupportMessage } from "@/redux/features/manager/support/supportTypes";

interface Props {
  ticketId: string;
}

export default function TicketChat({ ticketId }: Props) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Poll every 5 seconds for new messages
  const { data: ticket, isLoading } = useGetSupportTicketByIdQuery(ticketId, {
    pollingInterval: 5000,
  });

  const [addMessage, { isLoading: isSending }] = useAddSupportMessageMutation();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ticket?.messages?.length]);

  const handleSend = async () => {
    const trimmed = message.trim();
    if (!trimmed || isSending) return;
    try {
      await addMessage({ id: ticketId, data: { message: trimmed } }).unwrap();
      setMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <Loader2 className="animate-spin text-[#0A1F4E]" size={40} />
        <p className="text-sm font-bold text-[#0A1F4E] animate-pulse uppercase tracking-[0.2em]">Decrypting Session...</p>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400 text-sm font-medium">No active session found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#FDFDFD]">
      {/* Header - Premium Glassmorphism Feel */}
      <div className="px-6 py-5 border-b border-gray-100/60 bg-white/50 backdrop-blur-md sticky top-0 z-20 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0A1F4E] to-[#1E3A8A] flex items-center justify-center text-white shadow-lg shadow-blue-900/10">
              <span className="text-lg font-black uppercase">{ticket.tenant.name.substring(0, 2)}</span>
            </div> */}
            <div>
              <h3 className="font-bold text-[#1E293B] text-[15px] leading-tight">
                {ticket.issueType}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Stream · {ticket.tenant.name}</p>
              </div>
            </div>
          </div>
          <span
            className={`text-[10px] font-black px-4 py-1.5 rounded-full tracking-widest uppercase border transition-all ${
              ticket.status === "OPEN"
                ? "bg-green-50 text-green-600 border-green-100/50 shadow-sm shadow-green-900/5"
                : "bg-slate-50 text-slate-500 border-slate-100"
            }`}
          >
            {ticket.status}
          </span>
        </div>
      </div>

      {/* Messages area - Subtle pattern background */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 scrollbar-hide bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]">
        {ticket.messages.map((msg: SupportMessage, idx: number) => {
          const isMe = msg.senderRole === "MANAGER";
          const timeStr = new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div
              key={msg.id}
              className={`flex ${isMe ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-500`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className={`max-w-[80%] flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                <div
                  className={`px-5 py-3.5 rounded-[1.5rem] text-[14px] leading-[1.6] shadow-sm transition-all hover:shadow-md ${
                    isMe
                      ? "bg-[#0A1F4E] text-white rounded-tr-none shadow-[#0A1F4E]/10"
                      : "bg-white text-slate-700 border border-gray-100 rounded-tl-none"
                  }`}
                >
                  {msg.message}
                </div>
                
                <div className={`flex items-center gap-2 mt-2 px-1`}>
                   {!isMe && <span className="text-[11px] font-bold text-[#0A1F4E]">{msg.senderName || "Admin"}</span>}
                   <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">{timeStr}</span>
                   {isMe && <span className="text-[11px] font-bold text-slate-400">You</span>}
                </div>
              </div>
            </div>
          );
        })}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Input box - Floating premium design */}
      <div className="px-6 py-6 border-t border-gray-100/60 bg-white shrink-0">
        <div className="flex items-center gap-3 bg-slate-50/80 rounded-[1.75rem] px-5 py-3 border border-slate-100/80 focus-within:bg-white focus-within:border-[#0A1F4E]/20 focus-within:shadow-xl focus-within:shadow-[#0A1F4E]/5 transition-all duration-300">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-[14px] text-[#1E293B] outline-none placeholder:text-slate-400 font-medium"
          />
          <button
            onClick={handleSend}
            disabled={!message.trim() || isSending}
            className={`w-11 h-11 shrink-0 rounded-2xl flex items-center justify-center transition-all duration-300 transform active:scale-90 ${
              message.trim() && !isSending 
                ? "bg-[#0A1F4E] text-white shadow-lg shadow-[#0A1F4E]/20 cursor-pointer" 
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            {isSending ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 font-medium mt-3 uppercase tracking-widest">End-to-End Encrypted Dashboard</p>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
