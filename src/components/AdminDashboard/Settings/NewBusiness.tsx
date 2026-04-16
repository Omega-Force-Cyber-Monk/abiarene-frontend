import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateTenantMutation,
  useCreateRoleMutation,
  useCreateTenantUserMutation,
} from "@/redux/features/admin/adminTenant/adminTenantApi";
import {
  INDUSTRY_OPTIONS,
  IndustryType,
} from "@/redux/features/admin/adminTenant/adminTenant.types";
import { toast } from "sonner";

interface RoleConfig {
  label: string;
  name: string;
  value: string;
  required?: boolean;
}

const AVAILABLE_ROLES: RoleConfig[] = [
  {
    label: "Manager",
    value: "Manager",
    required: true,
    name: "",
  },
  {
    label: "Server",
    value: "Server",
    name: "",
  },
  {
    label: "Cashier",
    value: "Cashier",
    name: "",
  },
  {
    label: "Kitchen Staff",
    value: "Kitchen",
    name: "",
  },
];

export default function NewBusiness() {
  const navigate = useNavigate();
  const [createTenant] = useCreateTenantMutation();
  const [createRole] = useCreateRoleMutation();
  const [createUser] = useCreateTenantUserMutation();

  const [formData, setFormData] = useState({
    name: "",
    industry: "" as IndustryType | "",
    subscriptionFee: 129,
  });

  const [selectedRoles, setSelectedRoles] = useState<string[]>(["Manager"]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleRole = (value: string) => {
    setSelectedRoles((prev) =>
      prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value],
    );
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.name.trim()) {
      toast.error("Please enter business name");
      return;
    }
    if (!formData.industry) {
      toast.error("Please select industry type");
      return;
    }
    if (formData.subscriptionFee <= 0) {
      toast.error("Please enter valid subscription fee");
      return;
    }

    setIsSubmitting(true);

    try {
      // Step 1: Create tenant
      const tenant = await createTenant({
        name: formData.name,
        industry: formData.industry,
        subscriptionFee: formData.subscriptionFee,
      }).unwrap();

      toast.success("Tenant created successfully");

      // Step 2: Create roles for the tenant
      const rolePromises = selectedRoles.map(async (roleName) => {
        const role = await createRole({
          tenantId: tenant.id,
          data: {
            name: roleName,
            isActive: true,
          },
        }).unwrap();
        return { role, roleName };
      });

      const createdRoles = await Promise.all(rolePromises);

      // Step 3: Create a manager user (if Manager role exists)
      const managerRole = createdRoles.find((r) => r.roleName === "Manager");
      if (managerRole) {
        await createUser({
          tenantId: tenant.id,
          data: {
            name: `${formData.name} Manager`,
            pin: Math.floor(1000 + Math.random() * 9000).toString(), // Generate random 4-digit PIN
            roleId: managerRole.role.id,
            status: "ACTIVE",
          },
        }).unwrap();
      }

      toast.success(
        `Business "${formData.name}" created successfully with ${selectedRoles.length} roles`,
      );

      // Navigate back to tenants list
      setTimeout(() => {
        navigate("/admin-dashboard/tenants");
      }, 1500);
    } catch (error: any) {
      console.error("Error creating business:", error);
      toast.error(
        error?.data?.message || "Failed to create business. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      {/* Header */}
      <h1 className="text-xl font-semibold mb-6">
        Register New Clientele Level Business
      </h1>

      {/* Top Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-gray-600 font-medium">
            Business Name *
          </label>
          <input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full mt-1 border border-[#D5D7DA] rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#052350]"
            placeholder="e.g. Le Bistro Douala"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Industry Type *
          </label>
          <Select
            value={formData.industry}
            onValueChange={(value) =>
              setFormData({ ...formData, industry: value as IndustryType })
            }
          >
            <SelectTrigger className="w-full mt-1 cursor-pointer rounded-full border border-gray-300 bg-white px-4 py-2.5 text-sm shadow-sm focus:ring-2 focus:ring-[#061E49] transition-all duration-200">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>

            <SelectContent className="rounded-2xl border bg-white border-gray-200 shadow-lg">
              {INDUSTRY_OPTIONS.map((industry) => (
                <SelectItem
                  key={industry.value}
                  value={industry.value}
                  className="cursor-pointer rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-[#061E49]/10 focus:bg-[#061E49]/20"
                >
                  {industry.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm text-gray-600 font-medium">
            Monthly Subscription Fee ($) *
          </label>
          <input
            type="number"
            value={formData.subscriptionFee}
            onChange={(e) =>
              setFormData({
                ...formData,
                subscriptionFee: Number(e.target.value),
              })
            }
            className="w-full mt-1 border border-[#D5D7DA] rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#052350]"
            placeholder="Enter subscription fee"
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
              Select which employee roles this business needs. Manager is always
              included.
            </p>
          </div>
        </div>

        {/* Role List */}
        <div className="mt-4 space-y-3">
          {AVAILABLE_ROLES.map((role) => {
            const checked = selectedRoles.includes(role.value);
            const isRequired = role.required;

            return (
              <div
                key={role.value}
                className="flex items-center justify-between border border-[#D5D7DA] rounded-full px-4 py-3"
              >
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={isRequired}
                    onChange={() => toggleRole(role.value)}
                    className="w-4 h-4 accent-[#052350]"
                  />
                  <span className="text-sm">
                    {role.label}
                    {isRequired && " (Required)"}
                  </span>
                </label>
              </div>
            );
          })}
        </div>

        {/* Selected Summary */}
        <p className="text-sm text-gray-500 mt-4">
          Selected:{" "}
          {AVAILABLE_ROLES.filter((r) => selectedRoles.includes(r.value))
            .map((r) => r.label)
            .join(", ")}
        </p>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 mt-8">
        <button
          onClick={() => navigate("/admin-dashboard/tenants")}
          className="bg-gray-200 cursor-pointer text-gray-700 px-6 py-2 rounded-full font-medium hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-[#052350] cursor-pointer text-white px-6 py-2 rounded-full font-medium hover:bg-[#061E49] transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? "Creating..."
            : `Create Tenant (${selectedRoles.length} roles enabled)`}
        </button>
      </div>
    </div>
  );
}

// import { useState } from "react";

// type Role = {
//   label: string;
//   value: string;
//   required?: boolean;
// };

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const roles: Role[] = [
//   { label: "Manager (Required)", value: "manager", required: true },
//   { label: "Server", value: "server" },
//   { label: "Cashier", value: "cashier" },
//   { label: "Kitchen Staff", value: "kitchen" },
//   { label: "Stock Clerk", value: "stock" },
//   { label: "Sales Associate", value: "sales" },
// ];

// export default function NewBusiness() {
//   const [selectedRoles, setSelectedRoles] = useState<string[]>([
//     "manager",
//     "server",
//     "cashier",
//     "kitchen",
//   ]);

//   const toggleRole = (value: string) => {
//     setSelectedRoles((prev) =>
//       prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value],
//     );
//   };

//   return (
//     <div className="w-full mx-auto  ">
//       {/* Header */}
//       <h1 className="text-xl font-semibold mb-6">
//         Register New Clientele Level Business
//       </h1>

//       {/* Top Form */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div>
//           <label className="text-sm text-gray-600">Business Name</label>
//           <input
//             className="w-full mt-1 border border-[#D5D7DA] rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#052350]"
//             placeholder="e.g. Le Bistro Douala"
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="text-sm font-medium text-gray-700">
//             Industry Type
//           </label>

//           <Select
//           // value={formData.role}
//           // onValueChange={(value) => setFormData({ ...formData, role: value })}
//           >
//             <SelectTrigger className="w-full mt-1 cursor-pointer rounded-full border border-gray-300 bg-white px-4 py-2.5 text-sm shadow-sm focus:ring-2 focus:ring-[#061E49] transition-all duration-200">
//               <SelectValue placeholder="Select role" />
//             </SelectTrigger>

//             <SelectContent className="rounded-2xl border bg-white border-gray-200 shadow-lg">
//               <SelectItem
//                 value="Manager"
//                 className="cursor-pointer rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-[#061E49]/10 focus:bg-[#061E49]/20"
//               >
//                 Manager
//               </SelectItem>

//               <SelectItem
//                 value="Server"
//                 className="cursor-pointer rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-[#061E49]/10 focus:bg-[#061E49]/20"
//               >
//                 Server
//               </SelectItem>

//               <SelectItem
//                 value="Kitchen"
//                 className="cursor-pointer rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-[#061E49]/10 focus:bg-[#061E49]/20"
//               >
//                 Kitchen
//               </SelectItem>

//               <SelectItem
//                 value="Cashier"
//                 className="cursor-pointer rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-[#061E49]/10 focus:bg-[#061E49]/20"
//               >
//                 Cashier
//               </SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div>
//           <label className="text-sm text-gray-600">
//             Monthly Subscription Fee
//           </label>
//           <input
//             className="w-full mt-1 border border-[#D5D7DA] rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#052350]"
//             placeholder="$ Scan or enter code"
//           />
//         </div>
//       </div>

//       {/* Roles Section */}
//       <div className="mt-8">
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="font-semibold text-lg">
//               Enabled Roles for this Business
//             </h2>
//             <p className="text-sm text-gray-500">
//               Select which employee roles this business needs, Manager is always
//               included,
//             </p>
//           </div>

//           <button className="w-10 cursor-pointer h-10 rounded-full bg-[#052350] text-white text-xl flex items-center justify-center">
//             +
//           </button>
//         </div>

//         {/* Role List */}
//         <div className="mt-4 space-y-3">
//           {roles.map((role) => {
//             const checked = selectedRoles.includes(role.value);

//             return (
//               <div
//                 key={role.value}
//                 className="flex items-center justify-between border  border-[#D5D7DA] rounded-full px-4 py-3"
//               >
//                 <label className="flex items-center gap-3 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={checked}
//                     disabled={role.required}
//                     onChange={() => toggleRole(role.value)}
//                     className="w-4 h-4 accent-[#052350]"
//                   />
//                   <span className="text-sm">{role.label}</span>
//                 </label>
//               </div>
//             );
//           })}
//         </div>

//         {/* Selected */}
//         <p className="text-sm text-gray-500 mt-4">
//           Selected:{" "}
//           {roles
//             .filter((r) => selectedRoles.includes(r.value))
//             .map((r) => r.label.replace(" (Required)", ""))
//             .join(", ")}
//         </p>
//       </div>

//       {/* Footer */}
//       <div className="flex justify-end mt-8">
//         <button className="bg-[#052350] cursor-pointer text-white px-6 py-2 rounded-full font-medium">
//           Create Tenant ({selectedRoles.length} roles enabled)
//         </button>
//       </div>
//     </div>
//   );
// }
