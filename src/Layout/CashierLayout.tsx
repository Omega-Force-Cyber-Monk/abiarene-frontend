import { Outlet } from "react-router-dom";

import logo from "@/assets/primepos/logo/logo.svg";

const CashierLayout = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center mt-10">
        <img src={logo} alt="" className="h-20 " />
      </div>
      <main className="flex-1 overflow-y-auto mt-16 text-black bg-[#FFFFFF] ">
        <Outlet />
      </main>
    </div>
  );
};

export default CashierLayout;
