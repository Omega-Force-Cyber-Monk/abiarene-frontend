// redux/features/admin/adminTenant/adminTenantApi.ts

import { baseApi } from "@/redux/hooks/baseApi";
import {
  Tenant,
  Role,
  UpdateRolesPayload,
  DeleteUserResponse,
  GetTenantsQueryParams,
  GetRolesQueryParams,
  ApiResponse,
  CreateTenantRequest,
  TenantUser,
  CreateTenantUserRequest,
  UpdateTenantUserRequest,
  TenantsListResponse,
} from "./adminTenant.types";

export const adminTenantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all tenants with pagination and search
    // getTenants: builder.query<ApiResponse<Tenant[]>, GetTenantsQueryParams>({
    //   query: ({ page = 1, limit = 10, search = "" }) => ({
    //     url: "/tenant/all",
    //     method: "GET",
    //     params: {
    //       page,
    //       limit,
    //       ...(search && { search }),
    //     },
    //   }),
    //   transformResponse: (response: Tenant[]) => {
    //     return {
    //       data: response,
    //       total: response.length,
    //       page: 1,
    //       limit: response.length,
    //     };
    //   },
    //   providesTags: (result) =>
    //     result
    //       ? [
    //           ...result.data.map(({ id }) => ({ type: "Tenant" as const, id })),
    //           { type: "Tenant", id: "LIST" },
    //         ]
    //       : [{ type: "Tenant", id: "LIST" }],
    // }),

    getTenants: builder.query<TenantsListResponse, GetTenantsQueryParams>({
      query: ({ page = 1, limit = 10, search = "" }) => ({
        url: "/tenant/all",
        method: "GET",
        params: {
          page,
          limit,
          ...(search && { search }),
        },
      }),
      transformResponse: (response: TenantsListResponse) => {
        return response; // API already returns { data: [], meta: {} }
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: "Tenant" as const, id })),
              { type: "Tenant", id: "LIST" },
            ]
          : [{ type: "Tenant", id: "LIST" }],
    }),

    // Create tenant
    createTenant: builder.mutation<Tenant, CreateTenantRequest>({
      query: (data) => ({
        url: "/tenant/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tenant"],
    }),

    // Get roles for a specific tenant
    getTenantRoles: builder.query<
      ApiResponse<Role[]>,
      { tenantId: string; params?: GetRolesQueryParams }
    >({
      query: ({ tenantId, params }) => ({
        url: `/tenant/${tenantId}/roles`,
        method: "GET",
        params: params || { page: 1, limit: 20 },
      }),
      providesTags: (_result, _error, { tenantId }) => [
        { type: "Role", id: tenantId },
      ],
    }),

    // Update roles for a tenant
    updateTenantRoles: builder.mutation<
      Role[],
      { tenantId: string; payload: UpdateRolesPayload }
    >({
      query: ({ tenantId, payload }) => ({
        url: `/tenant/${tenantId}/roles`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: (_result, _error, { tenantId }) => [
        { type: "Role", id: tenantId },
      ],
    }),

    // Get all users for a tenant (GET /api/users/tenant/{tenantId})
    getTenantUsers: builder.query<TenantUser[], { tenantId: string }>({
      query: ({ tenantId }) => ({
        url: `/users/tenant/${tenantId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, { tenantId }) => [
        { type: "TenantUser", id: tenantId },
      ],
    }),

    // Get single user by ID (GET /api/users/tenant/{tenantId}/{id})
    getTenantUserById: builder.query<
      TenantUser,
      { tenantId: string; userId: string }
    >({
      query: ({ tenantId, userId }) => ({
        url: `/users/tenant/${tenantId}/${userId}`,
        method: "GET",
      }),
    }),

    // Create a new user (POST /api/users/tenant/{tenantId})
    createTenantUser: builder.mutation<
      TenantUser,
      { tenantId: string; data: CreateTenantUserRequest }
    >({
      query: ({ tenantId, data }) => ({
        url: `/users/tenant/${tenantId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, { tenantId }) => [
        { type: "TenantUser", id: tenantId },
      ],
    }),

    // Update a user (PATCH /api/users/tenant/{tenantId}/{id})
    updateTenantUser: builder.mutation<
      TenantUser,
      { tenantId: string; userId: string; data: UpdateTenantUserRequest }
    >({
      query: ({ tenantId, userId, data }) => ({
        url: `/users/tenant/${tenantId}/${userId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { tenantId }) => [
        { type: "TenantUser", id: tenantId },
      ],
    }),

    // Delete a user from tenant (DELETE /api/users/tenant/{tenantId}/{id})
    deleteTenantUser: builder.mutation<
      DeleteUserResponse,
      { tenantId: string; userId: string }
    >({
      query: ({ tenantId, userId }) => ({
        url: `/users/tenant/${tenantId}/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TenantUser"],
    }),
  }),
});

// Export hooks
export const {
  useGetTenantsQuery,
  useGetTenantRolesQuery,
  useUpdateTenantRolesMutation,
  useDeleteTenantUserMutation,
  useCreateTenantMutation,
  useGetTenantUsersQuery,
  useGetTenantUserByIdQuery,
  useCreateTenantUserMutation,
  useUpdateTenantUserMutation,
} = adminTenantApi;

// import { baseApi } from "@/redux/hooks/baseApi";
// import {
//   Tenant,
//   Role,
//   UpdateRolesPayload,
//   DeleteUserResponse,
//   GetTenantsQueryParams,
//   GetRolesQueryParams,
//   ApiResponse,
//   CreateTenantRequest,
// } from "./adminTenant.types";

// export const adminTenantApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // Get all tenants with pagination and search
//     getTenants: builder.query<ApiResponse<Tenant[]>, GetTenantsQueryParams>({
//       query: ({ page = 1, limit = 10, search = "" }) => ({
//         url: "/tenant/all",
//         method: "GET",
//         params: {
//           page,
//           limit,
//           ...(search && { search }),
//         },
//       }),
//       transformResponse: (response: Tenant[]) => {
//         // Transform the array response to paginated response
//         return {
//           data: response,
//           total: response.length,
//           page: 1,
//           limit: response.length,
//         };
//       },
//       providesTags: (result) =>
//         result
//           ? [
//               ...result.data.map(({ id }) => ({ type: "Tenant" as const, id })),
//               { type: "Tenant", id: "LIST" },
//             ]
//           : [{ type: "Tenant", id: "LIST" }],
//     }),
//     //Create table
//     createTenant: builder.mutation<Tenant, CreateTenantRequest>({
//       query: (data) => ({
//         url: "/tenant/create",
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: ["Tenant"],
//     }),

//     // Get roles for a specific tenant
//     getTenantRoles: builder.query<
//       ApiResponse<Role[]>,
//       { tenantId: string; params?: GetRolesQueryParams }
//     >({
//       query: ({ tenantId, params }) => ({
//         url: `/tenant/${tenantId}/roles`,
//         method: "GET",
//         params: params || { page: 1, limit: 20 },
//       }),
//       providesTags: (_result, _error, { tenantId }) => [
//         { type: "Role", id: tenantId },
//       ],
//     }),

//     // Update roles for a tenant
//     updateTenantRoles: builder.mutation<
//       Role[],
//       { tenantId: string; payload: UpdateRolesPayload }
//     >({
//       query: ({ tenantId, payload }) => ({
//         url: `/tenant/${tenantId}/roles`,
//         method: "PATCH",
//         body: payload,
//       }),
//       invalidatesTags: (_result, _error, { tenantId }) => [
//         { type: "Role", id: tenantId },
//       ],
//     }),

//     // Delete a user from tenant
//     deleteTenantUser: builder.mutation<
//       DeleteUserResponse,
//       { tenantId: string; userId: string }
//     >({
//       query: ({ tenantId, userId }) => ({
//         url: `/users/tenant/${tenantId}/${userId}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["User", "TenantUser"],
//     }),
//   }),
// });

// // Export hooks
// export const {
//   useGetTenantsQuery,
//   useGetTenantRolesQuery,
//   useUpdateTenantRolesMutation,
//   useDeleteTenantUserMutation,
//   useCreateTenantMutation,
// } = adminTenantApi;
