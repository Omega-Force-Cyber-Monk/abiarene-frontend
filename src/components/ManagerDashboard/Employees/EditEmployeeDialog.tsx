// src/components/employees/EditEmployeeDialog.tsx

import { useState, useEffect } from "react";
import { IoIosSave, IoMdClose } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  useUpdateEmployeeMutation,
  useGetRolesQuery,
} from "@/redux/features/manager/managerEmployee/employeeApi";
import { toast } from "sonner";
import {
  Employee,
  UpdateEmployeeRequest,
} from "@/redux/features/manager/managerEmployee/employee";

interface EditEmployeeDialogProps {
  user: Employee;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const EditEmployeeDialog = ({
  user,
  isOpen,
  onClose,
  onUpdate,
}: EditEmployeeDialogProps) => {
  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();
  const { data: roles } = useGetRolesQuery();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    roleId: user.roleId,
    pin: user.pin,
    status: user.status,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        roleId: user.roleId,
        pin: user.pin,
        status: user.status,
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.pin.length !== 4) {
      toast.error("PIN must be exactly 4 digits");
      return;
    }

    const updateData: UpdateEmployeeRequest = {
      name: formData.name,
      email: formData.email,
      pin: formData.pin,
      // roleId: formData.roleId,
      status: formData.status,
    };

    try {
      await updateEmployee({
        id: user.id,
        data: updateData,
      }).unwrap();

      toast.success("Employee updated successfully!");
      onUpdate();
      onClose();
    } catch (error: any) {
      console.error("Failed to update employee:", error);
      toast.error(error?.data?.message || "Failed to update employee");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex bg-black/50 backdrop-blur-[0.2px] items-center justify-center">
      <div className="bg-[#FFF7EC] rounded-2xl shadow-xl p-6 w-full max-w-2xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 border-b border-[#C6CAD1] pb-2">
          <h2 className="text-lg font-semibold text-gray-800">
            Edit Employee Profile
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 cursor-pointer hover:text-red-500"
          >
            <IoMdClose size={22} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-md text-[#4D5665]">Employee Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g. John Doe"
                className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
                required
              />
            </div>

            <div>
              <label className="text-md text-[#4D5665]">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="e.g. john@example.com"
                className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                System Role
              </label>

              <Select
                value={formData.roleId}
                onValueChange={(value) =>
                  setFormData({ ...formData, roleId: value })
                }
              >
                <SelectTrigger className="w-full mt-1 cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm shadow-sm focus:ring-2 focus:ring-[#061E49] transition-all duration-200">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>

                <SelectContent className="rounded-xl border bg-white border-gray-200 shadow-lg">
                  {roles?.map((role) => (
                    <SelectItem
                      key={role.id}
                      value={role.id}
                      className="cursor-pointer rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-[#061E49]/10 focus:bg-[#061E49]/20"
                    >
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-[#4D5665]">
                Quick-Login PIN (4 digits)
              </label>
              <input
                type="number"
                value={formData.pin}
                onChange={(e) =>
                  setFormData({ ...formData, pin: e.target.value.slice(0, 4) })
                }
                placeholder="Enter 4-digit PIN"
                className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
                minLength={4}
                maxLength={4}
                required
              />
            </div>
          </div>

          {/* Status Field */}
          <div className="mt-4">
            <label className="text-sm text-[#4D5665]">Status</label>
            <Select
              value={formData.status}
              onValueChange={(value: "ACTIVE" | "INACTIVE") =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger className="w-full mt-1 cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm shadow-sm focus:ring-2 focus:ring-[#061E49] transition-all duration-200">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border bg-white border-gray-200 shadow-lg">
                <SelectItem value="ACTIVE" className="cursor-pointer">
                  Active
                </SelectItem>
                <SelectItem value="INACTIVE" className="cursor-pointer">
                  Inactive
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end items-center gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 text-[#684F1A] border-[#684F1A] cursor-pointer py-2 rounded-full border text-base font-medium hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex cursor-pointer items-center gap-2 px-6 py-2.5 rounded-full bg-[#061E49] text-white text-sm font-medium shadow-sm hover:bg-[#0A2A66] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IoIosSave className="text-lg" />
              <span>{isLoading ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeDialog;
