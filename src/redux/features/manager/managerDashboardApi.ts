import { baseApi } from "@/redux/hooks/baseApi";
import { ManagerOverview, StockAlertsResponse } from "./managerDashboard.type";

const managerDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getManagerOverview: builder.query<ManagerOverview, void>({
      query: () => ({
        url: "/tenant/overview",
        method: "GET",
      }),
      providesTags: ["Order", "Table"], // Providing some common tags for refetching
    }),
    getStockAlerts: builder.query<StockAlertsResponse, void>({
      query: () => ({
        url: "/inventory/stock-alerts",
        method: "GET",
      }),
      providesTags: ["Inventory"],
    }),
  }),
});

export const { useGetManagerOverviewQuery, useGetStockAlertsQuery } = managerDashboardApi;
