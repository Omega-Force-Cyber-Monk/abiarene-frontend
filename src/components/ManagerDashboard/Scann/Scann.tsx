import React, { useState, useRef, useEffect, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";

// Components
import { InitialView } from "./components/InitialView";
import { ScannerView } from "./components/ScannerView";
import { ScanResults } from "./components/ScanResults";
import { ScanInfoCards } from "./components/ScanInfoCards";

// Types
import { ScannedData, ProductInfo } from "./types";

const READER_ID = "qr-reader";

const Scann: React.FC = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<ScannedData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Use a ref to track actual running state (more reliable than library's isScanning)
  const qrRef = useRef<Html5Qrcode | null>(null);
  const isRunningRef = useRef(false);

  const getProductInfo = (barcode: string): ProductInfo => {
    const products: Record<string, ProductInfo> = {
      "123456789012": { name: "Wireless Mouse", price: 29.99, stock: 45, sku: "WM-001" },
      "5901234123457": { name: "USB-C Cable", price: 12.99, stock: 120, sku: "UC-002" },
      "4006381333931": { name: "Bluetooth Headphones", price: 89.99, stock: 23, sku: "BH-003" },
      "735135353": { name: "Screen Protector", price: 9.99, stock: 67, sku: "SP-004" },
      "9780201379624": { name: "Programming Book", price: 49.99, stock: 12, sku: "PB-005" },
    };
    return products[barcode] || { name: "Unknown Product", price: 0, stock: 0, sku: "N/A" };
  };

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
        (decodedText) => {
          const product = getProductInfo(decodedText);
          setScannedData({
            barcode: decodedText,
            timestamp: new Date().toLocaleString(),
            product,
          });
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
                />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <ScanInfoCards />
          </div>
        </div>
      </div>

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
