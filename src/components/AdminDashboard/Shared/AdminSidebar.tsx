// AdminSidebar.tsx
import logoIcon from "@/assets/primepos/logo/logo.svg";
import { Badge } from "@/components/ui/badge";

import { ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { IconType } from "react-icons";
import { IoSettingsOutline } from "react-icons/io5";
import { FiPieChart } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";

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
  // { icon: RxDashboard, label: "Dashboard", href: "/admin-dashboard/dashboard" },
  {
    icon: FiPieChart,
    label: "Overview",
    href: "/admin-dashboard",
  },

  {
    icon: LuUsers,
    label: "Tenants",
    href: "/admin-dashboard/tenants",
  },
  {
    icon: LuUsers,
    label: "Ticket Queue",
    href: "/admin-dashboard/ticket-queue",
  },

  {
    icon: IoSettingsOutline,
    label: "Settings",
    href: "/admin-dashboard/settings",
  },
];

const AdminSidebar: React.FC<SidebarProps> = ({
  items = defaultSidebarItems,
  onItemClick,
}) => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  return (
    <div
      className="flex flex-col h-full"
      style={{ boxShadow: "3px 4px 42.3px 0px #0000001A" }}
    >
      {/* Logo */}
      <div className="flex items-center justify-start pl-6 lg:pl-10 pt-5 pb-5 w-full">
        {/* Desktop (lg+) → icon top, text bottom */}
        <Link
          to="/admin-dashboard"
          className="hidden lg:flex flex-col items-center gap-2"
        >
          <img src={logoIcon} alt="Logo Icon" />
          {/* <img src={logoText} alt="Logo Text" /> */}
        </Link>

        <Link
          to={"/admin-dashboard"}
          className="lg:hidden flex flex-col items-center gap-2"
        >
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
    </div>
  );
};

export default AdminSidebar;
