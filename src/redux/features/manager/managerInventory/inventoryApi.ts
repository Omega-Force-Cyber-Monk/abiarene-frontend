import { baseApi } from "@/redux/hooks/baseApi";
import {
  InventoryItem,
  CreateInventoryRequest,
  UpdateInventoryRequest,
} from "./inventory";

import { PaginatedResponse } from "../../restaurant/restaurant.type";

export const inventoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all inventory items
    getAllInventory: builder.query<PaginatedResponse<InventoryItem> | InventoryItem[], void | { page?: number; limit?: number }>({
      query: (params) => ({
        url: "/inventory",
        method: "GET",
        params: params || { page: 1, limit: 100 },
      }),
      providesTags: ["Inventory"],
    }),

    // Get single inventory item by ID
    getInventoryById: builder.query<InventoryItem, string>({
      query: (id) => ({
        url: `/inventory/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Inventory", id }],
    }),

    // Create new inventory item
    createInventory: builder.mutation<InventoryItem, CreateInventoryRequest>({
      query: (data) => ({
        url: "/inventory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Inventory"],
    }),

    // Update inventory item
    updateInventory: builder.mutation<
      InventoryItem,
      { id: string; data: UpdateInventoryRequest }
    >({
      query: ({ id, data }) => ({
        url: `/inventory/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Inventory", id }],
    }),

    // Delete inventory item
    deleteInventory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/inventory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Inventory"],
    }),
  }),
});

export const {
  useGetAllInventoryQuery,
  useGetInventoryByIdQuery,
  useCreateInventoryMutation,
  useUpdateInventoryMutation,
  useDeleteInventoryMutation,
} = inventoryApi;
