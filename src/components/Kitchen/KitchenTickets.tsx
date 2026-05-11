import { useState } from "react";
import { MdSend } from "react-icons/md";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import print from "@/assets/primepos/logo/print.svg";
import {
  useGetKitchenBoardTicketsQuery,
  useGetAllTicketsQuery,
  useBumpToReadyMutation,
  useForceArchiveMutation,
} from "@/redux/features/restaurant/ticket/ticketApi";
import { Ticket } from "@/redux/features/restaurant/ticket/ticket.type";

export default function KitchenTickets() {
  const [activeTab, setActiveTab] = useState<"Active" | "Archive">("Active");

  // API Hooks with Polling
  const { data: activeTicketsData, isLoading: isBoardLoading, isError: isBoardError, refetch: refetchBoard } = useGetKitchenBoardTicketsQuery(undefined, {
    pollingInterval: 10000, // auto refresh every 10s for kitchen board
    skip: activeTab !== "Active",
  });
  
  const { data: archivedTicketsResp, isLoading: isArchivedLoading, isError: isArchivedError, refetch: refetchArchived } = useGetAllTicketsQuery({ status: "COMPLETED" }, {
    skip: activeTab !== "Archive",
  });

  const [bumpToReady, { isLoading: isBumping }] = useBumpToReadyMutation();
  const [archiveTicket, { isLoading: isArchiving }] = useForceArchiveMutation();

  const handleBumpToReady = async (id: string) => {
    try {
      await bumpToReady(id).unwrap();
      toast.success("Ticket marked as ready");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to bump ticket to ready");
    }
  };

  const handleArchive = async (id: string) => {
    try {
      await archiveTicket(id).unwrap();
      toast.success("Ticket archived successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to archive ticket");
    }
  };

  const activeTickets = activeTicketsData || [];
  const archivedTickets = Array.isArray(archivedTicketsResp) 
    ? archivedTicketsResp 
    : archivedTicketsResp?.data || [];

  const ticketsToDisplay = activeTab === "Active" ? activeTickets : archivedTickets;

  const filteredTickets = ticketsToDisplay.filter((ticket: Ticket) => {
    if (activeTab === "Active") {
      // API returns "PREPARING" and "READY" for active tickets
      return ticket.status === "PREPARING" || ticket.status === "READY";
    } else {
      // Archive tab fetches status=COMPLETED from API
      return ticket.status === "COMPLETED";
    }
  });

  const isLoading = activeTab === "Active" ? isBoardLoading : isArchivedLoading;
  const isError = activeTab === "Active" ? isBoardError : isArchivedError;
  const refetch = activeTab === "Active" ? refetchBoard : refetchArchived;

  return (
    <div className="p-4 md:p-6 min-h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Kitchen Production
          </h1>
          <p className="text-gray-500 mt-1 font-medium">Live Ticket Stream</p>
        </div>

        <div className="flex bg-gray-200/80 rounded-full p-1 shadow-inner">
          {["Active", "Archive"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2 text-sm font-semibold rounded-full cursor-pointer transition-all duration-200 ${
                activeTab === tab
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <Loader2 className="animate-spin text-[#0A2540] mb-4" size={48} />
          <p className="text-gray-500 font-medium animate-pulse">Syncing Kitchen Board...</p>
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <p className="text-red-500 font-medium mb-4 text-lg">Error loading kitchen tickets.</p>
          <button onClick={() => refetch()} className="px-6 py-2.5 bg-[#0A2540] text-white rounded-lg font-medium hover:bg-black transition-colors cursor-pointer">
            Retry Connection
          </button>
        </div>
      ) : filteredTickets.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center bg-white/50 rounded-3xl border border-dashed border-gray-200">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl opacity-50">🍽️</span>
          </div>
          <h3 className="text-xl font-bold text-gray-700">No Tickets</h3>
          <p className="text-gray-500 mt-2 font-medium">There are no {activeTab.toLowerCase()} tickets at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTickets.map((ticket: Ticket) => {
            const time = new Date(ticket.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
            // table is at root level of ticket (not inside ticket.order)
            const tableNo = ticket.table?.tableNumber ?? ticket.order?.table?.tableNumber ?? "?";
            const isReady = ticket.status === "READY";
            // API returns "PREPARING" (not "ACTIVE")
            const isPreparing = ticket.status === "PREPARING";

            return (
              <div
                key={ticket.id}
                className="bg-[#EAECEF] rounded-[1.5rem] flex flex-col justify-between shadow-sm overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  {/* Top Header */}
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center font-bold text-[#374151] text-lg shadow-sm">
                      {tableNo}
                    </div>
                    <span
                      className={`text-[12px] px-3.5 py-1.5 rounded-full font-bold shadow-sm ${
                        isPreparing
                          ? "bg-white text-[#D97706] border border-[#FDE68A]"
                          : isReady
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-gray-100 text-gray-600 border border-gray-200"
                      }`}
                    >
                      {isPreparing ? "Preparing" : isReady ? "Ready" : ticket.status}
                    </span>
                  </div>

                  {/* Time & ID */}
                  <div className="space-y-1.5 mb-5">
                    <p className="text-[15px] font-medium text-[#6B7280]">IN: {time}</p>
                    <p className="text-[15px] font-medium text-[#6B7280]">Ticket ID: {ticket.ticketCode || ticket.id.substring(0,8)}</p>
                  </div>

                  <hr className="border-t border-dashed border-gray-300 my-5" />

                  {/* Items */}
                  <div className="space-y-5">
                    {ticket.items.map((itemObj: any) => {
                        // API structure:
                        // itemObj = { id, quantity, notes, selectedOptions, item: { id, name, category, image } }
                        const menuItem = itemObj.item || itemObj.orderItem?.menuItem;
                        const quantity = itemObj.quantity ?? itemObj.orderItem?.quantity;
                        const notes = itemObj.notes ?? itemObj.orderItem?.notes;
                        const selectedOptions: string[] = itemObj.selectedOptions ?? itemObj.orderItem?.selectedOptions ?? [];
                        const itemName = menuItem?.name || "Unknown Item";

                        return (
                          <div key={itemObj.id} className="flex flex-col">
                            <div className="flex items-start gap-2.5">
                              <span className="font-bold text-[18px] text-[#1E293B] leading-none mt-0.5">{quantity}</span>
                              <span className="font-medium text-[16px] text-[#1E293B] uppercase tracking-wide leading-tight">
                                {itemName}
                              </span>
                            </div>

                            {/* Options & Notes */}
                            {(selectedOptions.length > 0 || notes) && (
                              <ul className="mt-2.5 ml-5 space-y-2">
                                {selectedOptions.map((opt: string, i: number) => (
                                  <li key={i} className="flex items-center gap-2.5">
                                    <div className="w-[5px] h-[5px] bg-[#9CA3AF] shrink-0 rounded-sm" />
                                    <span className="text-[14px] font-medium text-[#6B7280]">{opt}</span>
                                  </li>
                                ))}
                                {notes && (
                                  <li className="flex items-start gap-2.5 mt-2">
                                    <div className="w-[5px] h-[5px] bg-[#9CA3AF] shrink-0 rounded-sm mt-2" />
                                    <span className="text-[14px] font-medium text-[#6B7280] italic leading-tight">
                                      {notes}
                                    </span>
                                  </li>
                                )}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className="text-center px-4">
                  {isReady && (
                    <p className="text-sm font-bold tracking-widest text-[#10B981] animate-pulse mb-3">
                      WAITING FOR SERVER.......
                    </p>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="px-5 pb-5 pt-2 flex items-center justify-between">
                  <button 
                    className="w-[46px] h-[46px] rounded-full bg-[#FDF6E3] border border-[#D4AF37] flex items-center justify-center hover:bg-[#FBEFCD] transition-colors shadow-sm cursor-pointer"
                    title="Print Ticket"
                  >
                    <img src={print} alt="print" className="w-[22px] h-[22px] opacity-80" />
                  </button>

                  {isPreparing && (
                    <button
                      disabled={isBumping}
                      onClick={() => handleBumpToReady(ticket.id)}
                      className="flex items-center cursor-pointer gap-2 bg-[#0B1A38] hover:bg-black transition-colors text-white px-6 py-[11px] rounded-full font-medium text-[15px] shadow-md disabled:opacity-70"
                    >
                      Bump To Ready <MdSend size={18} />
                    </button>
                  )}

                  {isReady && (
                    <button
                      disabled={isArchiving}
                      onClick={() => handleArchive(ticket.id)}
                      className="flex items-center cursor-pointer gap-2 bg-gray-800 hover:bg-gray-900 transition-colors text-white px-6 py-[11px] rounded-full font-medium text-[15px] shadow-md disabled:opacity-70"
                    >
                      Archive Ticket
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
