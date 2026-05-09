import user from "@/assets/primepos/logo/user.png";
import { IoIosSave } from "react-icons/io";

export default function AccountDetails() {
  return (
    <div className="w-full bg-white border-[#DDDDDD]">
      <div>
        <div className="bg-[#FFF7EC] rounded-2xl shadow-xl p-6 border border-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between mb-4  pb-2">
            <h2 className="text-lg font-semibold text-gray-800">
              Account Details
            </h2>
          </div>
          <div className=" flex justify-baseline items-center space-x-3 mb-4">
            <div>
              <img src={user} alt="" />
            </div>
            <div className="">
              <h2 className="mb-2 font-semibold">Manager Profile</h2>
              <p>Manage your personal account details.</p>
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-base font-semibold text-[#272F3A]">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Olivia Rhye"
                className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
              />
            </div>

            <div>
              <label className="text-base font-semibold text-[#272F3A]">
                Role
              </label>
              <div className="flex gap-2 mt-1">
                <input
                  type="text"
                  placeholder="Store Manager"
                  className="w-full bg-white border-[#DDDDDD] px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
                />
              </div>
            </div>

            <div>
              <label className="text-base font-semibold text-[#272F3A]">
                Professional Email
              </label>
              <input
                type="email"
                placeholder="manager@rene-pos.com"
                className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
              />
            </div>

            <div>
              <label className="text-base font-semibold text-[#272F3A]">
                Login Pin
              </label>
              <input
                type="number"
                placeholder="1234"
                className="w-full bg-white border-[#DDDDDD] mt-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#061E49]"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-6">
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-full cursor-pointer bg-[#061E49] text-white text-sm font-medium shadow-sm hover:bg-[#0A2A66] transition-all duration-200">
              <IoIosSave className="text-lg" />
              <span>Update identity</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
