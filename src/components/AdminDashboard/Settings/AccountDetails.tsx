import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { LogOut } from "lucide-react";
import { User, Briefcase, Mail } from "lucide-react";
// import SecurityAccess from "./SecurityAccess";
// import AlertToggleItem from "./AlertToggleItem";

const AccountDetails = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    adminTitle: "",
    professionalEmail: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="w-full mb-6">
        {/* MAIN GRID */}
        <div className="">
          <div className="xl:col-span-8 bg-white rounded-xl border border-[#EFEEEE] shadow-lg p-4 w-full flex flex-col">
            <h2 className="text-lg font-semibold text-foreground">
              Account Details
            </h2>

            {/* FORM GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 mb-4 grow">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pl-10 focus:outline-none focus:border-[#79029C] focus:ring-1 focus:ring-[#79029C] transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Admin Title
                </label>

                <div className="relative mt-1">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                  <input
                    type="text"
                    name="adminTitle"
                    value={formData.adminTitle}
                    onChange={handleInputChange}
                    placeholder="Enter your admin title"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pl-10 focus:outline-none focus:border-[#79029C] focus:ring-1 focus:ring-[#79029C] transition-all duration-200"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Professional Email
                </label>

                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                  <input
                    type="email"
                    name="professionalEmail"
                    value={formData.professionalEmail}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pl-10 focus:outline-none focus:border-[#79029C] focus:ring-1 focus:ring-[#79029C] transition-all duration-200"
                  />
                </div>
              </div>
            </div>

            {/* BUTTON STAYS AT BOTTOM WITH FIXED SIZE */}
            <div className="mt-auto flex justify-start">
              <Button
                type="submit"
                className="cursor-pointer flex gap-2 justify-center px-4 py-2 text-base text-white  bg-[linear-gradient(180deg,#A503A3_0%,#3F0193_100%)] shadow-md rounded-lg hover:shadow-xl hover:brightness-110 transition"
              >
                <Save className="w-4 h-4 mr-2 inline-block" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
