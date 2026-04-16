// components/CreateTenantUserModal.tsx
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateTenantUserMutation } from "@/redux/features/admin/adminTenant/adminTenantApi";
import { Role } from "@/redux/features/admin/adminTenant/adminTenant.types";
import { toast } from "sonner";
import { X, AlertCircle } from "lucide-react";

interface CreateTenantUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  tenantId: string;
  roles: Role[];
  onSuccess: () => void;
}

export const CreateTenantUserModal = ({
  isOpen,
  onClose,
  tenantId,
  roles,
  onSuccess,
}: CreateTenantUserModalProps) => {
  const [createUser, { isLoading }] = useCreateTenantUserMutation();
  const [formData, setFormData] = useState({
    name: "",
    pin: "",
    roleId: "",
    status: "ACTIVE" as "ACTIVE" | "INACTIVE",
  });

  const [errors, setErrors] = useState({
    name: "",
    pin: "",
    roleId: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    pin: false,
    roleId: false,
    status: false,
  });

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: "",
        pin: "",
        roleId: "",
        status: "ACTIVE",
      });
      setErrors({
        name: "",
        pin: "",
        roleId: "",
      });
      setTouched({
        name: false,
        pin: false,
        roleId: false,
        status: false,
      });
    }
  }, [isOpen]);

  const validateField = (field: keyof typeof formData, value: string) => {
    switch (field) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2)
          return "Name must be at least 2 characters";
        if (value.trim().length > 50)
          return "Name must be less than 50 characters";
        return "";
      case "pin":
        if (!value) return "PIN is required";
        if (!/^\d{4}$/.test(value)) return "PIN must be exactly 4 digits";
        return "";
      case "roleId":
        if (!value) return "Role is required";
        return "";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: validateField("name", formData.name),
      pin: validateField("pin", formData.pin),
      roleId: validateField("roleId", formData.roleId),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleFieldChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors({ ...errors, [field]: error });
    }
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched({ ...touched, [field]: true });
    const error = validateField(field, formData[field]);
    setErrors({ ...errors, [field]: error });
  };

  const handleSubmit = async () => {
    // Mark all fields as touched
    setTouched({ name: true, pin: true, roleId: true, status: false });

    if (!validateForm()) return;

    try {
      await createUser({
        tenantId,
        data: {
          name: formData.name.trim(),
          pin: formData.pin,
          roleId: formData.roleId,
          status: formData.status,
        },
      }).unwrap();

      toast.success(`✨ User "${formData.name.trim()}" created successfully`);
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Error creating user:", error);
      toast.error(
        error?.data?.message || "Failed to create user. Please try again.",
      );
    }
  };

  const availableRoles = roles.filter((role) => role.isActive);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-0 shadow-2xl rounded-2xl">
        {/* Header with gradient background */}
        <div className="relative bg-white p-6 ">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-black hover:text-gray-800 cursor-pointer transition-colors rounded-full p-1 hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3">
            <div>
              <DialogTitle className="text-xl font-semibold text-black">
                Add New User
              </DialogTitle>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-6 py-6 space-y-3 bg-white">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                placeholder="e.g., John Doe"
                className={`w-full border rounded-xl px-4 py-2.5 text-gray-900 placeholder:text-gray-400
                  focus:outline-none focus:ring-2 focus:ring-[#052350]/20 focus:border-[#052350]
                  transition-all duration-200 ${
                    errors.name && touched.name
                      ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
              />
              {errors.name && touched.name && (
                <div className="flex items-center gap-1 mt-1.5 text-red-500 text-xs">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* PIN Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              4-Digit PIN <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="password"
                maxLength={4}
                value={formData.pin}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 4) {
                    handleFieldChange("pin", value);
                  }
                }}
                onBlur={() => handleBlur("pin")}
                placeholder="Enter 4-digit PIN"
                className={`w-full border rounded-xl px-4 py-2.5 text-gray-900 placeholder:text-gray-400
                  focus:outline-none focus:ring-2 focus:ring-[#052350]/20 focus:border-[#052350]
                  transition-all duration-200 font-mono text-lg tracking-wider ${
                    errors.pin && touched.pin
                      ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
              />
              {errors.pin && touched.pin && (
                <div className="flex items-center gap-1 mt-1.5 text-red-500 text-xs">
                  <span>{errors.pin}</span>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Secure 4-digit numeric PIN for user authentication
            </p>
          </div>

          {/* Role Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              Role <span className="text-red-500">*</span>
            </label>
            <Select
              value={formData.roleId}
              onValueChange={(value) => handleFieldChange("roleId", value)}
            >
              <SelectTrigger
                className={`w-full rounded-xl px-4 py-2.5 h-auto cursor-pointer ${
                  errors.roleId && touched.roleId
                    ? "border-red-500 focus:ring-red-500/20"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <SelectValue placeholder="Select a role for the user" />
              </SelectTrigger>
              <SelectContent className="rounded-xl bg-white border-none  cursor-pointer">
                {availableRoles.length === 0 ? (
                  <div className="px-3 py-8 text-center">
                    <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No roles available</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Please create a role first
                    </p>
                  </div>
                ) : (
                  availableRoles.map((role) => (
                    <SelectItem
                      key={role.id}
                      value={role.id}
                      className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">
                          {role.name}
                        </span>
                        {role.description && (
                          <span className="text-xs text-gray-500">
                            {role.description}
                          </span>
                        )}
                      </div>
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {errors.roleId && touched.roleId && (
              <div className="flex items-center gap-1 mt-1.5 text-red-500 text-xs">
                <AlertCircle className="h-3 w-3" />
                <span>{errors.roleId}</span>
              </div>
            )}
          </div>

          {/* Status Field */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              Status
            </label>
            <Select
              value={formData.status}
              onValueChange={(value: "ACTIVE" | "INACTIVE") =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger className="w-full cursor-pointer rounded-xl px-4 py-2.5 h-auto border-gray-300 hover:border-gray-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl cursor-pointer bg-white border-none ">
                <SelectItem value="ACTIVE" className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>Active</span>
                  </div>
                </SelectItem>
                <SelectItem value="INACTIVE" className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                    <span>Inactive</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-1">
              Inactive users cannot access the system
            </p>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="px-5 py-2.5 cursor-pointer text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 
              transition-all duration-200 font-medium focus:outline-none focus:ring-2 
              focus:ring-gray-300 focus:ring-offset-1"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-2.5 cursor-pointer text-white bg-gradient-to-r from-[#052350] to-[#0a3a6e] 
              rounded-full hover:from-[#061E49] hover:to-[#052350] transition-all duration-200 
              font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg 
              hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#052350]/50 
              focus:ring-offset-2"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Creating...</span>
                </div>
              ) : (
                <span>Create User</span>
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

/* Main  */
// // components/CreateTenantUserModal.tsx
// import { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useCreateTenantUserMutation } from "@/redux/features/admin/adminTenant/adminTenantApi";
// import { Role } from "@/redux/features/admin/adminTenant/adminTenant.types";
// import { toast } from "sonner";

// interface CreateTenantUserModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   tenantId: string;
//   roles: Role[];
//   onSuccess: () => void;
// }

// export const CreateTenantUserModal = ({
//   isOpen,
//   onClose,
//   tenantId,
//   roles,
//   onSuccess,
// }: CreateTenantUserModalProps) => {
//   const [createUser, { isLoading }] = useCreateTenantUserMutation();
//   const [formData, setFormData] = useState({
//     name: "",
//     pin: "",
//     roleId: "",
//     status: "ACTIVE" as "ACTIVE" | "INACTIVE",
//   });

//   const [errors, setErrors] = useState({
//     name: "",
//     pin: "",
//     roleId: "",
//   });

//   // Reset form when modal opens/closes
//   useEffect(() => {
//     if (!isOpen) {
//       setFormData({
//         name: "",
//         pin: "",
//         roleId: "",
//         status: "ACTIVE",
//       });
//       setErrors({
//         name: "",
//         pin: "",
//         roleId: "",
//       });
//     }
//   }, [isOpen]);

//   const validateForm = () => {
//     const newErrors = {
//       name: "",
//       pin: "",
//       roleId: "",
//     };
//     let isValid = true;

//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required";
//       isValid = false;
//     }

//     if (!formData.pin) {
//       newErrors.pin = "PIN is required";
//       isValid = false;
//     } else if (!/^\d{4}$/.test(formData.pin)) {
//       newErrors.pin = "PIN must be exactly 4 digits";
//       isValid = false;
//     }

//     if (!formData.roleId) {
//       newErrors.roleId = "Role is required";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;

//     try {
//       await createUser({
//         tenantId,
//         data: {
//           name: formData.name,
//           pin: formData.pin,
//           roleId: formData.roleId,
//           status: formData.status,
//         },
//       }).unwrap();

//       toast.success(`User "${formData.name}" created successfully`);
//       onSuccess();
//       onClose();
//     } catch (error: any) {
//       console.error("Error creating user:", error);
//       toast.error(error?.data?.message || "Failed to create user");
//     }
//   };

//   const availableRoles = roles.filter((role) => role.isActive);

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose} >
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle>Add New User</DialogTitle>
//         </DialogHeader>

//         <div className="space-y-4 py-4">
//           {/* Name Field */}
//           <div>
//             <label className="text-sm font-medium text-gray-700">
//               Full Name *
//             </label>
//             <input
//               type="text"
//               value={formData.name}
//               onChange={(e) =>
//                 setFormData({ ...formData, name: e.target.value })
//               }
//               placeholder="e.g., John Doe"
//               className={`w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#052350] ${
//                 errors.name ? "border-red-500" : "border-gray-300"
//               }`}
//             />
//             {errors.name && (
//               <p className="text-red-500 text-xs mt-1">{errors.name}</p>
//             )}
//           </div>

//           {/* PIN Field */}
//           <div>
//             <label className="text-sm font-medium text-gray-700">
//               4-Digit PIN *
//             </label>
//             <input
//               type="password"
//               maxLength={4}
//               value={formData.pin}
//               onChange={(e) => {
//                 const value = e.target.value.replace(/\D/g, "");
//                 if (value.length <= 4) {
//                   setFormData({ ...formData, pin: value });
//                 }
//               }}
//               placeholder="1234"
//               className={`w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#052350] ${
//                 errors.pin ? "border-red-500" : "border-gray-300"
//               }`}
//             />
//             {errors.pin && (
//               <p className="text-red-500 text-xs mt-1">{errors.pin}</p>
//             )}
//           </div>

//           {/* Role Field */}
//           <div>
//             <label className="text-sm font-medium text-gray-700">Role *</label>
//             <Select
//               value={formData.roleId}
//               onValueChange={(value) =>
//                 setFormData({ ...formData, roleId: value })
//               }
//             >
//               <SelectTrigger
//                 className={`w-full mt-1 ${
//                   errors.roleId ? "border-red-500" : "border-gray-300"
//                 }`}
//               >
//                 <SelectValue placeholder="Select a role" />
//               </SelectTrigger>
//               <SelectContent>
//                 {availableRoles.length === 0 ? (
//                   <div className="px-2 py-4 text-center text-gray-500">
//                     No roles available. Please create a role first.
//                   </div>
//                 ) : (
//                   availableRoles.map((role) => (
//                     <SelectItem key={role.id} value={role.id}>
//                       {role.name}
//                     </SelectItem>
//                   ))
//                 )}
//               </SelectContent>
//             </Select>
//             {errors.roleId && (
//               <p className="text-red-500 text-xs mt-1">{errors.roleId}</p>
//             )}
//           </div>

//           {/* Status Field */}
//           <div>
//             <label className="text-sm font-medium text-gray-700">Status</label>
//             <Select
//               value={formData.status}
//               onValueChange={(value: "ACTIVE" | "INACTIVE") =>
//                 setFormData({ ...formData, status: value })
//               }
//             >
//               <SelectTrigger className="w-full mt-1">
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="ACTIVE">Active</SelectItem>
//                 <SelectItem value="INACTIVE">Inactive</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         <DialogFooter>
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSubmit}
//             disabled={isLoading}
//             className="px-4 py-2 text-white bg-[#052350] rounded-lg hover:bg-[#061E49] transition disabled:opacity-50"
//           >
//             {isLoading ? "Creating..." : "Create User"}
//           </button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };
