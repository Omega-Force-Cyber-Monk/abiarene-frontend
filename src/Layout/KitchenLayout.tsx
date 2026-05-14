import { Outlet, useNavigate } from "react-router-dom";

import logo from "@/assets/primepos/logo/logo.svg";
import { CiLogout } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/features/auth/authSlice";

const KitchenLayout = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };
  
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between py-4">
        <div className="flex justify-center items-center mt-10">
          <img src={logo} alt="" className="h-20 " />
        </div>
        {/* Right side - Logout */}
        <div onClick={handleLogout} className="flex justify-end">
          <button className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-md text-red-600 border border-red-200 hover:bg-red-50 transition duration-200">
            <CiLogout className="text-lg" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
      <main className="flex-1 overflow-y-auto mt-16 text-black bg-[#FFFFFF] ">
        <Outlet />
      </main>
    </div>
  );
};

export default KitchenLayout;
