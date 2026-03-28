import { useState } from "react";
import { IoIosSave, IoMdClose } from "react-icons/io";

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
              New Employee Profile
            </h2>

            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 cursor-pointer hover:text-red-500"
            >
              <IoMdClose size={22} />
            </button>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-[#6C7787]">Product Name</label>
              <input
                type="text"
                placeholder="e.a. Farm Chicken"
                className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
              />
            </div>

            <div>
              <label className="text-sm text-[#6C7787]">System Role</label>
              <select
                className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
                defaultValue=""
              >
                <option value="" disabled>
                  Select role
                </option>
                <option value="server">Server</option>
                <option value="admin">Admin</option>
                <option value="kitchen">Kitchen</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-[#6C7787]">
                Quick-Login PIN (4 digits)
              </label>
              <input
                type="number"
                placeholder="Scan or enter code"
                className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
              />
            </div>
          </div>

          {/* Buttons */}
          {/* Buttons */}
          <div className="flex justify-end items-center gap-3 mt-6">
            <button
              onClick={() => setOpen(false)}
              className="px-5 text-[#684F1A] border-[#684F1A] cursor-pointer py-2 rounded-full border  text-base font-medium hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button className="flex  cursor-pointer items-center gap-2 px-6 py-2.5 rounded-full bg-[#061E49] text-white text-sm font-medium shadow-sm hover:bg-[#0A2A66] transition-all duration-200">
              <IoIosSave className="text-lg" />
              <span>Update identity</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
