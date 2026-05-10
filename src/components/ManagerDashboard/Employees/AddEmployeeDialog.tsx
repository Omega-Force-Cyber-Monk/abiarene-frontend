// src/components/employees/AddEmployeeDialog.tsx

import { useState } from "react";
import { IoIosSave, IoMdClose } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateEmployeeMutation,
  useGetRolesQuery,
} from "@/redux/features/manager/managerEmployee/employeeApi";
import { toast } from "sonner";

interface AddEmployeeDialogProps {
  onAddEmployee: () => void;
}

export default function AddEmployeeDialog({
  onAddEmployee,
}: AddEmployeeDialogProps) {
  const [open, setOpen] = useState(false);
  const [createEmployee, { isLoading }] = useCreateEmployeeMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "" as "SERVER" | "KITCHEN" | "CASHIER" | "MANAGER",
    pin: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.pin.length !== 4) {
      toast.error("PIN must be exactly 4 digits");
      return;
    }

    try {
      await createEmployee({
        name: formData.name,
        email: formData.email,
        pin: formData.pin,
        role: formData.role,
      }).unwrap();

      toast.success("Employee added successfully!");
      setFormData({ name: "", email: "", role: "" as any, pin: "" });
      setOpen(false);
      onAddEmployee();
    } catch (error: any) {
      console.error("Failed to add employee:", error);
      toast.error(error?.data?.message || "Failed to add employee");
    }
  };

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
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-[#6C7787]">Employee Name</label>
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
                <label className="text-sm text-[#6C7787]">Email Address</label>
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
                  value={formData.role}
                  onValueChange={(value: any) =>
                    setFormData({ ...formData, role: value })
                  }
                >
                  <SelectTrigger className="w-full cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm shadow-sm focus:ring-2 focus:ring-[#061E49] transition-all duration-200">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>

                  <SelectContent className="rounded-xl border bg-white border-gray-200 shadow-lg">
                    <SelectItem
                      value="SERVER"
                      className="cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-[#061E49]/10"
                    >
                      Server
                    </SelectItem>
                    <SelectItem
                      value="KITCHEN"
                      className="cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-[#061E49]/10"
                    >
                      Kitchen
                    </SelectItem>
                    <SelectItem
                      value="CASHIER"
                      className="cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-[#061E49]/10"
                    >
                      Cashier
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-[#6C7787]">
                  Quick-Login PIN (4 digits)
                </label>
                <input
                  type="number"
                  value={formData.pin}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pin: e.target.value.slice(0, 4),
                    })
                  }
                  placeholder="Enter 4-digit PIN"
                  className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
                  minLength={4}
                  maxLength={4}
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
                className="flex cursor-pointer items-center gap-2 px-6 py-2.5 rounded-full bg-[#061E49] text-white text-sm font-medium shadow-sm hover:bg-[#0A2A66] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IoIosSave className="text-lg" />
                <span>{isLoading ? "Adding..." : "Add Employee"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { IoIosSave, IoMdClose } from "react-icons/io";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export default function AddEmployeeDialog({
//   onAddEmployee,
// }: {
//   onAddEmployee: (user: any) => void;
// }) {
//   const [open, setOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     role: "",
//     pin: "",
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const newEmployee = {
//       id: Date.now(), // Generate unique ID
//       name: formData.name,
//       role: formData.role,
//       image: `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 70)}`,
//       pin: formData.pin,
//     };

//     onAddEmployee(newEmployee);

//     // Reset form and close
//     setFormData({ name: "", role: "", pin: "" });
//     setOpen(false);
//   };

//   return (
//     <div className="w-full bg-white border-[#DDDDDD]">
//       {/* Add Employee Button */}
//       <div className="flex justify-end mb-4">
//         <button
//           onClick={() => setOpen((prev) => !prev)}
//           className="flex items-center gap-2 bg-[#061E49] text-white px-5 py-2 cursor-pointer rounded-full shadow-md hover:opacity-90 transition"
//         >
//           {open ? "Close Form" : "+ Add Employee"}
//         </button>
//       </div>

//       {/* Smooth Expand Form */}
//       <div
//         className={`overflow-hidden transition-all duration-500 ease-in-out ${
//           open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
//         }`}
//       >
//         <div className="bg-[#FFF7EC] rounded-2xl shadow-xl p-6 border border-gray-100">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-4 border-b border-[#C6CAD1] pb-2">
//             <h2 className="text-lg font-semibold text-gray-800">
//               New Employee Profile
//             </h2>

//             <button
//               onClick={() => setOpen(false)}
//               className="text-gray-500 cursor-pointer hover:text-red-500"
//             >
//               <IoMdClose size={22} />
//             </button>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div>
//                 <label className="text-sm text-[#6C7787]">Employee Name</label>
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                   placeholder="e.g. John Doe"
//                   className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
//                   required
//                 />
//               </div>

//               {/* <div>
//                 <label className="text-sm text-[#6C7787]">System Role</label>
//                 <select
//                   value={formData.role}
//                   onChange={(e) =>
//                     setFormData({ ...formData, role: e.target.value })
//                   }
//                   className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
//                   required
//                 >
//                   <option value="" disabled>
//                     Select role
//                   </option>
//                   <option value="Manager">Manager</option>
//                   <option value="Server">Server</option>
//                   <option value="Kitchen">Kitchen</option>
//                   <option value="Cashier">Cashier</option>
//                 </select>
//               </div> */}

//               <div className="space-y-2">
//                 <label className="text-sm font-medium text-gray-700">
//                   System Role
//                 </label>

//                 <Select
//                   value={formData.role}
//                   onValueChange={(value) =>
//                     setFormData({ ...formData, role: value })
//                   }
//                 >
//                   <SelectTrigger className="w-full cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm shadow-sm focus:ring-2 focus:ring-[#061E49] transition-all duration-200">
//                     <SelectValue placeholder="Select role" />
//                   </SelectTrigger>

//                   <SelectContent className="rounded-xl border bg-white border-gray-200 shadow-lg">
//                     <SelectItem
//                       value="Manager"
//                       className="cursor-pointer rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-[#061E49]/10 focus:bg-[#061E49]/20"
//                     >
//                       Manager
//                     </SelectItem>

//                     <SelectItem
//                       value="Server"
//                       className="cursor-pointer rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-[#061E49]/10 focus:bg-[#061E49]/20"
//                     >
//                       Server
//                     </SelectItem>

//                     <SelectItem
//                       value="Kitchen"
//                       className="cursor-pointer rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-[#061E49]/10 focus:bg-[#061E49]/20"
//                     >
//                       Kitchen
//                     </SelectItem>

//                     <SelectItem
//                       value="Cashier"
//                       className="cursor-pointer rounded-md px-3 py-2 text-sm transition-all duration-200 hover:bg-[#061E49]/10 focus:bg-[#061E49]/20"
//                     >
//                       Cashier
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/*  */}
//               <div>
//                 <label className="text-sm text-[#6C7787]">
//                   Quick-Login PIN (4 digits)
//                 </label>
//                 <input
//                   type="number"
//                   value={formData.pin}
//                   onChange={(e) =>
//                     setFormData({ ...formData, pin: e.target.value })
//                   }
//                   placeholder="Enter 4-digit PIN"
//                   className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
//                   minLength={4}
//                   maxLength={4}
//                   required
//                 />
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-end items-center gap-3 mt-6">
//               <button
//                 type="button"
//                 onClick={() => setOpen(false)}
//                 className="px-5 text-[#684F1A] border-[#684F1A] cursor-pointer py-2 rounded-full border text-base font-medium hover:bg-gray-100 transition"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="submit"
//                 className="flex cursor-pointer items-center gap-2 px-6 py-2.5 rounded-full bg-[#061E49] text-white text-sm font-medium shadow-sm hover:bg-[#0A2A66] transition-all duration-200"
//               >
//                 <IoIosSave className="text-lg" />
//                 <span>Add Employee</span>
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
