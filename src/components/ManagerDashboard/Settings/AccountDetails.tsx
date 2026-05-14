// components/AccountDetails.tsx

import { useEffect, useState } from "react";
import user from "@/assets/primepos/logo/user.png";
import { IoIosSave } from "react-icons/io";
import {
  useGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
} from "@/redux/features/manager/settings/settingApi";
import { toast } from "react-hot-toast"; // Assuming you have toast installed

export default function AccountDetails() {
  const {
    data: userData,
    isLoading,
    isError,
    refetch,
  } = useGetCurrentUserQuery();
  const [updateCurrentUser, { isLoading: isUpdating }] =
    useUpdateCurrentUserMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pin: "",
    role: "",
  });

  // Populate form with user data when loaded
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        pin: userData.pin || "",
        role: userData.role?.name || "MANAGER",
      });
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
        pin: formData.pin,
        image: userData?.image, // Keep existing image if not changing
      };

      const result = await updateCurrentUser(updateData).unwrap();
      toast.success("Profile updated successfully!");
      refetch(); // Refresh user data
    } catch (error: any) {
      console.error("Update failed:", error);
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full bg-white border-[#DDDDDD] p-6">
        <div className="text-center">Loading profile...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full bg-white border-[#DDDDDD] p-6">
        <div className="text-center text-red-500">
          Failed to load profile. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white border-[#DDDDDD]">
      <div>
        <div className="bg-[#FFF7EC] rounded-2xl shadow-xl p-6 border border-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-2">
            <h2 className="text-lg font-semibold text-gray-800">
              Account Details
            </h2>
          </div>
          <div className="flex justify-baseline items-center space-x-3 mb-4">
            <div>
              <img
                src={userData?.image || user}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div className="">
              <h2 className="mb-2 font-semibold">{formData.role} Profile</h2>
              <p>Manage your personal account details.</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-base font-semibold text-[#272F3A]">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Olivia Rhye"
                  className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
                  required
                />
              </div>

              <div>
                <label className="text-base font-semibold text-[#272F3A]">
                  Role
                </label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={formData.role}
                    className="w-full bg-gray-100 border-[#DDDDDD] px-4 py-2 rounded-xl border focus:outline-none"
                    disabled
                  />
                </div>
              </div>

              <div>
                <label className="text-base font-semibold text-[#272F3A]">
                  Professional Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="manager@rene-pos.com"
                  className="w-full bg-gray-100 border-[#DDDDDD] px-4 py-2 rounded-xl border focus:outline-none"
                  required
                  disabled
                />
              </div>

              <div>
                <label className="text-base font-semibold text-[#272F3A]">
                  Login Pin
                </label>
                <input
                  type="number"
                  name="pin"
                  value={formData.pin}
                  onChange={handleChange}
                  placeholder="1234"
                  className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
                  pattern="[0-9]{4}"
                  maxLength={4}
                  required
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                disabled={isUpdating}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full cursor-pointer bg-[#061E49] text-white text-sm font-medium shadow-sm hover:bg-[#0A2A66] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <IoIosSave className="text-lg" />
                <span>{isUpdating ? "Updating..." : "Update identity"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// import user from "@/assets/primepos/logo/user.png";
// import { IoIosSave } from "react-icons/io";

// export default function AccountDetails() {
//   return (
//     <div className="w-full bg-white border-[#DDDDDD]">
//       <div>
//         <div className="bg-[#FFF7EC] rounded-2xl shadow-xl p-6 border border-gray-100">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-4  pb-2">
//             <h2 className="text-lg font-semibold text-gray-800">
//               Account Details
//             </h2>
//           </div>
//           <div className=" flex justify-baseline items-center space-x-3 mb-4">
//             <div>
//               <img src={user} alt="" />
//             </div>
//             <div className="">
//               <h2 className="mb-2 font-semibold">Manager Profile</h2>
//               <p>Manage your personal account details.</p>
//             </div>
//           </div>

//           {/* Form */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="text-base font-semibold text-[#272F3A]">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="Olivia Rhye"
//                 className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
//               />
//             </div>

//             <div>
//               <label className="text-base font-semibold text-[#272F3A]">
//                 Role
//               </label>
//               <div className="flex gap-2 mt-1">
//                 <input
//                   type="text"
//                   placeholder="Store Manager"
//                   className="w-full bg-white border-[#DDDDDD] px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="text-base font-semibold text-[#272F3A]">
//                 Professional Email
//               </label>
//               <input
//                 type="email"
//                 placeholder="manager@rene-pos.com"
//                 className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
//               />
//             </div>

//             <div>
//               <label className="text-base font-semibold text-[#272F3A]">
//                 Login Pin
//               </label>
//               <input
//                 type="number"
//                 placeholder="1234"
//                 className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
//               />
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end mt-6">
//             <button className="flex items-center gap-2 px-6 py-2.5 rounded-full cursor-pointer bg-[#061E49] text-white text-sm font-medium shadow-sm hover:bg-[#0A2A66] transition-all duration-200">
//               <IoIosSave className="text-lg" />
//               <span>Update identity</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
