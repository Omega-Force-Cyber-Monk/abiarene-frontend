// AdminSidebar.tsx
import logoIcon from "@/assets/primepos/logo/logo.svg";
import user from "@/assets/primepos/logo/user.svg";
// import { Badge } from "@/components/ui/badge";

import { ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IconType } from "react-icons";

import { FiLogOut, FiPieChart } from "react-icons/fi";
import { LuTicketPercent, LuUsers } from "react-icons/lu";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { logOut } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";

// Types
export interface SidebarItem {
  icon: IconType;
  label: string;
  href?: string;
  badge?: string;
  children?: { label: string; href: string }[];
}

export interface SidebarProps {
  items?: SidebarItem[];
  onItemClick?: () => void;
}

// Sidebar Items
const defaultSidebarItems: SidebarItem[] = [
  {
    icon: FiPieChart,
    label: "Overview",
    href: "/admin-dashboard",
  },
  {
    icon: LuUsers,
    label: "Subscribers Vouchers",
    href: "/admin-dashboard/subscription-vouchers",
  },

  {
    icon: LuUsers,
    label: "Tenants",
    href: "/admin-dashboard/tenants",
  },
  {
    icon: LuTicketPercent,
    label: "Ticket Queue",
    href: "/admin-dashboard/ticket-queue",
  },

  // {
  //   icon: MdOutlineAddCircleOutline,
  //   label: "New Business",
  //   href: "/admin-dashboard/new-business",
  // },
];

const AdminSidebar: React.FC<SidebarProps> = ({
  items = defaultSidebarItems,
  onItemClick,
}) => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleMenu = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
  };
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <div
      className="flex flex-col h-full rounded-tr-3xl rounded-br-3xl bg-[#E6E7EB]"
      style={{ boxShadow: "3px 4px 42.3px 0px #0000001A" }}
    >
      {/* Logo */}
      <div className="flex items-center justify-start pl-6 lg:pl-10 pt-5 pb-5 w-full">
        {/* Desktop (lg+) → icon top, text bottom */}
        <Link to="/" className="hidden lg:flex flex-col items-center gap-2">
          <img src={logoIcon} alt="Logo Icon" />
          {/* <img src={logoText} alt="Logo Text" /> */}
        </Link>

        <Link to={"/"} className="lg:hidden flex flex-col items-center gap-2">
          <img src={logoIcon} alt="Logo Icon" />
          {/* <img src={logoText} alt="Logo Text" /> */}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 md:p-4">
        <div className="space-y-3">
          {items.map((item) => {
            const isActive =
              location.pathname === item.href ||
              item.children?.some((child) => location.pathname === child.href);

            const isOpen = openMenu === item.label;

            return (
              <div key={item.label}>
                {/* 👇 ADD THIS SECTION LABEL BEFORE "New Business" */}
                {item.label === "New Business" && (
                  <div className="px-4 pt-4 pb-2 text-xs font-semibold tracking-widest text-gray-500 uppercase">
                    PROVISIONING
                  </div>
                )}

                {item.href && !item.children ? (
                  <Link
                    to={item.href}
                    onClick={onItemClick}
                    className={`group flex items-center justify-between w-full px-4 py-2.5 text-sm font-normal rounded-xl transition-all duration-300 ease-out cursor-pointer
          ${
            isActive
              ? "text-black bg-[linear-gradient(180deg,#FEAF02_0%,#F3D97E_100%)] shadow-md"
              : "text-black hover:text-black hover:bg-[linear-gradient(180deg,#FEAF02_0%,#F3D97E_100%)] hover:shadow-xl hover:brightness-110"
          }`}
                  >
                    <div className="flex items-center space-x-2 text-base">
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                ) : (
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className="group flex items-center justify-between w-full px-3 py-2 text-sm font-normal"
                  >
                    <div className="flex items-center space-x-2 md:text-lg">
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>

                    {item.children && (
                      <ChevronDown
                        className={`w-4 h-4 ${isOpen ? "rotate-180" : ""}`}
                      />
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </nav>
      {/* Help & Support */}
      <div
        onClick={handleLogout}
        className="flex items-center justify-between p-4 m-4 bg-[#F8F9FA] border border-[#CED4DA] rounded-2xl hover:shadow-sm transition-all duration-200 cursor-pointer"
      >
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <img
            src={user}
            alt="User"
            className="w-12 h-12 rounded-full object-cover border"
          />

          <div>
            <h2 className="text-base font-semibold text-gray-800">
              Olivia Rhye
            </h2>
            <p className="text-sm text-gray-500">olivia@gmail.com</p>
          </div>
        </div>

        {/* Right Side */}
        <button className="p-2 rounded-full hover:bg-red-100 transition">
          <FiLogOut className="text-red-600 text-lg" />
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
