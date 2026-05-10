import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { ScannedData } from "../types";

interface ScanResultsProps {
  scannedData: ScannedData | null;
  error: string | null;
  isScanning: boolean;
  onClear: () => void;
  onClearError: () => void;
  onAdd?: () => void;
  onEdit?: () => void;
}

export const ScanResults: React.FC<ScanResultsProps> = ({
  scannedData,
  error,
  isScanning,
  onClear,
  onClearError,
  onAdd,
  onEdit,
}) => {
  return (
    <div className="space-y-4">
      {/* Scanned Results */}
      {scannedData && scannedData.product && (
        <div className="mt-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 animate-slideIn">
          <div className="flex justify-between items-start mb-3">
            <h4 className="text-sm md:text-base font-semibold text-green-800 flex items-center gap-2">
              <span className="text-lg">✅</span> Scan Successful!
            </h4>
            <button
              onClick={onClear}
              className="text-gray-400 hover:text-gray-600 text-xs md:text-sm cursor-pointer"
            >
              ✕
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <span className="font-medium text-gray-600">Barcode:</span>
              <span className="text-gray-800 font-mono text-xs break-all">
                {scannedData.barcode}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="font-medium text-gray-600">Product:</span>
              <span className="text-gray-800 font-semibold">
                {scannedData.product?.name || "N/A"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="font-medium text-gray-600">SKU:</span>
              <span className="text-gray-800">{scannedData.product?.sku || "N/A"}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="font-medium text-gray-600">Price:</span>
              <span className="text-green-600 font-bold">
                ${scannedData.product?.price?.toFixed(2) || "0.00"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="font-medium text-gray-600">Stock:</span>
              <span
                className={`font-semibold ${(scannedData.product?.stock || 0) < 10 ? "text-red-600" : "text-gray-800"}`}
              >
                {scannedData.product?.stock ?? 0} units
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <span className="font-medium text-gray-600">Time:</span>
              <span className="text-gray-500 text-xs">{scannedData.timestamp}</span>
            </div>

            {/* Edit/Update Button */}
            <button
              onClick={onEdit}
              className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Update this Item
            </button>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && !error.includes("Camera permission") && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-2">
              <FiAlertTriangle className="text-red-500 mt-0.5 flex-shrink-0" size={16} />
              <p className="text-red-600 text-sm flex-1">{error}</p>
              <button
                onClick={onClearError}
                className="text-red-400 hover:text-red-600 text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            {/* If it's a "not found in inventory" error, show Add button */}
            {error.includes("not found in inventory") && (
              <button
                onClick={onAdd}
                className="w-full py-2 bg-green-600 text-white rounded-lg text-xs font-semibold hover:bg-green-700 transition-all cursor-pointer"
              >
                + Add this item to Inventory
              </button>
            )}
          </div>
        </div>
      )}

      {/* Scanning Status */}
      {isScanning && !scannedData && (
        <div className="text-center text-sm text-green-600 animate-pulse flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-green-600 rounded-full animate-ping"></div>
          Scanning for barcodes...
        </div>
      )}
    </div>
  );
};
