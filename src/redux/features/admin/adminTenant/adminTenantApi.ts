import { baseApi } from "@/redux/hooks/baseApi";
import {
  ApiResponse,
  Tenant,
  CreateTenantRequest,
  UpdateTenantRequest,
  GetTenantsParams,
  Role,
  CreateRoleRequest,
  TenantUser,
  CreateTenantUserRequest,
  UpdateTenantUserRequest,
} from "./adminTenant.types";

export const adminTenantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Tenant endpoints
    getTenants: builder.query<ApiResponse<Tenant[]>, GetTenantsParams>({
      query: (params) => ({
        url: "/admin/tenants",
        method: "GET",
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          ...(params.search && { search: params.search }),
          ...(params.status && { status: params.status }),
        },
      }),
      providesTags: ["Tenant"],
    }),

    getTenantById: builder.query<Tenant, string>({
      query: (tenantId) => ({
        url: `/admin/tenants/${tenantId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, tenantId) => [
        { type: "Tenant", id: tenantId },
      ],
    }),

    createTenant: builder.mutation<Tenant, CreateTenantRequest>({
      query: (data) => ({
        url: "/admin/tenants",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tenant"],
    }),

    updateTenant: builder.mutation<
      Tenant,
      { tenantId: string; data: UpdateTenantRequest }
    >({
      query: ({ tenantId, data }) => ({
        url: `/admin/tenants/${tenantId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { tenantId }) => [
        { type: "Tenant", id: tenantId },
      ],
    }),

    deleteTenant: builder.mutation<void, string>({
      query: (tenantId) => ({
        url: `/admin/tenants/${tenantId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tenant"],
    }),

    // Role endpoints
    getRolesByTenant: builder.query<
      ApiResponse<Role[]>,
      { tenantId: string; page?: number; limit?: number }
    >({
      query: ({ tenantId, page = 1, limit = 20 }) => ({
        url: `/admin/tenants/${tenantId}/roles`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Role"],
    }),

    createRole: builder.mutation<
      Role,
      { tenantId: string; data: CreateRoleRequest }
    >({
      query: ({ tenantId, data }) => ({
        url: `/admin/tenants/${tenantId}/roles`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Role"],
    }),

    updateRole: builder.mutation<
      Role,
      { tenantId: string; roleId: string; data: Partial<CreateRoleRequest> }
    >({
      query: ({ tenantId, roleId, data }) => ({
        url: `/admin/tenants/${tenantId}/roles/${roleId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Role"],
    }),

    deleteRole: builder.mutation<void, { tenantId: string; roleId: string }>({
      query: ({ tenantId, roleId }) => ({
        url: `/admin/tenants/${tenantId}/roles/${roleId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Role"],
    }),

    // User endpoints
    getUsersByTenant: builder.query<
      ApiResponse<TenantUser[]>,
      { tenantId: string; page?: number; limit?: number }
    >({
      query: ({ tenantId, page = 1, limit = 20 }) => ({
        url: `/admin/tenants/${tenantId}/users`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["TenantUser"],
    }),

    createTenantUser: builder.mutation<
      TenantUser,
      { tenantId: string; data: CreateTenantUserRequest }
    >({
      query: ({ tenantId, data }) => ({
        url: `/admin/tenants/${tenantId}/users`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["TenantUser"],
    }),

    updateTenantUser: builder.mutation<
      TenantUser,
      { tenantId: string; userId: string; data: UpdateTenantUserRequest }
    >({
      query: ({ tenantId, userId, data }) => ({
        url: `/admin/tenants/${tenantId}/users/${userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["TenantUser"],
    }),

    deleteTenantUser: builder.mutation<
      void,
      { tenantId: string; userId: string }
    >({
      query: ({ tenantId, userId }) => ({
        url: `/admin/tenants/${tenantId}/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TenantUser"],
    }),
  }),
});

export const {
  useGetTenantsQuery,
  useGetTenantByIdQuery,
  useCreateTenantMutation,
  useUpdateTenantMutation,
  useDeleteTenantMutation,
  useGetRolesByTenantQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useGetUsersByTenantQuery,
  useCreateTenantUserMutation,
  useUpdateTenantUserMutation,
  useDeleteTenantUserMutation,
} = adminTenantApi;
