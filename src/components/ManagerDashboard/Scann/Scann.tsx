import { FaBoxOpen } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";

import Scanner from "@/assets/primepos/photo/scanner.svg";

const Scann = () => {
  return (
    <div className=" flex items-center justify-center ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8  w-full">
        {/* LEFT CARD */}
        <div className="bg-green-50 rounded-2xl shadow-md p-8 flex flex-col items-center justify-center">
          <h2 className="text-gray-500 text-sm mb-6">
            Request Camera Permissions Scan an Image File
          </h2>

          {/* Scanner Frame */}
          {/* <div className="relative w-64 h-64 bg-green-200/50 rounded-xl flex items-center justify-center">
       
            <div className="w-40 h-40 bg-green-300 rounded-lg"></div>

        
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-gray-400 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-gray-400 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-gray-400 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-gray-400 rounded-br-lg"></div>
            </div>

         
            <div className="absolute w-full h-2 bg-gray-300 rounded-full"></div>
          </div> */}

          <img src={Scanner} alt="" className=" h-90 w-90" />

          {/* Button */}
          <button className="mt-6 px-5 py-2 border border-green-500 text-green-600 rounded-full text-sm hover:bg-green-100 transition">
            ● Camera Active
          </button>

          <p className="text-gray-400 text-xs mt-4 text-center max-w-xs">
            Position any product barcode within the frame to automatically
            search your inventory.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col justify-center gap-6">
          {/* Inventory Card */}
          <div className="flex items-center gap-4 bg-gray-50 shadow-md rounded-xl p-5">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
              <FaBoxOpen size={20} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700">
                Inventory Lookup
              </h3>
              <p className="text-xs text-gray-500">
                Instantly find stock levels and pricing by scanning.
              </p>
            </div>
          </div>

          {/* Troubleshooting Card */}
          <div className="flex items-center gap-4 bg-orange-50 shadow-md rounded-xl p-5">
            <div className="p-3 bg-orange-100 rounded-lg text-orange-500">
              <FiAlertTriangle size={20} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700">
                Troubleshooting
              </h3>
              <p className="text-xs text-gray-500">
                Ensure good lighting and hold the device steady.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scann;
