import { baseApi } from "@/redux/hooks/baseApi";
import {
  Table,
  CreateTableRequest,
  UpdateTableRequest,
} from "./table.type";

export const tableApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // --- Tenant Endpoints ---
    getTables: builder.query<Table[], { page?: number; limit?: number } | void>({
      query: (params) => ({
        url: "/tables",
        method: "GET",
        params: params || { page: 1, limit: 10 },
      }),
      providesTags: ["Table"],
    }),

    getTableById: builder.query<Table, string>({
      query: (id) => ({
        url: `/tables/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Table", id }],
    }),

    createTable: builder.mutation<Table, CreateTableRequest>({
      query: (data) => ({
        url: "/tables",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Table"],
    }),

    updateTable: builder.mutation<Table, { id: string; data: UpdateTableRequest }>({
      query: ({ id, data }) => ({
        url: `/tables/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Table", id }, "Table"],
    }),

    deleteTable: builder.mutation<void, string>({
      query: (id) => ({
        url: `/tables/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Table"],
    }),

    getTableItems: builder.query<any, string>({
      query: (id) => ({
        url: `/tables/${id}/items`,
        method: "GET",
      }),
      providesTags: ["Table", "Item"],
    }),

    assignItemsToTable: builder.mutation<any, { id: string; itemIds: string[] }>({
      query: ({ id, itemIds }) => ({
        url: `/tables/${id}/items`,
        method: "PATCH",
        body: { itemIds },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Table", id }],
    }),

    // --- Admin Endpoints ---
    adminCreateTable: builder.mutation<any, { tenantId: string; data: any }>({
      query: ({ tenantId, data }) => ({
        url: `/tables/tenant/${tenantId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Table"],
    }),

    adminGetTables: builder.query<any, string>({
      query: (tenantId) => ({
        url: `/tables/tenant/${tenantId}`,
        method: "GET",
      }),
      providesTags: ["Table"],
    }),

    adminGetTableById: builder.query<any, { tenantId: string; id: string }>({
      query: ({ tenantId, id }) => ({
        url: `/tables/tenant/${tenantId}/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, { id }) => [{ type: "Table", id }],
    }),

    adminUpdateTable: builder.mutation<any, { tenantId: string; id: string; data: any }>({
      query: ({ tenantId, id, data }) => ({
        url: `/tables/tenant/${tenantId}/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Table", id }, "Table"],
    }),

    adminDeleteTable: builder.mutation<void, { tenantId: string; id: string }>({
      query: ({ tenantId, id }) => ({
        url: `/tables/tenant/${tenantId}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Table"],
    }),

    adminGetTableItems: builder.query<any, { tenantId: string; id: string }>({
      query: ({ tenantId, id }) => ({
        url: `/tables/tenant/${tenantId}/${id}/items`,
        method: "GET",
      }),
      providesTags: ["Table", "Item"],
    }),

    adminAssignItemsToTable: builder.mutation<any, { tenantId: string; id: string; itemIds: string[] }>({
      query: ({ tenantId, id, itemIds }) => ({
        url: `/tables/tenant/${tenantId}/${id}/items`,
        method: "PATCH",
        body: { itemIds },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Table", id }],
    }),
  }),
});

export const {
  useGetTablesQuery,
  useGetTableByIdQuery,
  useCreateTableMutation,
  useUpdateTableMutation,
  useDeleteTableMutation,
  useGetTableItemsQuery,
  useAssignItemsToTableMutation,
  useAdminCreateTableMutation,
  useAdminGetTablesQuery,
  useAdminGetTableByIdQuery,
  useAdminUpdateTableMutation,
  useAdminDeleteTableMutation,
  useAdminGetTableItemsQuery,
  useAdminAssignItemsToTableMutation,
} = tableApi;
