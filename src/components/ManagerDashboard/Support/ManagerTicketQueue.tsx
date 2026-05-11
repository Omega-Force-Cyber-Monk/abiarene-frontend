import { useState } from "react";
import { MessageCircle } from "lucide-react";
import TicketList from "./components/TicketList";
import TicketChat from "./components/TicketChat";

const ManagerTicketQueue = () => {
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl w-full overflow-hidden border border-gray-100/50 mt-10" style={{ height: "750px" }}>
      <div className="flex h-full">

        {/* LEFT: Ticket List - Fixed width on desktop to prevent stretching */}
        <div
          className={`border-r border-gray-50 flex flex-col overflow-hidden transition-all duration-300 w-full md:w-[420px] shrink-0 ${
            selectedTicketId ? "hidden md:flex" : "flex"
          }`}
        >
          <TicketList
            selectedId={selectedTicketId}
            onSelect={setSelectedTicketId}
          />
        </div>

        {/* RIGHT: Chat Panel / Empty State - Always visible on desktop */}
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
              <TicketChat ticketId={selectedTicketId} />
            </>
          ) : (
            /* Empty state — shown when no ticket is selected on desktop */
            <div className="flex-1 flex flex-col items-center justify-center bg-[#F8FAFC]/30 gap-6 p-12 text-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-[2.5rem] bg-white shadow-xl flex items-center justify-center text-[#0A1F4E] animate-bounce-subtle">
                  <MessageCircle size={40} strokeWidth={1.5} />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-green-400 border-4 border-white shadow-lg animate-pulse" />
              </div>
              <div className="max-w-xs space-y-2">
                <h3 className="text-xl font-black text-[#1E293B]">Select a Conversation</h3>
                <p className="text-[13px] text-slate-400 font-bold leading-relaxed uppercase tracking-tight">
                  Choose a support ticket from the queue to start a live session
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

export default ManagerTicketQueue;
