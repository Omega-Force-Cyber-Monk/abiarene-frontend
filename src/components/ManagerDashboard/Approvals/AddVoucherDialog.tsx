/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { IoIosSave, IoMdClose } from "react-icons/io";

import { useCreateDiscountMutation } from "@/redux/features/restaurant";
import { toast } from "react-hot-toast";

export default function AddVoucherDialog() {
  const [open, setOpen] = useState(false);
  const [createDiscount, { isLoading }] = useCreateDiscountMutation();

  const [formData, setFormData] = useState({
    name: "",
    minPrice: "",
    offPrice: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createDiscount({
        name: formData.name,
        minimumPrice: Number(formData.minPrice.replace(/[^0-9.]/g, "")),
        offPrice: Number(formData.offPrice.replace(/[^0-9.]/g, "")),
        isActive: true,
      }).unwrap();
      
      toast.success("Voucher added successfully!");
      setFormData({ name: "", minPrice: "", offPrice: "" });
      setOpen(false);
    } catch (error: any) {
      console.error("Failed to add voucher:", error);
      toast.error(error?.data?.message || "Failed to add voucher");
    }
  };

  return (
    <div className="w-full bg-white border-[#DDDDDD]">
      {/* Add Voucher Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 bg-[#061E49] text-white px-5 py-2 cursor-pointer rounded-full shadow-md hover:opacity-90 transition"
        >
          {open ? "Close Form" : "+ Add Voucher"}
        </button>
      </div>

      {/* Smooth Expand Form */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#FFF7EC] rounded-2xl shadow-xl p-6 border border-gray-100 mb-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 border-b border-[#C6CAD1] pb-2">
            <h2 className="text-lg font-semibold text-gray-800">
              Add Voucher
            </h2>

            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 cursor-pointer hover:text-red-500"
            >
              <IoMdClose size={22} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-[#6C7787]">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Farm Chicken"
                  className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-[#6C7787]">Minimum Price</label>
                <input
                  type="text"
                  value={formData.minPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, minPrice: e.target.value })
                  }
                  placeholder="e.g. $72"
                  className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
                  required
                />
              </div>

              <div>
                <label className="text-sm text-[#6C7787]">Off Price (%)</label>
                <input
                  type="number"
                  value={formData.offPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, offPrice: e.target.value })
                  }
                  placeholder="e.g. 10"
                  className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
                  required
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end items-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-5 text-[#684F1A] border-[#684F1A] cursor-pointer py-2 rounded-full border text-base font-medium hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="flex cursor-pointer items-center gap-2 px-6 py-2.5 rounded-full bg-[#061E49] text-white text-sm font-medium shadow-sm hover:bg-[#0A2A66] transition-all duration-200 disabled:opacity-50"
              >
                <IoIosSave className="text-lg" />
                <span>{isLoading ? "Saving..." : "Save"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
