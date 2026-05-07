import { baseApi } from "@/redux/hooks/baseApi";

export const itemApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // --- Tenant Endpoints ---
    getItems: builder.query<any, void>({
      query: () => ({
        url: "/items",
        method: "GET",
      }),
      providesTags: ["Item"],
    }),

    getItemById: builder.query<any, string>({
      query: (id) => ({
        url: `/items/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Item", id }],
    }),

    createItem: builder.mutation<any, any>({
      query: (data) => ({
        url: "/items",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Item"],
    }),

    updateItem: builder.mutation<any, { id: string; data: any }>({
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
