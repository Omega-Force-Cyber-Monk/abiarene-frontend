import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Signup from "@/pages/Signup";
import AdminLayout from "@/Layout/AdminLayout";
import AdminDashboardPage from "@/pages/Admin/AdminDashboardPage";
import ConversationsPage from "@/pages/Admin/ConversationsPage";
import TicketQueuePage from "@/pages/Admin/TicketQueuePage";
import NewBusinessPage from "@/pages/Admin/NewBusinessPage";
import TenantsPage from "@/pages/Admin/TenantsPage";
import ManagerDashboardPage from "@/pages/Manager/ManagerDashboardPage";
import ManagerLayout from "@/Layout/ManagerLayout";
import InventoryPage from "@/pages/Manager/InventoryPage";
import EmployeesPage from "@/pages/Manager/EmployeesPage";
import ApprovalsPage from "@/pages/Manager/ApprovalsPage";
import ScanPage from "@/pages/Manager/ScanPage";
import SupportPage from "@/pages/Manager/SupportPage";
import SettingsPage from "@/pages/Manager/SettingsPage";
import ServerLayout from "@/Layout/ServerLayout";
import KitchenLayout from "@/Layout/KitchenLayout";
import KitchenDashboardPage from "@/pages/Kitchen/KitchenDashboardPage";
import ServerDashboardPage from "@/pages/Server/ServerDashboardPage";
import CashierLayout from "@/Layout/CashierLayout";
import CashierDashboardPage from "@/pages/Cashier/CashierDashboardPage";
import TicketQueueDetails from "@/components/AdminDashboard/Dashboard/TicketQueueDetails";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        // path: "/",
        index: true,
        element: <Home />,
      },

      // {
      //   path: "/login",
      //   element: <Login />,
      // },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },

  /* Admin Dashboard */
  {
    path: "/admin-dashboard",
    element: (
      // <AdminRoute>
      <AdminLayout />
      // </AdminRoute>
    ),
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: "dashboard", element: <AdminDashboardPage /> },
      { path: "ticket-queue", element: <TicketQueuePage /> },
      { path: "tenants", element: <TenantsPage /> },
      { path: "tenants/:id", element: <TicketQueueDetails /> },
      { path: "conversations", element: <ConversationsPage /> },
      { path: "new-business", element: <NewBusinessPage /> },
    ],
  },
  /* ManagerLayout Dashboard */
  {
    path: "/manager-dashboard",
    element: (
      // <ManagerRoute>
      <ManagerLayout />
      // </ManagerRoute>
    ),
    children: [
      { index: true, element: <ManagerDashboardPage /> },
      { path: "dashboard", element: <ManagerDashboardPage /> },
      { path: "inventory", element: <InventoryPage /> },
      { path: "employees", element: <EmployeesPage /> },
      { path: "approvals", element: <ApprovalsPage /> },
      { path: "scan", element: <ScanPage /> },
      { path: "support", element: <SupportPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  /* server */
  {
    path: "/server-dashboard",
    element: <ServerLayout />,
    children: [
      { index: true, element: <ServerDashboardPage /> },
      { path: "dashboard", element: <ServerDashboardPage /> },
    ],
  },
  /* kitchen */
  {
    path: "/kitchen-dashboard",
    element: <KitchenLayout />,
    children: [
      { index: true, element: <KitchenDashboardPage /> },
      { path: "dashboard", element: <KitchenDashboardPage /> },
    ],
  },
  /* cashier */
  {
    path: "/cashier-dashboard",
    element: <CashierLayout />,
    children: [
      { index: true, element: <CashierDashboardPage /> },
      { path: "dashboard", element: <CashierDashboardPage /> },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
