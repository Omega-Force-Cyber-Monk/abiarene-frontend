import { baseApi } from "@/redux/hooks/baseApi";
import { Item, CreateItemRequest, UpdateItemRequest } from "./item.type";
import { PaginatedResponse } from "../restaurant.type";

export const itemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // --- Tenant Endpoints ---
    getItems: builder.query<PaginatedResponse<Item>, { page?: number; limit?: number } | void>({
      query: (params) => ({
        url: "/items",
        method: "GET",
        params: params || { page: 1, limit: 10 },
      }),
      providesTags: ["Item"],
    }),

    getItemById: builder.query<Item, string>({
      query: (id) => ({
        url: `/items/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Item", id }],
    }),

    createItem: builder.mutation<Item, CreateItemRequest>({
      query: (data) => ({
        url: "/items",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Item"],
    }),

    updateItem: builder.mutation<Item, { id: string; data: UpdateItemRequest }>({
      query: ({ id, data }) => ({
        url: `/items/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Item", id }, "Item"],
    }),

    deleteItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `/items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Item"],
    }),

    // --- Admin Endpoints ---
    adminCreateItem: builder.mutation<any, { tenantId: string; data: any }>({
      query: ({ tenantId, data }) => ({
        url: `/items/tenant/${tenantId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Item"],
    }),

    adminGetItems: builder.query<any, string>({
      query: (tenantId) => ({
        url: `/items/tenant/${tenantId}`,
        method: "GET",
      }),
      providesTags: ["Item"],
    }),

    adminGetItemById: builder.query<any, { tenantId: string; id: string }>({
      query: ({ tenantId, id }) => ({
        url: `/items/tenant/${tenantId}/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, { id }) => [{ type: "Item", id }],
    }),

    adminUpdateItem: builder.mutation<any, { tenantId: string; id: string; data: any }>({
      query: ({ tenantId, id, data }) => ({
        url: `/items/tenant/${tenantId}/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Item", id }, "Item"],
    }),

    adminDeleteItem: builder.mutation<void, { tenantId: string; id: string }>({
      query: ({ tenantId, id }) => ({
        url: `/items/tenant/${tenantId}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Item"],
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetItemByIdQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
  useAdminCreateItemMutation,
  useAdminGetItemsQuery,
  useAdminGetItemByIdQuery,
  useAdminUpdateItemMutation,
  useAdminDeleteItemMutation,
} = itemApi;
