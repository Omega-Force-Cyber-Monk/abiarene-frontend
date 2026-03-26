import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
// import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

import AdminLayout from "@/Layout/AdminLayout";

import AdminDashboardPage from "@/pages/Admin/AdminDashboardPage";
import SettingsPage from "@/pages/Admin/SettingsPage";
import UsersPage from "@/pages/Admin/TenantsPage";
import ConversationsPage from "@/pages/Admin/ConversationsPage";
import TicketQueuePage from "@/pages/Admin/TicketQueuePage";

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
      { path: "tenants", element: <UsersPage /> },
      { path: "conversations", element: <ConversationsPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
