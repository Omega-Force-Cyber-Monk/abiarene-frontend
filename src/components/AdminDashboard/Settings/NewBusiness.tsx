import { useState } from "react";

type Role = {
  label: string;
  value: string;
  required?: boolean;
};

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const roles: Role[] = [
  { label: "Manager (Required)", value: "manager", required: true },
  { label: "Server", value: "server" },
  { label: "Cashier", value: "cashier" },
  { label: "Kitchen Staff", value: "kitchen" },
  { label: "Stock Clerk", value: "stock" },
  { label: "Sales Associate", value: "sales" },
];

export default function NewBusiness() {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([
    "manager",
    "server",
    "cashier",
    "kitchen",
  ]);

  const toggleRole = (value: string) => {
    setSelectedRoles((prev) =>
      prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value],
    );
  };

  return (
    <div className="w-full mx-auto  ">
      {/* Header */}
      <h1 className="text-xl font-semibold mb-6">
        Register New Clientele Level Business
      </h1>

      {/* Top Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-gray-600">Business Name</label>
          <input
            className="w-full mt-1 border border-[#D5D7DA] rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#052350]"
            placeholder="e.g. Le Bistro Douala"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Industry Type
          </label>

          <Select
          // value={formData.role}
          // onValueChange={(value) => setFormData({ ...formData, role: value })}
          >
            <SelectTrigger className="w-full mt-1 cursor-pointer rounded-full border border-gray-300 bg-white px-4 py-2.5 text-sm shadow-sm focus:ring-2 focus:ring-[#061E49] transition-all duration-200">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>

            <SelectContent className="rounded-2xl border bg-white border-gray-200 shadow-lg">
              <SelectItem
                value="Manager"
                className="cursor-pointer rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-[#061E49]/10 focus:bg-[#061E49]/20"
              >
                Manager
              </SelectItem>

              <SelectItem
                value="Server"
                className="cursor-pointer rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-[#061E49]/10 focus:bg-[#061E49]/20"
              >
                Server
              </SelectItem>

              <SelectItem
                value="Kitchen"
                className="cursor-pointer rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-[#061E49]/10 focus:bg-[#061E49]/20"
              >
                Kitchen
              </SelectItem>

              <SelectItem
                value="Cashier"
                className="cursor-pointer rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-[#061E49]/10 focus:bg-[#061E49]/20"
              >
                Cashier
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm text-gray-600">
            Monthly Subscription Fee
          </label>
          <input
            className="w-full mt-1 border border-[#D5D7DA] rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#052350]"
            placeholder="$ Scan or enter code"
          />
        </div>
      </div>

      {/* Roles Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-lg">
              Enabled Roles for this Business
            </h2>
            <p className="text-sm text-gray-500">
              Select which employee roles this business needs, Manager is always
              included,
            </p>
          </div>

          <button className="w-10 cursor-pointer h-10 rounded-full bg-[#052350] text-white text-xl flex items-center justify-center">
            +
          </button>
        </div>

        {/* Role List */}
        <div className="mt-4 space-y-3">
          {roles.map((role) => {
            const checked = selectedRoles.includes(role.value);

            return (
              <div
                key={role.value}
                className="flex items-center justify-between border  border-[#D5D7DA] rounded-full px-4 py-3"
              >
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={role.required}
                    onChange={() => toggleRole(role.value)}
                    className="w-4 h-4 accent-[#052350]"
                  />
                  <span className="text-sm">{role.label}</span>
                </label>
              </div>
            );
          })}
        </div>

        {/* Selected */}
        <p className="text-sm text-gray-500 mt-4">
          Selected:{" "}
          {roles
            .filter((r) => selectedRoles.includes(r.value))
            .map((r) => r.label.replace(" (Required)", ""))
            .join(", ")}
        </p>
      </div>

      {/* Footer */}
      <div className="flex justify-end mt-8">
        <button className="bg-[#052350] cursor-pointer text-white px-6 py-2 rounded-full font-medium">
          Create Tenant ({selectedRoles.length} roles enabled)
        </button>
      </div>
    </div>
  );
}
