// services/settingApi.ts

import { baseApi } from "@/redux/hooks/baseApi";
import {
  User,
  UpdateUserPayload,
  SubscriptionResponse,
} from "@/redux/features/manager/settings/settingType";

export const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get current user profile
    getCurrentUser: builder.query<User, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    // Update current user profile
    updateCurrentUser: builder.mutation<User, UpdateUserPayload>({
      query: (userData) => ({
        url: "/users/me",
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    // Get tenant subscription details
    getTenantSubscription: builder.query<SubscriptionResponse, void>({
      query: () => ({
        url: "/tenant/subscription/me",
        method: "GET",
      }),
      providesTags: ["Subscription"],
    }),
  }),
  overrideExisting: false,
});

// Export hooks for use in components
export const {
  useGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
  useGetTenantSubscriptionQuery,
} = settingApi;
