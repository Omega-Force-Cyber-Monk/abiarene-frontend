/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { IoIosSave, IoMdClose } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Discount, useUpdateDiscountMutation } from "@/redux/features/restaurant/discount/discountApi";
import { toast } from "react-hot-toast";

interface EditVoucherModalProps {
  voucher: Discount;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditVoucherModal({ voucher, isOpen, onClose }: EditVoucherModalProps) {
  const [updateDiscount, { isLoading }] = useUpdateDiscountMutation();
  const [formData, setFormData] = useState({
    name: voucher.name,
    minPrice: voucher.minimumPrice.toString(),
    offPrice: voucher.offPrice.toString(),
    isActive: voucher.isActive,
  });

  useEffect(() => {
    setFormData({
      name: voucher.name,
      minPrice: voucher.minimumPrice.toString(),
      offPrice: voucher.offPrice.toString(),
      isActive: voucher.isActive,
    });
  }, [voucher]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateDiscount({
        id: voucher.id,
        data: {
          name: formData.name,
          minimumPrice: Number(formData.minPrice),
          offPrice: Number(formData.offPrice),
          isActive: formData.isActive,
        },
      }).unwrap();
      
      toast.success("Voucher updated successfully!");
      onClose();
    } catch (error: any) {
      console.error("Failed to update voucher:", error);
      toast.error(error?.data?.message || "Failed to update voucher");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#FFF7EC] rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-[#FFF7EC] px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">Edit Voucher</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <IoMdClose size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-[#6C7787]">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g. Weekend Offer"
                className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
                required
              />
            </div>

            <div>
              <label className="text-sm text-[#6C7787]">Minimum Price</label>
              <input
                type="number"
                value={formData.minPrice}
                onChange={(e) =>
                  setFormData({ ...formData, minPrice: e.target.value })
                }
                placeholder="e.g. 100"
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <Select
                value={formData.isActive ? "true" : "false"}
                onValueChange={(value) =>
                  setFormData({ ...formData, isActive: value === "true" })
                }
              >
                <SelectTrigger className="w-full cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 text-gray-500 border border-gray-200 rounded-full hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-2 bg-[#061E49] text-white rounded-full hover:bg-[#0A2A66] transition disabled:opacity-50 cursor-pointer"
              >
                <IoIosSave />
                <span>{isLoading ? "Saving..." : "Save Changes"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
