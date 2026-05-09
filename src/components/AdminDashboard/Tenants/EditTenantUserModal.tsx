// components/EditTenantUserModal.tsx
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateTenantUserMutation } from "@/redux/features/admin/adminTenant/adminTenantApi";
import {
  Role,
  TenantUser,
} from "@/redux/features/admin/adminTenant/adminTenant.types";
import { toast } from "sonner";

interface EditTenantUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  tenantId: string;
  user: TenantUser;
  roles: Role[];
  onSuccess: () => void;
}

export const EditTenantUserModal = ({
  isOpen,
  onClose,
  tenantId,
  user,
  roles,
  onSuccess,
}: EditTenantUserModalProps) => {
  const [updateUser, { isLoading }] = useUpdateTenantUserMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pin: "",
    role: "",
    status: "ACTIVE" as "ACTIVE" | "INACTIVE",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    pin: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        pin: user.pin,
        role: user.role?.name || "",
        status: user.status,
      });
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      pin: "",
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
        isValid = false;
      }
    }

    if (!formData.pin) {
      newErrors.pin = "PIN is required";
      isValid = false;
    } else if (!/^\d{4}$/.test(formData.pin)) {
      newErrors.pin = "PIN must be exactly 4 digits";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await updateUser({
        tenantId,
        userId: user.id,
        data: {
          name: formData.name,
          email: formData.email,
          pin: formData.pin,
          role: formData.role,
          status: formData.status,
        },
      }).unwrap();

      toast.success(`User "${formData.name}" updated successfully`);
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Error updating user:", error);
      toast.error(error?.data?.message || "Failed to update user");
    }
  };

  const availableRoles = roles.filter((role) => role.isActive);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Name Field */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#052350] ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#052350] ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* PIN Field */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              4-Digit PIN *
            </label>
            <input
              type="password"
              maxLength={4}
              value={formData.pin}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 4) {
                  setFormData({ ...formData, pin: value });
                }
              }}
              className={`w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#052350] ${
                errors.pin ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.pin && (
              <p className="text-red-500 text-xs mt-1">{errors.pin}</p>
            )}
          </div>

          {/* Role Field */}
          <div>
            <label className="text-sm font-medium text-gray-700">Role</label>
            <Select
              value={formData.role}
              onValueChange={(value) =>
                setFormData({ ...formData, role: value })
              }
            >
              <SelectTrigger className="w-full mt-1 border-gray-300">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {availableRoles.map((role) => (
                  <SelectItem key={role.id} value={role.name}>
                    {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Field */}
          <div>
            <label className="text-sm font-medium text-gray-700">Status</label>
            <Select
              value={formData.status}
              onValueChange={(value: "ACTIVE" | "INACTIVE") =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 py-2 text-white bg-[#052350] rounded-lg hover:bg-[#061E49] transition disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Update User"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


// // components/EditTenantUserModal.tsx
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
// import { useUpdateTenantUserMutation } from "@/redux/features/admin/adminTenant/adminTenantApi";
// import {
//   Role,
//   TenantUser,
// } from "@/redux/features/admin/adminTenant/adminTenant.types";
// import { toast } from "sonner";

// interface EditTenantUserModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   tenantId: string;
//   user: TenantUser;
//   roles: Role[];
//   onSuccess: () => void;
// }

// export const EditTenantUserModal = ({
//   isOpen,
//   onClose,
//   tenantId,
//   user,
//   roles,
//   onSuccess,
// }: EditTenantUserModalProps) => {
//   const [updateUser, { isLoading }] = useUpdateTenantUserMutation();
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

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         name: user.name,
//         pin: user.pin,
//         roleId: user.roleId,
//         status: user.status,
//       });
//     }
//   }, [user]);

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
//       await updateUser({
//         tenantId,
//         userId: user.id,
//         data: {
//           name: formData.name,
//           pin: formData.pin,
//           roleId: formData.roleId,
//           status: formData.status,
//         },
//       }).unwrap();

//       toast.success(`User "${formData.name}" updated successfully`);
//       onSuccess();
//       onClose();
//     } catch (error: any) {
//       console.error("Error updating user:", error);
//       toast.error(error?.data?.message || "Failed to update user");
//     }
//   };

//   const availableRoles = roles.filter((role) => role.isActive);

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle>Edit User</DialogTitle>
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
//                 {availableRoles.map((role) => (
//                   <SelectItem key={role.id} value={role.id}>
//                     {role.name}
//                   </SelectItem>
//                 ))}
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
//             {isLoading ? "Updating..." : "Update User"}
//           </button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };
