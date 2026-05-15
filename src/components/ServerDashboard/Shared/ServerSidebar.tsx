import logoIcon from "@/assets/primepos/logo/logo.svg";
import userImg from "@/assets/primepos/logo/user.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IconType } from "react-icons";
import { FiLogOut, FiPieChart, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "@/redux/features/auth/authSlice";
import { AppRootState as RootState } from "@/redux/store";

interface SidebarItem {
  icon: IconType;
  label: string;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  {
    icon: FiPieChart,
    label: "Dashboard",
    href: "/server-dashboard",
  },
  {
    icon: BsBoxSeam,
    label: "Orders",
    href: "/server-dashboard/orders",
  },
];

interface ServerSidebarProps {
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean) => void;
  onItemClick?: () => void;
  isMobile?: boolean;
}

const ServerSidebar = ({ isCollapsed, setIsCollapsed, onItemClick, isMobile }: ServerSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <div
      className={`flex flex-col h-full bg-[#E6E7EB] transition-all duration-300 relative ${
        isCollapsed && !isMobile ? "w-20" : "w-72"
      } ${!isMobile ? "rounded-tr-3xl rounded-br-3xl shadow-xl" : ""}`}
    >
      {/* Collapse Toggle Button (only on desktop) */}
      {!isMobile && setIsCollapsed && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-10 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:bg-gray-50 z-50 transition-transform active:scale-95"
        >
          {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      )}

      {/* Logo */}
      <div className={`flex items-center justify-center py-8 px-4 transition-all duration-300`}>
        <Link to="/" className="flex flex-col items-center gap-2">
          <img 
            src={logoIcon} 
            alt="Logo" 
            className={`${isCollapsed && !isMobile ? "h-8" : "h-12"} transition-all`} 
          />
          {(!isCollapsed || isMobile) && (
            <span className="font-bold text-gray-800 tracking-tight text-lg">PRIME POS</span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.label}
              to={item.href}
              onClick={onItemClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                ${isActive 
                  ? "bg-[linear-gradient(180deg,#FEAF02_0%,#F3D97E_100%)] text-black shadow-md" 
                  : "text-gray-600 hover:bg-gray-200 hover:text-black"
                }
              `}
            >
              <item.icon className={`text-xl min-w-[24px] ${isActive ? "text-black" : "text-gray-600 group-hover:text-black"}`} />
              {(!isCollapsed || isMobile) && <span className="font-medium whitespace-nowrap">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User & Logout */}
      <div
        onClick={handleLogout}
        className={`flex items-center justify-between p-4 m-4 bg-[#F8F9FA] border border-[#CED4DA] rounded-2xl hover:shadow-sm transition-all duration-200 cursor-pointer
          ${isCollapsed && !isMobile ? "p-2 m-2 justify-center" : ""}
        `}
      >
        {/* Left Side */}
        <div className={`flex items-center ${isCollapsed && !isMobile ? "justify-center" : "gap-3"}`}>
          <img
            src={userImg}
            alt="User"
            className={`${isCollapsed && !isMobile ? "w-10 h-10" : "w-12 h-12"} rounded-full object-cover border`}
          />

          {(!isCollapsed || isMobile) && (
            <div>
              <h2 className="text-base font-semibold text-gray-800 truncate max-w-[120px]">
                {user?.name || "Server"}
              </h2>
              <p className="text-sm text-gray-500 truncate max-w-[120px]">
                {user?.email || "server@primepos.com"}
              </p>
            </div>
          )}
        </div>

        {/* Right Side */}
        {(!isCollapsed || isMobile) && (
          <button className="p-2 rounded-full hover:bg-red-100 transition">
            <FiLogOut className="text-red-600 text-lg" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ServerSidebar;
