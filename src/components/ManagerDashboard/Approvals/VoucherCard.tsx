import { Discount } from "@/redux/features/restaurant/discount/discountApi";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

interface VoucherCardProps {
  voucher: Discount;
  onEdit: (voucher: Discount) => void;
  onDelete: (id: string) => void;
}

const VoucherCard = ({ voucher, onEdit, onDelete }: VoucherCardProps) => {
  return (
    <div className="bg-[#F9FAFB] p-4 sm:p-5 rounded-2xl shadow-md space-y-4">
      {/* Item Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        {/* Left */}
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">
            {voucher.name}
          </h2>
          <p className="text-xs text-gray-400 uppercase tracking-wide">
            Min. Price: ${voucher.minimumPrice}
          </p>
        </div>

        {/* Price Section */}
        <div className="text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
          <span className="text-red-500 font-semibold">Discount: {voucher.offPrice}%</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] ${voucher.isActive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
            {voucher.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        {/* Delete */}
        <button 
          onClick={() => onDelete(voucher.id)}
          className="w-full flex items-center justify-center gap-2 cursor-pointer border border-red-200 text-red-500 py-2 rounded-full hover:bg-red-50 transition duration-300"
        >
          <FaRegTrashAlt size={14} />
          Delete
        </button>

        {/* Edit */}
        <button 
          onClick={() => onEdit(voucher)}
          className="w-full flex items-center justify-center gap-2 cursor-pointer bg-[#061E49] text-white py-2 rounded-full hover:bg-[#0A2A66] transition duration-300"
        >
          <FiEdit size={14} />
          Edit
        </button>
      </div>
    </div>
  );
};

export default VoucherCard;
