import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import imgUrl from "@/assets/webvixxen/icon/user.png";

import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import NotificationPanel from "./NotificationPanel";

export interface NavbarProps {
  onMobileMenuToggle: () => void;
  notificationCount?: number;
  userName?: string;
  isSidebarOpen: boolean;
}

const ManagerDashboardNavbar: React.FC<NavbarProps> = ({
  onMobileMenuToggle,
  isSidebarOpen,
}) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  console.log(imgUrl);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pathTitleMap: Record<string, { title: string; description: string }> = {
    "manager-dashboard": {
      title: "Overview",
      description: "Welcome back, Rene. Here's what's happening today.",
    },
    inventory: {
      title: "Inventory",
      description: "Manage your stock levels and product catalog.",
    },
    employees: {
      title: "Employees",
      description: "Manage staff profiles and quick-login PINs.",
    },
    "product-manage": {
      title: "Manage Food",
      description: "Manage tables, menu items, and orders",
    },
    approvals: {
      title: "Discount Approvals",
      description: "Review and authorize discount requests from your staff.",
    },
    scan: {
      title: "Scan",
      description: "Use your camera to identify products instantly.",
    },
    support: {
      title: "Report an Issue",
      description: "Get technical help without leaving your POS.",
    },
    settings: {
      title: "Business Setup",
      description: "Configure your terminal and payment methods.",
    },
  };
  const segments = location.pathname.split("/").filter(Boolean);
  const segmentAfterBase = segments[1] || segments[0];

  const pageData = pathTitleMap[segmentAfterBase] || {
    title: "Unknown",
    description: "No description available.",
  };

  const pageTitle = pageData.title;
  const pageDescription = pageData.description;
  return (
    <div className="bg-[#FFFFFF]">
      <header
        className={`flex items-center justify-between h-16 px-4 md:px-8 mb-2 ${
          isSidebarOpen ? "max-w-350 mx-auto" : ""
        }`}
      >
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-black cursor-pointer"
            onClick={onMobileMenuToggle}
          >
            <Menu className="w-6 h-6" />
          </Button>

          {/* Logo + Dashboard text */}
          <div className="flex flex-col items-start space-y-1 pl-0 md:pl-2 lg:pl-70">
            <h1 className="text-lg lg:text-3xl mt-3 font-semibold text-black">
              {pageTitle}
            </h1>
            {/* <p className="text-lg text-[#717680]">{pageDescription}</p> */}
            <p className="hidden md:block text-lg text-[#717680]">
              {pageDescription}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg transition-colors relative cursor-pointer hover:p-2 hover:bg-gray-100 duration-200"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </button>

            {isOpen && (
              <div className="absolute -right-5 lg:right-0 mt-2 z-10">
                <NotificationPanel />
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default ManagerDashboardNavbar;
