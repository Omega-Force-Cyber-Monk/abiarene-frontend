import { baseApi } from "@/redux/hooks/baseApi";
import {
  InventoryItem,
  CreateInventoryRequest,
  UpdateInventoryRequest,
} from "./inventory";

export const inventoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all inventory items
    getAllInventory: builder.query<InventoryItem[], void>({
      query: () => ({
        url: "/inventory",
        method: "GET",
      }),
      providesTags: ["Inventory"],
    }),

    // Get single inventory item by ID
    getInventoryById: builder.query<InventoryItem, string>({
      query: (id) => ({
        url: `/inventory/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Inventory", id }],
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
      invalidatesTags: (result, error, { id }) => [{ type: "Inventory", id }],
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
