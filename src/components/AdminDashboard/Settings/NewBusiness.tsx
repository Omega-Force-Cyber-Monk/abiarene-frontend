import { useState } from "react";

type Role = {
  label: string;
  value: string;
  required?: boolean;
};

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
    <div className="w-full mx-auto bg-white p-6 rounded-2xl shadow-md">
      {/* Header */}
      <h1 className="text-xl font-semibold mb-6">
        Register New Clientele Level Business
      </h1>

      {/* Top Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-gray-600">Business Name</label>
          <input
            className="w-full mt-1 border border-[#D5D7DA] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#052350]"
            placeholder="e.g. Le Bistro Douala"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Industry Type</label>
          <select className="w-full mt-1 border border-[#D5D7DA] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#052350]">
            <option>Server</option>
            <option>Restaurant</option>
            <option>Retail</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600">
            Monthly Subscription Fee
          </label>
          <input
            className="w-full mt-1 border border-[#D5D7DA] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#052350]"
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

          <button className="w-10 h-10 rounded-full bg-[#052350] text-white text-xl flex items-center justify-center">
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
                className="flex items-center justify-between border border-[#D5D7DA] rounded-xl px-4 py-3"
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
        <button className="bg-[#052350] text-white px-6 py-2 rounded-full font-medium">
          Create Tenant ({selectedRoles.length} roles enabled)
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
//     <div className="w-full mx-auto bg-white p-6 rounded-2xl shadow-md">
//       {/* Header */}
//       <h1 className="text-xl font-semibold mb-6">
//         Register New Clientele Level Business
//       </h1>

//       {/* Top Form */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div>
//           <label className="text-sm text-gray-600">Business Name</label>
//           <input
//             className="w-full mt-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="e.g. Le Bistro Douala"
//           />
//         </div>

//         <div>
//           <label className="text-sm text-gray-600">Industry Type</label>
//           <select className="w-full mt-1 border rounded-lg px-3 py-2">
//             <option>Server</option>
//             <option>Restaurant</option>
//             <option>Retail</option>
//           </select>
//         </div>

//         <div>
//           <label className="text-sm text-gray-600">
//             Monthly Subscription Fee
//           </label>
//           <input
//             className="w-full mt-1 border rounded-lg px-3 py-2"
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

//           <button className="w-10 h-10 rounded-full bg-blue-600 text-white text-xl flex items-center justify-center">
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
//                 className="flex items-center justify-between border rounded-xl px-4 py-3"
//               >
//                 <label className="flex items-center gap-3 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={checked}
//                     disabled={role.required}
//                     onChange={() => toggleRole(role.value)}
//                     className="w-4 h-4"
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
//         <button className="bg-blue-700 text-white px-6 py-2 rounded-full font-medium">
//           Create Tenant ({selectedRoles.length} roles enabled)
//         </button>
//       </div>
//     </div>
//   );
// }
