import React from "react";
import { LuRefreshCcw } from "react-icons/lu";
import Scanner from "@/assets/primepos/photo/scanner.svg";

interface InitialViewProps {
  onRequestPermission: () => void;
  error: string | null;
}

export const InitialView: React.FC<InitialViewProps> = ({ onRequestPermission, error }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 md:py-12">
      <p>Request Camera Permissions Scan an Image File</p>
      <div>
        <img src={Scanner} alt="" />
      </div>
      <button
        onClick={onRequestPermission}
        className="inline-flex items-center rounded-full gap-2 px-5 py-2.5 bg-[#ECFDF3] border border-[#067647] text-[#067647] text-sm font-medium shadow-sm hover:bg-[#dff7e7] transition cursor-pointer"
      >
        <LuRefreshCcw className="text-[#067647]" />
        Camera Active
      </button>
      <p className="text-gray-500 text-xs mt-4 text-center max-w-xs">
        Position any product barcode within the frame to automatically search your inventory.
      </p>
      {error && error.includes("Camera permission") && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 max-w-xs">
          <p className="text-red-600 text-xs text-center">{error}</p>
        </div>
      )}
    </div>
  );
};
