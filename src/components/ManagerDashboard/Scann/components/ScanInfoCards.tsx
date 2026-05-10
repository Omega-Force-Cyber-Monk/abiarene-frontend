import React from "react";
import { BsBoxSeam } from "react-icons/bs";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

export const ScanInfoCards: React.FC = () => {
  return (
    <div className="space-y-5">
      {/* RIGHT SIDE - Information Cards */}
      <div className="flex flex-col gap-6">
        {/* Inventory Lookup Card */}
        <div className="group bg-[#EFF2F6] rounded-xl shadow-lg p-5 md:p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full shadow-lg">
              <BsBoxSeam size={24} className="text-[#175CD3]" />
            </div>
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-semibold text-[#175CD3] group-hover:text-blue-600 transition-colors">
                Inventory Lookup
              </h3>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                Instantly find stock levels and pricing by scaning.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Information Cards */}
      <div className="flex flex-col gap-6">
        {/* Inventory Lookup Card */}
        <div className="group bg-[#FDF7EB] rounded-xl shadow-lg p-5 md:p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full shadow-lg">
              <HiOutlineExclamationTriangle size={24} className="text-[#92370D]" />
            </div>
            <div className="flex-1">
              <h3 className="text-base md:text-lg font-semibold text-[#92370D] group-hover:text-[#92370D] transition-colors">
                Troubleshooting
              </h3>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                Ensure good lighting and hold the device steady.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
