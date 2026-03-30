// AdminSidebar.tsx
import logoIcon from "@/assets/primepos/logo/logo.svg";
import user from "@/assets/primepos/logo/user.svg";
import { Badge } from "@/components/ui/badge";

import { ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IconType } from "react-icons";

import { FiLogOut, FiPieChart } from "react-icons/fi";
import { LuTicketPercent, LuUsers } from "react-icons/lu";
import { BsBoxSeam } from "react-icons/bs";
import { AiOutlineScan } from "react-icons/ai";
import { HiOutlineSupport } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/features/auth/authSlice";

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
    href: "/manager-dashboard",
  },

  {
    icon: BsBoxSeam,
    label: "Inventory",
    href: "/manager-dashboard/inventory",
  },
  {
    icon: LuUsers,
    label: "Employees",
    href: "/manager-dashboard/employees",
  },

  {
    icon: LuTicketPercent,
    label: "Approvals",
    href: "/manager-dashboard/approvals",
  },
  {
    icon: AiOutlineScan,
    label: "Scan",
    href: "/manager-dashboard/scan",
  },
  {
    icon: HiOutlineSupport,
    label: "Support",
    href: "/manager-dashboard/support",
  },
  {
    icon: IoSettingsOutline,
    label: "Settings",
    href: "/manager-dashboard/settings",
  },
];

const ManagerSidebar: React.FC<SidebarProps> = ({
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
                {item.href && !item.children ? (
                  <Link
                    to={item.href}
                    onClick={onItemClick}
                    className={`group flex items-center justify-between w-full px-4 py-2.5 text-sm font-normal rounded-xl transition-all duration-300 ease-out cursor-pointer
  ${
    isActive
      ? "text-black bg-[linear-gradient(180deg,#FEAF02_0%,#F3D97E_100%)] shadow-md"
      : "text-black hover:text-black hover:bg-[linear-gradient(180deg,#FEAF02_0%,#F3D97E_100%)] hover:shadow-xl hover:brightness-110"
  }
  active:translate-y-0 active:shadow-md`}
                  >
                    <div className="flex items-center space-x-2 text-base">
                      <item.icon
                        className={`w-5 h-5 transition-colors duration-300 ${
                          isActive
                            ? "text-black"
                            : "text-black group-hover:text-black"
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                ) : (
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className={`group flex items-center justify-between w-full px-3 py-2 text-sm font-normal transition-all duration-300 ease-in-out cursor-pointer ${
                      isActive
                        ? "text-[#3A5CFF] bg-[#1C1D28] rounded-xl shadow-md"
                        : "text-black hover:text-[#3A5CFF] hover:bg-[#1C1D28]/80 hover:rounded-xl hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-center space-x-2 md:text-lg">
                      <item.icon
                        className={`w-5 h-5 transition-all duration-300 ${
                          isActive
                            ? "text-[#3A5CFF]"
                            : "text-black group-hover:text-[#3A5CFF]"
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.children && (
                      <ChevronDown
                        className={`w-4 h-4 transform transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    )}

                    {item.badge && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-[#3A5CFF]/10 text-[#3A5CFF] border border-[#3A5CFF]/30"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                )}

                {item.children && isOpen && (
                  <div className="ml-6 mt-2 space-y-2">
                    {item.children.map((child) => {
                      const childActive = location.pathname === child.href;
                      return (
                        <Link
                          key={child.label}
                          to={child.href}
                          onClick={onItemClick}
                          className={`group block px-3 py-2 text-sm rounded-lg transition-all ${
                            childActive
                              ? "text-[#3A5CFF] bg-[#1C1D28]"
                              : "text-gray-300 hover:text-[#3A5CFF] hover:bg-[#1C1D28]/70"
                          }`}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
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

export default ManagerSidebar;

// // AdminSidebar.tsx
// import logo from "@/assets/Logo/LogoMain.svg";
// import { Badge } from "@/components/ui/badge";

// import { RiShareBoxLine } from "react-icons/ri";
// import { ChevronDown } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";
// import { useState } from "react";

// import { RxDashboard } from "react-icons/rx";
// import { FaUserPlus, FaUsers } from "react-icons/fa";
// import { TbCalendarUser } from "react-icons/tb";
// import { BiSolidUserBadge } from "react-icons/bi";
// import { HiOutlineUserMinus } from "react-icons/hi2";

// import { IconType } from "react-icons";
// import { IoSettingsOutline } from "react-icons/io5";

// // Types
// export interface SidebarItem {
//   icon: IconType; // changed from string to IconType
//   label: string;
//   href?: string;
//   badge?: string;
//   children?: { label: string; href: string }[];
// }

// export interface SidebarProps {
//   items?: SidebarItem[];
//   onItemClick?: () => void;
// }

// // Sidebar Items
// const defaultSidebarItems: SidebarItem[] = [
//   { icon: RxDashboard, label: "Dashboard", href: "/manager-dashboard/dashboard" },
//   {
//     icon: FaUsers,
//     label: "User Management",
//     href: "/manager-dashboard/user-management",
//   },
//   {
//     icon: HiOutlineUserMinus,
//     label: "Patients",
//     href: "/manager-dashboard/patients",
//   },
//   {
//     icon: FaUserPlus,
//     label: "Patient Assignment",
//     href: "/manager-dashboard/patient-assignment",
//   },
//   {
//     icon: BiSolidUserBadge,
//     label: "Protocol Management",
//     href: "/manager-dashboard/protocol-management",
//   },
//   {
//     icon: TbCalendarUser,
//     label: "Audit Log",
//     href: "/manager-dashboard/audit-log",
//   },
//   {
//     icon: IoSettingsOutline,
//     label: "Settings",
//     href: "/manager-dashboard/settings",
//   },
// ];

// const ClientSidebar: React.FC<SidebarProps> = ({
//   items = defaultSidebarItems,
//   onItemClick,
// }) => {
//   const location = useLocation();
//   const [openMenu, setOpenMenu] = useState<string | null>(null);

//   const toggleMenu = (label: string) => {
//     setOpenMenu(openMenu === label ? null : label);
//   };

//   return (
//     <div
//       className="flex flex-col h-full bg-[#29424C]"
//       style={{ boxShadow: "3px 4px 42.3px 0px #0000001A" }}
//     >
//       {/* Logo */}
//       <Link to="/manager-dashboard/dashboard">
//         <div className="flex items-center justify-center p-2 sm:p-3 border-b border-[#C9C6C3] mt-1">
//           <div className="flex justify-center mb-1">
//             <img src={logo} alt="Logo" className="h-8 w-35" />
//           </div>
//         </div>
//       </Link>

//       {/* Navigation */}
//       <nav className="flex-1 p-2 md:p-4">
//         <div className="space-y-4 md:space-y-6">
//           {items.map((item) => {
//             const isActive =
//               location.pathname === item.href ||
//               item.children?.some((child) => location.pathname === child.href);
//             const isOpen = openMenu === item.label;

//             return (
//               <div key={item.label}>
//                 {item.href && !item.children ? (
//                   <Link
//                     to={item.href}
//                     onClick={onItemClick}
//                     className={`group flex items-center justify-between w-full px-3 py-2 text-sm font-normal transition-all duration-300 ease-in-out ${
//                       isActive
//                         ? "text-[#F3AA4B] bg-[#FEF7ED] rounded-xl shadow-md"
//                         : "text-white hover:text-[#F3AA4B] hover:bg-[#FEF7ED] hover:rounded-xl hover:shadow-md"
//                     }`}
//                   >
//                     <div className="flex items-center space-x-2 md:text-lg">
//                       <item.icon
//                         className={`w-5 h-5 transition-all duration-300 ${
//                           isActive
//                             ? "text-[#F3AA4B]"
//                             : "text-white group-hover:text-[#F3AA4B]"
//                         }`}
//                       />
//                       <span>{item.label}</span>
//                     </div>
//                   </Link>
//                 ) : (
//                   <button
//                     onClick={() => toggleMenu(item.label)}
//                     className={`group flex items-center justify-between w-full px-3 py-2 text-sm font-normal transition-all duration-300 ease-in-out cursor-pointer ${
//                       isActive
//                         ? "text-[#3A5CFF] bg-[#1C1D28] rounded-xl shadow-md"
//                         : "text-white hover:text-[#3A5CFF] hover:bg-[#1C1D28]/80 hover:rounded-xl hover:shadow-md"
//                     }`}
//                   >
//                     <div className="flex items-center space-x-2 md:text-lg">
//                       <item.icon
//                         className={`w-5 h-5 transition-all duration-300 ${
//                           isActive
//                             ? "text-[#3A5CFF]"
//                             : "text-white group-hover:text-[#3A5CFF]"
//                         }`}
//                       />
//                       <span>{item.label}</span>
//                     </div>

//                     {item.children && (
//                       <ChevronDown
//                         className={`w-4 h-4 transform transition-transform duration-300 ${
//                           isOpen ? "rotate-180" : ""
//                         }`}
//                       />
//                     )}

//                     {item.badge && (
//                       <Badge
//                         variant="secondary"
//                         className="text-xs bg-[#3A5CFF]/10 text-[#3A5CFF] border border-[#3A5CFF]/30"
//                       >
//                         {item.badge}
//                       </Badge>
//                     )}
//                   </button>
//                 )}

//                 {item.children && isOpen && (
//                   <div className="ml-6 mt-2 space-y-2">
//                     {item.children.map((child) => {
//                       const childActive = location.pathname === child.href;
//                       return (
//                         <Link
//                           key={child.label}
//                           to={child.href}
//                           onClick={onItemClick}
//                           className={`group block px-3 py-2 text-sm rounded-lg transition-all ${
//                             childActive
//                               ? "text-[#3A5CFF] bg-[#1C1D28]"
//                               : "text-gray-300 hover:text-[#3A5CFF] hover:bg-[#1C1D28]/70"
//                           }`}
//                         >
//                           {child.label}
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </nav>

//       {/* Help & Support */}
//       <div className="p-2 md:p-4 border-t border-[#C9C6C3]">
//         <div className="flex justify-center mb-1">
//           <img src={logo} alt="Logo" className="h-5 w-auto" />
//         </div>
//         <Link
//           to="/client-dashboard/help-support"
//           className="flex items-center justify-center space-x-3 text-white hover:text-[#3A5BF8] transition-colors"
//         >
//           <span className="text-sm font-medium">Help & Support</span>
//           <RiShareBoxLine className="w-5 h-5 text-gray-300" />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ClientSidebar
