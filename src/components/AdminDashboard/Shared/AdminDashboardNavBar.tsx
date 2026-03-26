import { Bell, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import imgUrl from "@/assets/webvixxen/icon/user.png";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "@/redux/features/auth/authSlice";
import { CiSearch } from "react-icons/ci";
// import { useAuthMeQuery } from "@/redux/features/auth/authApi";

export interface NavbarProps {
  onMobileMenuToggle: () => void;
  notificationCount?: number;
  userName?: string;
  isSidebarOpen: boolean;
}

const AdminDashboardNavBar: React.FC<NavbarProps> = ({
  onMobileMenuToggle,
  isSidebarOpen,
}) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  console.log(imgUrl);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
  };

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
  const pathTitleMap: Record<string, string> = {
    "admin-dashboard": "Overview",
    "ticket-queue": "Ticket Queue",
    tenants: "Tenants",
    settings: "Settings",
  };
  const segments = location.pathname.split("/").filter(Boolean);
  const segmentAfterBase = segments[1] || segments[0];
  const pageTitle = pathTitleMap[segmentAfterBase] || "Unknown";
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
          <div className="flex items-center space-x-2 pl-0 md:pl-2 lg:pl-70">
            <h1 className="text-lg lg:text-3xl font-medium text-black">
              {pageTitle}
            </h1>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative w-80 hidden md:block">
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              className="w-full pl-10 pr-3 py-3 shadow-2xl  rounded-full outline-none focus:ring-2 focus:ring-blue-400"
            />
            <CiSearch className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-green-600 cursor-pointer"
              >
                {imgUrl ? (
                  <img
                    src={imgUrl}
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6" />
                )}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="bg-[#75029B] text-black w-60 shadow-2xl rounded-3xl border border-gray-200 overflow-hidden"
            >
              <Link to="/admin-dashboard">
                <DropdownMenuItem className="px-4 py-2 hover:text-white hover:bg-purple-700 rounded-2xl">
                  Home
                </DropdownMenuItem>
              </Link>

              <Link to="/admin-dashboard/settings">
                <DropdownMenuItem className="px-4 py-2 hover:text-white hover:bg-purple-700 rounded-2xl">
                  Settings
                </DropdownMenuItem>
              </Link>

              <DropdownMenuItem
                onClick={handleLogout}
                className="px-4 py-2 hover:bg-red-600 hover:text-white rounded-2xl"
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  );
};

export default AdminDashboardNavBar;
