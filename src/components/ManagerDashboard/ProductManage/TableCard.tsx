// components/TableCard.tsx

import { TableCardProps } from "@/pages/Server/components/TableCard";

export const TableCard = ({
  id,
  capacity,
  status,
  subStatus,
}: TableCardProps) => {
  const isOccupied = status === "OCCUPIED";

  return (
    <div
      className={`p-6 rounded-4xl transition-all border border-transparent 
      ${isOccupied ? "bg-[#E9EAEF]" : "bg-[#F8F9FA] shadow-sm"}`}
    >
      <div className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center text-sm font-bold text-gray-400 mb-4 shadow-sm">
        {id}
      </div>

      <div className="space-y-1 mb-6">
        <h3 className="text-2xl font-bold text-[#1A1C20]">Table</h3>
        <p className="text-gray-400 font-medium">{capacity} Seat</p>
      </div>

      <div className="flex gap-2">
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider border
          ${
            isOccupied
              ? "bg-[#FFF2ED] text-[#FF8A65] border-[#FFD3C5]"
              : "bg-[#F0FDF4] text-[#22C55E] border-[#DCFCE7]"
          }`}
        >
          {status}
        </span>

        {subStatus && (
          <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-wider bg-[#EEF2FF] text-[#6366F1] border border-[#E0E7FF]">
            {subStatus}
          </span>
        )}
      </div>
    </div>
  );
};
