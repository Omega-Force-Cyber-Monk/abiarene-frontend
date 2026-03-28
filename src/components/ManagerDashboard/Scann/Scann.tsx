import React, { useState, useRef, useEffect } from "react";
import { FaCamera, FaStop } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import Webcam from "react-webcam";

import Scanner from "@/assets/primepos/photo/scanner.svg";
import { BsBoxSeam } from "react-icons/bs";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { LuRefreshCcw } from "react-icons/lu";

// Types
interface ProductInfo {
  name: string;
  price: number;
  stock: number;
  sku: string;
}

interface ScannedData {
  barcode: string;
  timestamp: string;
  product: ProductInfo;
  image?: string;
}

interface VideoDevice {
  deviceId: string;
  label: string;
  kind: string;
}

const Scann: React.FC = () => {
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [scannedData, setScannedData] = useState<ScannedData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [devices, setDevices] = useState<VideoDevice[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const webcamRef = useRef<Webcam | null>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get available video devices
  useEffect(() => {
    const getDevices = async (): Promise<void> => {
      try {
        // First request permission to get device labels
        const tempStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        tempStream.getTracks().forEach((track) => track.stop());

        const devicesList = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devicesList
          .filter((device) => device.kind === "videoinput")
          .map((device) => ({
            deviceId: device.deviceId,
            label: device.label || `Camera ${device.deviceId.slice(0, 5)}`,
            kind: device.kind,
          }));

        setDevices(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedDeviceId(videoDevices[0].deviceId);
        }
      } catch (err) {
        console.error("Error getting devices:", err);
        setError(
          "Unable to access camera devices. Please check your camera settings.",
        );
      }
    };

    getDevices();

    // Cleanup on unmount
    return () => {
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
      }
      if (cameraStreamRef.current) {
        cameraStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Request camera permission
  const requestCameraPermission = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      cameraStreamRef.current = stream;
      setIsCameraActive(true);
      setError(null);

      // Automatically start scanning when camera is active
      startScanning();
    } catch (err) {
      console.error("Camera error:", err);
      if (err instanceof Error) {
        if (err.name === "NotAllowedError") {
          setError(
            "Camera permission denied. Please allow camera access to use the scanner.",
          );
        } else if (err.name === "NotFoundError") {
          setError("No camera found on your device.");
        } else if (err.name === "NotReadableError") {
          setError("Camera is already in use by another application.");
        } else {
          setError(
            "Failed to access camera. Please check your camera settings.",
          );
        }
      } else {
        setError("Failed to access camera. Please check your camera settings.");
      }
    }
  };

  // Stop camera
  const stopCamera = (): void => {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach((track) => track.stop());
      cameraStreamRef.current = null;
    }
    setIsCameraActive(false);
    setIsScanning(false);
    setScannedData(null);
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
  };

  // Start scanning
  const startScanning = (): void => {
    if (isScanning) return;

    setIsScanning(true);
    setError(null);

    // Clear any existing interval
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }

    // Start barcode detection
    scanIntervalRef.current = setInterval(() => {
      if (webcamRef.current && isScanning) {
        captureAndScan();
      }
    }, 2000);
  };

  // Stop scanning
  const stopScanning = (): void => {
    setIsScanning(false);
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
  };

  // Mock product info
  const getProductInfo = (barcode: string): ProductInfo => {
    const products: Record<string, ProductInfo> = {
      "123456789012": {
        name: "Wireless Mouse",
        price: 29.99,
        stock: 45,
        sku: "WM-001",
      },
      "5901234123457": {
        name: "USB-C Cable",
        price: 12.99,
        stock: 120,
        sku: "UC-002",
      },
      "4006381333931": {
        name: "Bluetooth Headphones",
        price: 89.99,
        stock: 23,
        sku: "BH-003",
      },
      "735135353": {
        name: "Screen Protector",
        price: 9.99,
        stock: 67,
        sku: "SP-004",
      },
      "9780201379624": {
        name: "Programming Book",
        price: 49.99,
        stock: 12,
        sku: "PB-005",
      },
    };
    return (
      products[barcode] || {
        name: "Unknown Product",
        price: 0,
        stock: 0,
        sku: "N/A",
      }
    );
  };

  // Capture and scan frame
  const captureAndScan = (): void => {
    if (webcamRef.current) {
      try {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          // Simulate barcode detection
          const mockBarcodes = [
            "123456789012",
            "5901234123457",
            "4006381333931",
            "735135353",
            "9780201379624",
          ];

          const randomBarcode =
            mockBarcodes[Math.floor(Math.random() * mockBarcodes.length)];
          const product = getProductInfo(randomBarcode);

          setScannedData({
            barcode: randomBarcode,
            timestamp: new Date().toLocaleString(),
            product: product,
            image: imageSrc,
          });
        }
      } catch (err) {
        console.error("Error capturing image:", err);
        setError("Failed to capture image. Please try again.");
      }
    }
  };

  // Manual capture
  const handleManualCapture = (): void => {
    if (webcamRef.current && isCameraActive) {
      captureAndScan();
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* LEFT CARD - Camera Section */}
          <div className="bg-[#F6FEF9] rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <div className="p-5 md:p-6">
              <div className="p-6">
                {!isCameraActive ? (
                  <div className="flex flex-col items-center justify-center py-8 md:py-12">
                    <p>Request Camera Permissions Scan an Image File</p>
                    <div>
                      <img src={Scanner} alt="" />
                    </div>
                    <button
                      onClick={requestCameraPermission}
                      className="inline-flex items-center rounded-full gap-2 px-5 py-2.5 bg-[#ECFDF3] border border-[#067647] text-[#067647] text-sm font-medium shadow-sm hover:bg-[#dff7e7] transition"
                    >
                      <LuRefreshCcw className="text-[#067647]" />
                      Camera Active
                    </button>
                    <p className="text-gray-500 text-xs mt-4 text-center max-w-xs">
                      Position any product barcode within the frame to
                      automatically search your inventory.
                    </p>
                    {error && error.includes("Camera permission") && (
                      <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 max-w-xs">
                        <p className="text-red-600 text-xs text-center">
                          {error}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Camera Preview */}
                    <div className="relative bg-gray-900 rounded-xl overflow-hidden">
                      {cameraStreamRef.current && (
                        <Webcam
                          ref={webcamRef}
                          audio={false}
                          screenshotFormat="image/jpeg"
                          videoConstraints={{
                            deviceId: selectedDeviceId || undefined,
                            width: { ideal: 1280 },
                            height: { ideal: 720 },
                            facingMode: { ideal: "environment" },
                          }}
                          className="w-full h-80 md:h-96 object-cover"
                        />
                      )}

                      {/* Scanner Overlay */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-56 h-56 md:w-64 md:h-64 border-2 border-green-500 rounded-lg relative">
                            {/* Corner brackets */}
                            <div className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 border-t-2 border-l-2 border-green-500"></div>
                            <div className="absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-green-500"></div>
                            <div className="absolute bottom-0 left-0 w-6 h-6 md:w-8 md:h-8 border-b-2 border-l-2 border-green-500"></div>
                            <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 border-b-2 border-r-2 border-green-500"></div>

                            {/* Scanning line */}
                            {isScanning && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="h-0.5 w-full bg-green-500 animate-pulse shadow-lg shadow-green-500"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Camera Controls Overlay */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3">
                        <button
                          onClick={handleManualCapture}
                          className="px-3 py-1.5 md:px-4 md:py-2 bg-white bg-opacity-95 rounded-full text-xs md:text-sm font-semibold text-gray-700 hover:bg-opacity-100 transition-all shadow-lg hover:shadow-xl"
                        >
                          Capture
                        </button>
                        {devices.length > 1 && (
                          <select
                            value={selectedDeviceId || ""}
                            onChange={(e) =>
                              setSelectedDeviceId(e.target.value)
                            }
                            className="px-2 py-1.5 md:px-3 md:py-2 bg-white bg-opacity-95 rounded-full text-xs md:text-sm text-gray-700"
                          >
                            {devices.map((device) => (
                              <option
                                key={device.deviceId}
                                value={device.deviceId}
                              >
                                {device.label}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    </div>

                    {/* Scan Controls */}
                    <div className="flex flex-wrap gap-3 justify-center">
                      {!isScanning ? (
                        <button
                          onClick={startScanning}
                          className="px-5 py-2 md:px-6 md:py-2.5 bg-green-600 text-white rounded-full text-sm md:text-base font-semibold hover:bg-green-700 transition-all flex items-center gap-2 shadow-md"
                        >
                          <FaCamera size={14} />
                          Start Auto-Scan
                        </button>
                      ) : (
                        <button
                          onClick={stopScanning}
                          className="px-5 py-2 md:px-6 md:py-2.5 bg-red-600 text-white rounded-full text-sm md:text-base font-semibold hover:bg-red-700 transition-all flex items-center gap-2 shadow-md"
                        >
                          <FaStop size={14} />
                          Stop Scanning
                        </button>
                      )}
                      <button
                        onClick={stopCamera}
                        className="px-5 py-2 md:px-6 md:py-2.5 bg-gray-600 text-white rounded-full text-sm md:text-base font-semibold hover:bg-gray-700 transition-all shadow-md"
                      >
                        Close Camera
                      </button>
                    </div>

                    {/* Scanned Results */}
                    {scannedData && (
                      <div className="mt-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 animate-slideIn">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-sm md:text-base font-semibold text-green-800 flex items-center gap-2">
                            <span className="text-lg">✅</span> Scan Successful!
                          </h4>
                          <button
                            onClick={() => setScannedData(null)}
                            className="text-gray-400 hover:text-gray-600 text-xs md:text-sm"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="grid grid-cols-2 gap-2">
                            <span className="font-medium text-gray-600">
                              Barcode:
                            </span>
                            <span className="text-gray-800 font-mono text-xs break-all">
                              {scannedData.barcode}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <span className="font-medium text-gray-600">
                              Product:
                            </span>
                            <span className="text-gray-800 font-semibold">
                              {scannedData.product.name}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <span className="font-medium text-gray-600">
                              SKU:
                            </span>
                            <span className="text-gray-800">
                              {scannedData.product.sku}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <span className="font-medium text-gray-600">
                              Price:
                            </span>
                            <span className="text-green-600 font-bold">
                              ${scannedData.product.price.toFixed(2)}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <span className="font-medium text-gray-600">
                              Stock:
                            </span>
                            <span
                              className={`font-semibold ${scannedData.product.stock < 10 ? "text-red-600" : "text-gray-800"}`}
                            >
                              {scannedData.product.stock} units
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <span className="font-medium text-gray-600">
                              Time:
                            </span>
                            <span className="text-gray-500 text-xs">
                              {scannedData.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Error Display */}
                    {error && (
                      <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
                        <div className="flex items-start gap-2">
                          <FiAlertTriangle
                            className="text-red-500 mt-0.5 flex-shrink-0"
                            size={16}
                          />
                          <p className="text-red-600 text-sm flex-1">{error}</p>
                          <button
                            onClick={() => setError(null)}
                            className="text-red-400 hover:text-red-600 text-xs"
                          >
                            Dismiss
                          </button>
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
                )}
              </div>
            </div>
          </div>

          <div className=" space-y-5">
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
                    <HiOutlineExclamationTriangle
                      size={24}
                      className="text-[#92370D]"
                    />
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
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Scann;

// import { FaBoxOpen } from "react-icons/fa";
// import { FiAlertTriangle } from "react-icons/fi";

// import Scanner from "@/assets/primepos/photo/scanner.svg";

// const Scann = () => {
//   return (
//     <div className=" flex items-center justify-center ">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8  w-full">
//         {/* LEFT CARD */}
//         <div className="bg-green-50 rounded-2xl shadow-md p-8 flex flex-col items-center justify-center">
//           <h2 className="text-gray-500 text-sm mb-6">
//             Request Camera Permissions Scan an Image File
//           </h2>

//           <img src={Scanner} alt="" className=" h-90 w-90" />

//           {/* Button */}
//           <button className="mt-6 px-5 py-2 border border-green-500 text-green-600 rounded-full text-sm hover:bg-green-100 transition">
//             ● Camera Active
//           </button>

//           <p className="text-gray-400 text-xs mt-4 text-center max-w-xs">
//             Position any product barcode within the frame to automatically
//             search your inventory.
//           </p>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="flex flex-col justify-center gap-6">
//           {/* Inventory Card */}
//           <div className="flex items-center gap-4 bg-gray-50 shadow-md rounded-xl p-5">
//             <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
//               <FaBoxOpen size={20} />
//             </div>
//             <div>
//               <h3 className="text-sm font-semibold text-gray-700">
//                 Inventory Lookup
//               </h3>
//               <p className="text-xs text-gray-500">
//                 Instantly find stock levels and pricing by scanning.
//               </p>
//             </div>
//           </div>

//           {/* Troubleshooting Card */}
//           <div className="flex items-center gap-4 bg-orange-50 shadow-md rounded-xl p-5">
//             <div className="p-3 bg-orange-100 rounded-lg text-orange-500">
//               <FiAlertTriangle size={20} />
//             </div>
//             <div>
//               <h3 className="text-sm font-semibold text-gray-700">
//                 Troubleshooting
//               </h3>
//               <p className="text-xs text-gray-500">
//                 Ensure good lighting and hold the device steady.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Scann;
