import { useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function AddEmployeeDialog() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-white border-[#DDDDDD]">
      {/* Add Employee Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 bg-[#061E49] text-white px-5 py-2 cursor-pointer rounded-full shadow-md hover:opacity-90 transition"
        >
          {open ? "Close Form" : "+ Add Employee"}
        </button>
      </div>

      {/* Smooth Expand Form */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#FFF7EC] rounded-2xl shadow-xl p-6 border border-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 border-b border-[#C6CAD1] pb-2">
            <h2 className="text-lg font-semibold text-gray-800">
              New Product Details
            </h2>

            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-red-500"
            >
              <IoMdClose size={22} />
            </button>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-[#6C7787]">Product Name</label>
              <input
                type="text"
                placeholder="e.g. Farm Chicken"
                className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
              />
            </div>

            <div>
              <label className="text-sm text-[#6C7787]">Barcode / SKU</label>
              <div className="flex gap-2 mt-1">
                <input
                  type="text"
                  placeholder="Scan or enter code"
                  className="w-full bg-white border-[#DDDDDD] px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
                />
                <button className="px-4 py-2 rounded-xl bg-orange-100 text-orange-600 border hover:bg-orange-200">
                  Generate
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm text-[#6C7787]">Initial Stock</label>
              <input
                type="number"
                placeholder="0"
                className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
              />
            </div>

            <div>
              <label className="text-sm text-[#6C7787]">Price ($)</label>
              <input
                type="number"
                placeholder="0"
                className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setOpen(false)}
              className="px-5 py-2 cursor-pointer rounded-full border hover:bg-gray-100"
            >
              Cancel
            </button>

            <button className="px-5 py-2 cursor-pointer rounded-full bg-[#061E49] text-white hover:opacity-90">
              Save Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
