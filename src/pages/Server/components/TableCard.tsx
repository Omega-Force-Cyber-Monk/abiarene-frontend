import { TableStatus } from "@/redux/features/restaurant/table/table.type";
import { useUpdateTableMutation } from "@/redux/features/restaurant/table/tableApi";
import { toast } from "react-hot-toast";

export interface TableCardProps {
  id?: string;
  tableNumber: number;
  seatCount: number;
  status: TableStatus | string;
  subStatus?: string | null;
}

export const TableCard = ({
  id,
  tableNumber,
  seatCount,
  status,
  subStatus,
}: TableCardProps) => {
  const isOccupied = status === "OCCUPIED";
  const [updateTable, { isLoading: isUpdating }] = useUpdateTableMutation();

  const handleStatusChange = async (newStatus: TableStatus) => {
    if (!id) return;
    try {
      await updateTable({ id, data: { status: newStatus } }).unwrap();
      toast.success("Table status updated");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update status");
    }
  };

  return (
    <div
      className={`p-6 rounded-4xl cursor-pointer transition-all border border-transparent 
      ${isOccupied ? "bg-[#E9EAEF]" : "bg-[#F8F9FA] shadow-sm"}`}
    >
      {/* Table Number Badge */}
      <div className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center text-sm font-bold text-gray-400 mb-4 shadow-sm">
        {tableNumber}
      </div>

      <div className="space-y-1 mb-6">
        <h3 className="text-2xl font-bold text-[#1A1C20]">Table</h3>
        <p className="text-gray-400 font-medium">{seatCount} Seat</p>
      </div>

      {/* Status Badges */}
      <div className="flex gap-2">
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider border
          ${isOccupied
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

      {/* Status Changer Dropdown */}
      <div className="mt-6" onClick={(e) => e.stopPropagation()}>
        <label className="text-xs font-semibold text-gray-500 mb-2 block">Table Status</label>
        <div className="relative">
          <select
            className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 px-4 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A2540] shadow-sm text-sm font-medium disabled:opacity-50"
            value={status}
            onChange={(e) => handleStatusChange(e.target.value as TableStatus)}
            disabled={isUpdating}
          >
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="OCCUPIED">OCCUPIED</option>
            <option value="SERVED">SERVED</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
};
