import { useState } from "react";
import { Loader2, MessageCircle } from "lucide-react";
import { useGetSupportTicketsQuery } from "@/redux/features/manager/support/supportApi";
import AdminTicketListItem from "./AdminTicketListItem";

interface Props {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

type StatusTab = "OPEN" | "CLOSED";

export default function AdminTicketList({ selectedId, onSelect }: Props) {
  const [activeTab, setActiveTab] = useState<StatusTab>("OPEN");

  const { data, isLoading, error } = useGetSupportTicketsQuery({
    page: 1,
    limit: 20,
    status: activeTab,
  });

  const tickets = data?.data || [];

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-100/50 shrink-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
             <div className="w-1 h-6 bg-[#0A1F4E] rounded-full" />
             <h2 className="text-[17px] font-black text-[#1E293B] tracking-tight">
               Admin Queue
             </h2>
          </div>
          <span className="bg-[#0A1F4E] text-white text-[10px] font-black px-3 py-1.5 rounded-xl shadow-lg shadow-blue-900/10 uppercase tracking-widest">
            {data?.meta?.total ?? 0}
          </span>
        </div>

        {/* OPEN / CLOSED tabs */}
        <div className="flex bg-slate-100/80 rounded-2xl p-1.5 border border-slate-200/50">
          {(["OPEN", "CLOSED"] as StatusTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-[11px] font-black uppercase tracking-[0.1em] rounded-[1rem] transition-all duration-300 cursor-pointer ${
                activeTab === tab
                  ? "bg-white text-[#0A1F4E] shadow-xl shadow-slate-200/50 scale-[1.02]"
                  : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4 scrollbar-hide">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="animate-spin text-[#0A1F4E]" size={32} />
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Loading Tickets</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400 text-xs font-bold uppercase tracking-widest">Error Loading</p>
          </div>
        ) : tickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-40 grayscale">
             <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center mb-4">
                <MessageCircle size={24} className="text-slate-400" />
             </div>
             <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">No {activeTab} Records</p>
          </div>
        ) : (
          tickets.map((ticket) => (
            <AdminTicketListItem
              key={ticket.id}
              ticket={ticket}
              isSelected={selectedId === ticket.id}
              onClick={() => onSelect(ticket.id)}
            />
          ))
        )}
      </div>
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
