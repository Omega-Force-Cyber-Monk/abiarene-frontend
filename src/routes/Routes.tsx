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
      { path: "conversations", element: <ConversationsPage /> },
      { path: "new-business", element: <NewBusinessPage /> },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
