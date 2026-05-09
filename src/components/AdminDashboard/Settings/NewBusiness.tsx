// NewBusiness.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCreateTenantMutation } from "@/redux/features/admin/adminTenant/adminTenantApi";

interface RoleConfig {
  label: string;
  value: "server" | "kitchen" | "cashier" | "manager";
  required?: boolean;
}

const AVAILABLE_ROLES: RoleConfig[] = [
  {
    label: "Manager",
    value: "manager",
    required: true,
  },
  {
    label: "Server",
    value: "server",
  },
  {
    label: "Cashier",
    value: "cashier",
  },
  {
    label: "Kitchen Staff",
    value: "kitchen",
  },
];

export default function NewBusiness() {
  const navigate = useNavigate();
  const [createTenant, { isLoading: isSubmitting }] = useCreateTenantMutation();

  const [formData, setFormData] = useState({
    name: "",
    subscriptionFee: 99.99,
    managerEmail: "",
    managerPin: "",
  });

  const [selectedRoles, setSelectedRoles] = useState<
    Array<"server" | "kitchen" | "cashier">
  >([]);

  const toggleRole = (value: "server" | "kitchen" | "cashier") => {
    setSelectedRoles((prev) =>
      prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value],
    );
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter business name");
      return false;
    }
    if (formData.subscriptionFee <= 0) {
      toast.error("Please enter valid subscription fee");
      return false;
    }
    if (!formData.managerEmail.trim()) {
      toast.error("Please enter manager email");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.managerEmail)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.managerPin.trim() || formData.managerPin.length !== 4) {
      toast.error("Please enter a valid 4-digit manager PIN");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const result = await createTenant({
        name: formData.name,
        industry: "restaurant", // Fixed to restaurant
        subscriptionFee: formData.subscriptionFee,
        managerEmail: formData.managerEmail,
        managerPin: formData.managerPin,
        server: selectedRoles.includes("server"),
        kitchen: selectedRoles.includes("kitchen"),
        cashier: selectedRoles.includes("cashier"),
      }).unwrap();

      // Success message with response data
      toast.success(
        `Business "${result.name}" created successfully! Manager invited with email: ${result.manager?.email}`,
        {
          description: `${selectedRoles.length + 1} roles enabled (Manager + ${selectedRoles.length > 0 ? selectedRoles.join(", ") : "no additional roles"})`,
        },
      );

      // Navigate back to tenants list after short delay
      setTimeout(() => {
        navigate("/admin-dashboard/tenants");
      }, 2000);
    } catch (error: any) {
      console.error("Error creating business:", error);
      toast.error(
        error?.data?.message ||
          error?.message ||
          "Failed to create business. Please try again.",
      );
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Register New Business
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Create a new restaurant tenant with role-based access control
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {/* Business Information Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Business Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Name <span className="text-red-500">*</span>
              </label>
              <input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Foodies Hub Restaurant"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Subscription Fee ($){" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.subscriptionFee}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subscriptionFee: Number(e.target.value),
                  })
                }
                className="w-full border border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter subscription fee"
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        {/* Manager Information Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Manager Account
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Manager Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.managerEmail}
                onChange={(e) =>
                  setFormData({ ...formData, managerEmail: e.target.value })
                }
                className="w-full border border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="manager@example.com"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Manager PIN <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                maxLength={4}
                value={formData.managerPin}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 4) {
                    setFormData({ ...formData, managerPin: value });
                  }
                }}
                className="w-full border border-gray-300 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter 4-digit PIN"
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        {/* Roles Section */}
        <div className="mb-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Enable Roles for this Business
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Select which employee roles this business needs, Manager is always
              included,
            </p>
          </div>

          {/* Role List */}
          {/* Role List */}
          {/* Role List */}
          <div className="mt-4 space-y-3">
            {AVAILABLE_ROLES.map((role) => {
              const isManager = role.value === "manager";
              const checked = isManager
                ? true
                : selectedRoles.includes(role.value as any);

              return (
                <div
                  key={role.value}
                  className="flex items-center justify-between border border-[#D5D7DA] rounded-full px-4 py-3"
                >
                  <label className="flex items-center gap-3 cursor-pointer flex-1">
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={isManager || isSubmitting}
                      onChange={() =>
                        !isManager && toggleRole(role.value as any)
                      }
                      className="w-4 h-4 accent-[#052350]"
                    />

                    <span className="text-sm text-gray-900">
                      {role.label}
                      {isManager && (
                        <span className="ml-2 text-xs text-[#052350] font-normal">
                          (Default)
                        </span>
                      )}
                    </span>
                  </label>
                </div>
              );
            })}
          </div>

          {/* Selected Summary */}
          <div className="mt-4 p-3 bg-blue-50 rounded-full">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">Selected Roles:</span>{" "}
              {[
                "Manager",
                ...AVAILABLE_ROLES.filter(
                  (r) =>
                    r.value !== "manager" &&
                    selectedRoles.includes(r.value as any),
                ).map((r) => r.label),
              ].join(" • ")}
            </p>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={() => navigate("/admin-dashboard/tenants")}
            disabled={isSubmitting}
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
    </div>
  );
}

// // NewBusiness.tsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { useCreateTenantMutation } from "@/redux/features/admin/adminTenant/adminTenantApi";
// import {} from "@/redux/features/admin/adminTenant/adminTenant.types";
// import { toast } from "sonner";
// import { useCreateTenantMutation } from "@/redux/features/admin/adminTenant/adminTenantApi";

// interface RoleConfig {
//   label: string;
//   name: string;
//   value: string;
//   required?: boolean;
// }

// const AVAILABLE_ROLES: RoleConfig[] = [
//   {
//     label: "Manager",
//     value: "manager",
//     required: true,
//     name: "",
//   },
//   {
//     label: "Server",
//     value: "server",
//     name: "",
//   },
//   {
//     label: "Cashier",
//     value: "cashier",
//     name: "",
//   },
//   {
//     label: "Kitchen Staff",
//     value: "kitchen",
//     name: "",
//   },
// ];

// export default function NewBusiness() {
//   const navigate = useNavigate();
//   const [createTenant] = useCreateTenantMutation();

//   const [formData, setFormData] = useState({
//     name: "",
//     // industry: "" as IndustryType | "",
//     subscriptionFee: 99.99,
//     managerEmail: "",
//     managerPin: "",
//   });

//   const [selectedRoles, setSelectedRoles] = useState<string[]>(["manager"]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const toggleRole = (value: string) => {
//     if (value === "manager") return; // Manager is always required
//     setSelectedRoles((prev) =>
//       prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value],
//     );
//   };

//   const handleSubmit = async () => {
//     // Validation
//     if (!formData.name.trim()) {
//       toast.error("Please enter business name");
//       return;
//     }
//     // if (!formData.industry) {
//     //   toast.error("Please select industry type");
//     //   return;
//     // }
//     if (formData.subscriptionFee <= 0) {
//       toast.error("Please enter valid subscription fee");
//       return;
//     }
//     if (!formData.managerEmail.trim()) {
//       toast.error("Please enter manager email");
//       return;
//     }
//     if (!formData.managerPin.trim() || formData.managerPin.length !== 4) {
//       toast.error("Please enter a valid 4-digit manager PIN");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Create tenant with all data in one API call
//       const tenant = await createTenant({
//         name: formData.name,
//         subscriptionFee: formData.subscriptionFee,
//         managerEmail: formData.managerEmail,
//         managerPin: formData.managerPin,
//         server: selectedRoles.includes("server"),
//         kitchen: selectedRoles.includes("kitchen"),
//         cashier: selectedRoles.includes("cashier"),
//         industry: "",
//       }).unwrap();

//       toast.success(
//         `Business "${tenant.name}" created successfully with ${selectedRoles.length} roles`,
//       );

//       // Navigate back to tenants list
//       setTimeout(() => {
//         navigate("/admin-dashboard/tenants");
//       }, 1500);
//     } catch (error: any) {
//       console.error("Error creating business:", error);
//       toast.error(
//         error?.data?.message || "Failed to create business. Please try again.",
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="w-full mx-auto p-6">
//       {/* Header */}
//       <h1 className="text-xl font-semibold mb-6">
//         Register New Clientele Level Business
//       </h1>

//       {/* Top Form */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="text-sm text-gray-600 font-medium">
//             Business Name *
//           </label>
//           <input
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             className="w-full mt-1 border border-[#D5D7DA] rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#052350]"
//             placeholder="e.g. Foodies Hub"
//           />
//         </div>
//         {/*
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-gray-700">
//             Industry Type *
//           </label>
//           <Select
//             value={formData.industry}
//             onValueChange={(value) =>
//               setFormData({ ...formData, industry: value as IndustryType })
//             }
//           >
//             <SelectTrigger className="w-full mt-1 cursor-pointer rounded-full border border-gray-300 bg-white px-4 py-2.5 text-sm shadow-sm focus:ring-2 focus:ring-[#061E49] transition-all duration-200">
//               <SelectValue placeholder="Select industry" />
//             </SelectTrigger>

//             <SelectContent className="rounded-full border bg-white border-gray-200 shadow-lg">
//               {INDUSTRY_OPTIONS.map((industry) => (
//                 <SelectItem
//                   key={industry.value}
//                   value={industry.value}
//                   className="cursor-pointer rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-[#061E49]/10 focus:bg-[#061E49]/20"
//                 >
//                   {industry.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div> */}

//         <div>
//           <label className="text-sm text-gray-600 font-medium">
//             Monthly Subscription Fee ($) *
//           </label>
//           <input
//             type="number"
//             step="0.01"
//             value={formData.subscriptionFee}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 subscriptionFee: Number(e.target.value),
//               })
//             }
//             className="w-full mt-1 border border-[#D5D7DA] rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#052350]"
//             placeholder="Enter subscription fee"
//           />
//         </div>

//         <div>
//           <label className="text-sm text-gray-600 font-medium">
//             Manager Email *
//           </label>
//           <input
//             type="email"
//             value={formData.managerEmail}
//             onChange={(e) =>
//               setFormData({ ...formData, managerEmail: e.target.value })
//             }
//             className="w-full mt-1 border border-[#D5D7DA] rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#052350]"
//             placeholder="manager@example.com"
//           />
//         </div>

//         <div>
//           <label className="text-sm text-gray-600 font-medium">
//             Manager PIN * (4 digits)
//           </label>
//           <input
//             type="password"
//             maxLength={4}
//             value={formData.managerPin}
//             onChange={(e) => {
//               const value = e.target.value.replace(/\D/g, "");
//               if (value.length <= 4) {
//                 setFormData({ ...formData, managerPin: value });
//               }
//             }}
//             className="w-full mt-1 border border-[#D5D7DA] rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#052350]"
//             placeholder="Enter 4-digit PIN"
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
//               Select which employee roles this business needs. Manager is always
//               included.
//             </p>
//           </div>
//         </div>

// {/* Role List */}
// <div className="mt-4 space-y-3">
//   {AVAILABLE_ROLES.map((role) => {
//     const checked = selectedRoles.includes(role.value);
//     const isRequired = role.required;

//     return (
//       <div
//         key={role.value}
//         className="flex items-center justify-between border border-[#D5D7DA] rounded-full px-4 py-3"
//       >
//         <label className="flex items-center gap-3 cursor-pointer">
//           <input
//             type="checkbox"
//             checked={checked}
//             disabled={isRequired}
//             onChange={() => toggleRole(role.value)}
//             className="w-4 h-4 accent-[#052350]"
//           />
//           <span className="text-sm">
//             {role.label}
//             {isRequired && " (Required)"}
//           </span>
//         </label>
//       </div>
//     );
//   })}
// </div>

//         {/* Selected Summary */}
//         <p className="text-sm text-gray-500 mt-4">
//           Selected:{" "}
//           {AVAILABLE_ROLES.filter((r) => selectedRoles.includes(r.value))
//             .map((r) => r.label)
//             .join(", ")}
//         </p>
//       </div>

//       {/* Footer */}
//       <div className="flex justify-end gap-3 mt-8">
//         <button
//           onClick={() => navigate("/admin-dashboard/tenants")}
//           className="bg-gray-200 cursor-pointer text-gray-700 px-6 py-2 rounded-full font-medium hover:bg-gray-300 transition"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleSubmit}
//           disabled={isSubmitting}
//           className="bg-[#052350] cursor-pointer text-white px-6 py-2 rounded-full font-medium hover:bg-[#061E49] transition disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isSubmitting
//             ? "Creating..."
//             : `Create Tenant (${selectedRoles.length} roles enabled)`}
//         </button>
//       </div>
//     </div>
//   );
// }

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   useCreateTenantMutation,
//   useCreateRoleMutation,
//   useCreateTenantUserMutation,
// } from "@/redux/features/admin/adminTenant/adminTenantApi";
// import {
//   INDUSTRY_OPTIONS,
//   IndustryType,
// } from "@/redux/features/admin/adminTenant/adminTenant.types";
// import { toast } from "sonner";

// interface RoleConfig {
//   label: string;
//   name: string;
//   value: string;
//   required?: boolean;
// }

// const AVAILABLE_ROLES: RoleConfig[] = [
//   {
//     label: "Manager",
//     value: "Manager",
//     required: true,
//     name: "",
//   },
//   {
//     label: "Server",
//     value: "Server",
//     name: "",
//   },
//   {
//     label: "Cashier",
//     value: "Cashier",
//     name: "",
//   },
//   {
//     label: "Kitchen Staff",
//     value: "Kitchen",
//     name: "",
//   },
// ];

// export default function NewBusiness() {
//   const navigate = useNavigate();
//   const [createTenant] = useCreateTenantMutation();
//   const [createRole] = useCreateRoleMutation();
//   const [createUser] = useCreateTenantUserMutation();

//   const [formData, setFormData] = useState({
//     name: "",
//     industry: "" as IndustryType | "",
//     subscriptionFee: 129,
//   });

//   const [selectedRoles, setSelectedRoles] = useState<string[]>(["Manager"]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const toggleRole = (value: string) => {
//     setSelectedRoles((prev) =>
//       prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value],
//     );
//   };

//   const handleSubmit = async () => {
//     // Validation
//     if (!formData.name.trim()) {
//       toast.error("Please enter business name");
//       return;
//     }
//     if (!formData.industry) {
//       toast.error("Please select industry type");
//       return;
//     }
//     if (formData.subscriptionFee <= 0) {
//       toast.error("Please enter valid subscription fee");
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Step 1: Create tenant
//       const tenant = await createTenant({
//         name: formData.name,
//         industry: formData.industry,
//         subscriptionFee: formData.subscriptionFee,
//       }).unwrap();

//       toast.success("Tenant created successfully");

//       // Step 2: Create roles for the tenant
//       const rolePromises = selectedRoles.map(async (roleName) => {
//         const role = await createRole({
//           tenantId: tenant.id,
//           data: {
//             name: roleName,
//             isActive: true,
//           },
//         }).unwrap();
//         return { role, roleName };
//       });

//       const createdRoles = await Promise.all(rolePromises);

//       // Step 3: Create a manager user (if Manager role exists)
//       const managerRole = createdRoles.find((r) => r.roleName === "Manager");
//       if (managerRole) {
//         await createUser({
//           tenantId: tenant.id,
//           data: {
//             name: `${formData.name} Manager`,
//             pin: Math.floor(1000 + Math.random() * 9000).toString(), // Generate random 4-digit PIN
//             roleId: managerRole.role.id,
//             status: "ACTIVE",
//           },
//         }).unwrap();
//       }

//       toast.success(
//         `Business "${formData.name}" created successfully with ${selectedRoles.length} roles`,
//       );

//       // Navigate back to tenants list
//       setTimeout(() => {
//         navigate("/admin-dashboard/tenants");
//       }, 1500);
//     } catch (error: any) {
//       console.error("Error creating business:", error);
//       toast.error(
//         error?.data?.message || "Failed to create business. Please try again.",
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="w-full mx-auto p-6">
//       {/* Header */}
//       <h1 className="text-xl font-semibold mb-6">
//         Register New Clientele Level Business
//       </h1>

//       {/* Top Form */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div>
//           <label className="text-sm text-gray-600 font-medium">
//             Business Name *
//           </label>
//           <input
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             className="w-full mt-1 border border-[#D5D7DA] rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#052350]"
//             placeholder="e.g. Le Bistro Douala"
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="text-sm font-medium text-gray-700">
//             Industry Type *
//           </label>
//           <Select
//             value={formData.industry}
//             onValueChange={(value) =>
//               setFormData({ ...formData, industry: value as IndustryType })
//             }
//           >
//             <SelectTrigger className="w-full mt-1 cursor-pointer rounded-full border border-gray-300 bg-white px-4 py-2.5 text-sm shadow-sm focus:ring-2 focus:ring-[#061E49] transition-all duration-200">
//               <SelectValue placeholder="Select industry" />
//             </SelectTrigger>

//             <SelectContent className="rounded-full border bg-white border-gray-200 shadow-lg">
//               {INDUSTRY_OPTIONS.map((industry) => (
//                 <SelectItem
//                   key={industry.value}
//                   value={industry.value}
//                   className="cursor-pointer rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-[#061E49]/10 focus:bg-[#061E49]/20"
//                 >
//                   {industry.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         <div>
//           <label className="text-sm text-gray-600 font-medium">
//             Monthly Subscription Fee ($) *
//           </label>
//           <input
//             type="number"
//             value={formData.subscriptionFee}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 subscriptionFee: Number(e.target.value),
//               })
//             }
//             className="w-full mt-1 border border-[#D5D7DA] rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#052350]"
//             placeholder="Enter subscription fee"
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
//               Select which employee roles this business needs. Manager is always
//               included.
//             </p>
//           </div>
//         </div>

//         {/* Role List */}
//         <div className="mt-4 space-y-3">
//           {AVAILABLE_ROLES.map((role) => {
//             const checked = selectedRoles.includes(role.value);
//             const isRequired = role.required;

//             return (
//               <div
//                 key={role.value}
//                 className="flex items-center justify-between border border-[#D5D7DA] rounded-full px-4 py-3"
//               >
//                 <label className="flex items-center gap-3 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={checked}
//                     disabled={isRequired}
//                     onChange={() => toggleRole(role.value)}
//                     className="w-4 h-4 accent-[#052350]"
//                   />
//                   <span className="text-sm">
//                     {role.label}
//                     {isRequired && " (Required)"}
//                   </span>
//                 </label>
//               </div>
//             );
//           })}
//         </div>

//         {/* Selected Summary */}
//         <p className="text-sm text-gray-500 mt-4">
//           Selected:{" "}
//           {AVAILABLE_ROLES.filter((r) => selectedRoles.includes(r.value))
//             .map((r) => r.label)
//             .join(", ")}
//         </p>
//       </div>

//       {/* Footer */}
//       <div className="flex justify-end gap-3 mt-8">
//         <button
//           onClick={() => navigate("/admin-dashboard/tenants")}
//           className="bg-gray-200 cursor-pointer text-gray-700 px-6 py-2 rounded-full font-medium hover:bg-gray-300 transition"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={handleSubmit}
//           disabled={isSubmitting}
//           className="bg-[#052350] cursor-pointer text-white px-6 py-2 rounded-full font-medium hover:bg-[#061E49] transition disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isSubmitting
//             ? "Creating..."
//             : `Create Tenant (${selectedRoles.length} roles enabled)`}
//         </button>
//       </div>
//     </div>
//   );
// }
