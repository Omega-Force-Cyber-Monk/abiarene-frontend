import { baseApi } from "@/redux/hooks/baseApi";
import { 
  InventoryItem, 
  CreateInventoryRequest, 
  UpdateInventoryRequest 
} from "./inventory.type";

interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    count: number;
    totalPages: number;
  };
}

export const inventoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all inventory items
    getInventories: builder.query<PaginatedResponse<InventoryItem>, { page?: number; limit?: number } | void>({
      query: (params) => ({
        url: "/inventory",
        method: "GET",
        params: params || { page: 1, limit: 20 },
      }),
      providesTags: ["Inventory"],
    }),

    // Search by barcode, SKU or name (Primary for scanner)
    getInventoryByValue: builder.query<InventoryItem, string>({
      query: (value) => ({
        url: `/inventory/by-inventory/${value}`,
        method: "GET",
      }),
      providesTags: (_result, _error, value) => [{ type: "Inventory", id: value }],
    }),

    createInventory: builder.mutation<InventoryItem, CreateInventoryRequest>({
      query: (data) => ({
        url: "/inventory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Inventory"],
    }),

    
    updateInventory: builder.mutation<InventoryItem, { id: string; data: UpdateInventoryRequest }>({
      query: ({ id, data }) => ({
        url: `/inventory/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Inventory", id }, "Inventory"],
    }),
  }),
});

export const {
  useGetInventoriesQuery,
  useLazyGetInventoryByValueQuery, 
  useCreateInventoryMutation,
  useUpdateInventoryMutation,
} = inventoryApi;
