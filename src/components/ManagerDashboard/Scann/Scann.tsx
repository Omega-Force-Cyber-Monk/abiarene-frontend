import React, { useState, useRef, useEffect, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";

import { useLazyGetInventoryByValueQuery } from "@/redux/features/restaurant/inventory/inventoryApi";

// Components
import { InitialView } from "./components/InitialView";
import { ScannerView } from "./components/ScannerView";
import { ScanResults } from "./components/ScanResults";
import { ScanInfoCards } from "./components/ScanInfoCards";
import { AddInventoryModal } from "./components/AddInventoryModal";
import { UpdateInventoryModal } from "./components/UpdateInventoryModal";

// Types
import { ScannedData } from "./types";

const READER_ID = "qr-reader";

const Scann: React.FC = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<ScannedData | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // State for Add/Update Inventory Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [lastScannedBarcode, setLastScannedBarcode] = useState("");

  // Use a ref to track actual running state (more reliable than library's isScanning)
  const qrRef = useRef<Html5Qrcode | null>(null);
  const isRunningRef = useRef(false);
  const isProcessingRef = useRef(false); // To prevent multiple scans of same item

  // RTK Query lazy hook to fetch inventory by barcode
  const [triggerLookup] = useLazyGetInventoryByValueQuery();

  const stopScanning = useCallback(async () => {
    if (isRunningRef.current && qrRef.current) {
      try {
        await qrRef.current.stop();
      } catch { /* ignore */ }
      isRunningRef.current = false;
    }
    setIsScanning(false);
  }, []);

  const startScanning = useCallback(async () => {
    if (isRunningRef.current) return;

    try {
      // Clean up previous instance if exists
      if (qrRef.current) {
        try { await qrRef.current.stop(); } catch { /* ignore */ }
        qrRef.current = null;
      }

      const scanner = new Html5Qrcode(READER_ID);
      qrRef.current = scanner;
      isRunningRef.current = true;

      await scanner.start(
        { facingMode: "environment" },
        { fps: 15, qrbox: { width: 280, height: 280 }, aspectRatio: 1.6 },
        async (decodedText) => {
          if (isProcessingRef.current) return;
          isProcessingRef.current = true;
          
          console.log("Scanned Barcode:", decodedText);
          
          try {
            const result = await triggerLookup(decodedText).unwrap();
            console.log("API Result:", result);
            
            if (result) {
              setScannedData({
                barcode: decodedText,
                timestamp: new Date().toLocaleString(),
                product: result,
              });
              setError(null);
              setLastScannedBarcode("");
            } else {
              // Handle null response as not found
              setError(`Item "${decodedText}" not found in inventory.`);
              setLastScannedBarcode(decodedText);
              setScannedData(null);
            }
          } catch (err: any) {
            console.error("Lookup Error:", err);
            setError(`Item "${decodedText}" not found in inventory.`);
            setLastScannedBarcode(decodedText);
            setScannedData(null);
          } finally {
            setTimeout(() => {
              isProcessingRef.current = false;
            }, 2000);
          }
        },
        () => {}
      );

      setIsScanning(true);
      setError(null);
    } catch (err) {
      isRunningRef.current = false;
      const msg = err instanceof Error ? err.message : String(err);
      if (!msg.toLowerCase().includes("not running") && !msg.toLowerCase().includes("not paused")) {
        setError(`Camera error: ${msg}`);
        setIsCameraActive(false);
      }
    }
  }, []);

  const requestCameraPermission = () => {
    setIsCameraActive(true);
    setError(null);
  };

  const stopCamera = async () => {
    await stopScanning();
    setIsCameraActive(false);
    setScannedData(null);
  };

  useEffect(() => {
    if (isCameraActive) {
      const timer = setTimeout(() => startScanning(), 600);
      return () => clearTimeout(timer);
    }
  }, [isCameraActive, startScanning]);

  useEffect(() => {
    return () => { stopScanning(); };
  }, [stopScanning]);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-[#F6FEF9] rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
            <div className="p-5 md:p-6">
              <div className="p-4">
                {!isCameraActive ? (
                  <InitialView onRequestPermission={requestCameraPermission} error={error} />
                ) : (
                  <ScannerView
                    readerId={READER_ID}
                    isScanning={isScanning}
                    onStartScanning={startScanning}
                    onStopScanning={stopScanning}
                    onStopCamera={stopCamera}
                  />
                )}

                <ScanResults
                  scannedData={scannedData}
                  error={error}
                  isScanning={isScanning}
                  onClear={() => setScannedData(null)}
                  onClearError={() => setError(null)}
                  onAdd={() => setIsAddModalOpen(true)}
                  onEdit={() => setIsUpdateModalOpen(true)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <ScanInfoCards />
          </div>
        </div>
      </div>

      <AddInventoryModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        barcode={lastScannedBarcode}
        onSuccess={(newItem) => {
          setScannedData({
            barcode: newItem.barcode,
            timestamp: new Date().toLocaleString(),
            product: newItem
          });
          setError(null);
        }}
      />

      {scannedData?.product && (
        <UpdateInventoryModal 
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          item={scannedData.product}
          onSuccess={(updatedItem) => {
            setScannedData({
              ...scannedData,
              product: updatedItem
            });
          }}
        />
      )}

      <style>{`
        #qr-reader { border: none !important; }
        #qr-reader video { width: 100% !important; border-radius: 12px; }
        #qr-reader img { display: none !important; }
        #qr-reader__dashboard_section_csr button,
        #qr-reader__dashboard_section_swaplink { display: none !important; }
        #qr-reader__status_span { font-size: 11px; color: #6b7280; }
        #qr-reader__header_message { font-size: 11px; color: #6b7280; }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideIn { animation: slideIn 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default Scann;
