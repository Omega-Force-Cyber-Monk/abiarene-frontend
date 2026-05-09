import React from "react";

interface ScannerViewProps {
  readerId: string;
  isScanning: boolean;
  onStartScanning: () => void;
  onStopScanning: () => void;
  onStopCamera: () => void;
}

export const ScannerView: React.FC<ScannerViewProps> = ({
  readerId,
  isScanning,
  onStartScanning,
  onStopScanning,
  onStopCamera,
}) => {
  return (
    <div className="space-y-4">
      {/* html5-qrcode renders into this div. Wrapper has relative for overlay positioning. */}
      <div className="relative rounded-xl overflow-hidden">
        <div id={readerId} className="w-full"></div>

        {/* Green scan line overlay — only visible while scanning */}
        {isScanning && (
          <div className="absolute inset-0 pointer-events-none z-20">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 md:w-64 md:h-64">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-green-500"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-green-500"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-green-500"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-500"></div>
              {/* Animated scan line */}
              <div className="absolute inset-0 flex items-center">
                <div className="h-0.5 w-full bg-green-500 shadow-lg shadow-green-500 animate-pulse"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 justify-center">
        {!isScanning ? (
          <button
            onClick={onStartScanning}
            className="px-6 py-2.5 bg-green-600 text-white rounded-full text-sm font-semibold hover:bg-green-700 transition-all shadow-md cursor-pointer"
          >
            Start Scanning
          </button>
        ) : (
          <button
            onClick={onStopScanning}
            className="px-6 py-2.5 bg-red-600 text-white rounded-full text-sm font-semibold hover:bg-red-700 transition-all shadow-md cursor-pointer"
          >
            Stop Scanning
          </button>
        )}
        <button
          onClick={onStopCamera}
          className="px-6 py-2.5 bg-gray-600 text-white rounded-full text-sm font-semibold hover:bg-gray-700 transition-all shadow-md cursor-pointer"
        >
          Close Camera
        </button>
      </div>
    </div>
  );
};
