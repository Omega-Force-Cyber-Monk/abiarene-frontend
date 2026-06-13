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
import ServerOrdersPage from "@/pages/Server/ServerOrdersPage";
import CashierLayout from "@/Layout/CashierLayout";
import CashierDashboardPage from "@/pages/Cashier/CashierDashboardPage";
import TicketQueueDetails from "@/components/AdminDashboard/Dashboard/TicketQueueDetails";
import ManagerProductManagePage from "@/pages/Manager/ManagerProductManagePage";
// import TenantDetails from "@/components/AdminDashboard/Tenants/TenantDetails";
import LoginPin from "@/pages/LoginPin";
import ProtectedRoute from "@/components/Shared/ProtectedRoute";
import Login from "@/pages/Login";
import PaymentSelectionPage from "@/pages/Payment/PaymentSelectionPage";
import PaymentSuccessPage from "@/pages/Payment/PaymentSuccessPage";
import PaystackCallbackPage from "@/pages/Payment/PaystackCallbackPage";
import SubscribtionVouchersPage from "@/pages/Admin/SubscribtionVouchersPage";



const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/login-pin",
        element: <LoginPin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },

  {
    path: "/payment-selection",
    element: (
      <ProtectedRoute requiredRole="MANAGER">
        <PaymentSelectionPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/subscription/success",
    element: (
      <ProtectedRoute requiredRole="MANAGER">
        <PaymentSuccessPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/subscription/paystack/callback",
    element: (
      <ProtectedRoute requiredRole="MANAGER">
        <PaystackCallbackPage />
      </ProtectedRoute>
    ),
  },

  /* Admin Dashboard */

  {
    path: "/admin-dashboard",
    element: (
      <ProtectedRoute requiredRole="ADMIN">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: "dashboard", element: <AdminDashboardPage /> },
      { path: "subscription-vouchers", element: <SubscribtionVouchersPage /> },
      { path: "ticket-queue", element: <TicketQueuePage /> },
      { path: "ticket-queue/:id", element: <TicketQueueDetails /> },
      { path: "tenants", element: <TenantsPage /> },
      // { path: "tenants/:id", element: <TenantDetails /> },

      { path: "conversations", element: <ConversationsPage /> },
      { path: "new-business", element: <NewBusinessPage /> },
    ],
  },
  /* ManagerLayout Dashboard */
  {
    path: "/manager-dashboard",
    element: (
      <ProtectedRoute requiredRole="MANAGER">
        <ManagerLayout />
      </ProtectedRoute>
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
      { path: "product-manage", element: <ManagerProductManagePage /> },
    ],
  },
  /* server */
  {
    path: "/server-dashboard",
    element: (
      <ProtectedRoute requiredRole="SERVER">
        <ServerLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <ServerDashboardPage /> },
      { path: "dashboard", element: <ServerDashboardPage /> },
      { path: "orders", element: <ServerOrdersPage /> },
    ],
  },
  /* kitchen */
  {
    path: "/kitchen-dashboard",
    element: (
      <ProtectedRoute requiredRole="KITCHEN">
        <KitchenLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <KitchenDashboardPage /> },
      { path: "dashboard", element: <KitchenDashboardPage /> },
    ],
  },
  /* cashier */
  {
    path: "/cashier-dashboard",
    element: (
      <ProtectedRoute requiredRole="CASHIER">
        <CashierLayout />
      </ProtectedRoute>
    ),
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
