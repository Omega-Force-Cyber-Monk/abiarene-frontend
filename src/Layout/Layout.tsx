import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div>
      <main className="bg-[#FEFEFE]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
