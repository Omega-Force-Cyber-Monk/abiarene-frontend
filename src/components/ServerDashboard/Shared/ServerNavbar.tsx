import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

export interface ServerNavbarProps {
  onMobileMenuToggle: () => void;
}

const ServerNavbar = ({ onMobileMenuToggle }: ServerNavbarProps) => {
  const location = useLocation();

  const pathTitleMap: Record<string, string> = {
    "server-dashboard": "Dashboard",
    "orders": "Orders",
  };

  const segments = location.pathname.split("/").filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  const pageTitle = pathTitleMap[lastSegment] || "Server Panel";

  return (
    <header className="flex items-center justify-between h-16 px-4 bg-white border-b lg:hidden">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-black cursor-pointer"
          onClick={onMobileMenuToggle}
        >
          <Menu className="w-6 h-6" />
        </Button>
        <h1 className="text-lg font-semibold text-black">{pageTitle}</h1>
      </div>
    </header>
  );
};

export default ServerNavbar;
