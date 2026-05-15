import { Outlet } from "react-router-dom";
import { useState } from "react";
import ServerSidebar from "@/components/ServerDashboard/Shared/ServerSidebar";
import ServerNavbar from "@/components/ServerDashboard/Shared/ServerNavbar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const ServerLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
      {/* Desktop Sidebar */}
      <aside 
        className={`hidden lg:flex flex-col fixed inset-y-0 left-0 z-30 transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-72"
        }`}
      >
        <ServerSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </aside>

      {/* Mobile Sidebar (Sheet) */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <div className="hidden" />
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0 border-none">
          <ServerSidebar 
            isMobile={true} 
            onItemClick={() => setIsMobileMenuOpen(false)} 
          />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div 
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isCollapsed ? "lg:ml-20" : "lg:ml-72"
        }`}
      >
        {/* Mobile Navbar */}
        <ServerNavbar onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-white lg:bg-gray-50/30">
          <div className="p-4 md:p-8 w-full mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ServerLayout;
