// src/redux/features/subscriptionVoucher/subscriptionVoucherApi.ts

import { baseApi } from "@/redux/hooks/baseApi";
import {
  SubscriptionVoucher,
  CreateSubscriptionVoucherRequest,
  UpdateSubscriptionVoucherRequest,
  DeleteVoucherResponse,
} from "@/redux/features/admin/subscriptionVoucher/subscriptionVoucher";

export const subscriptionVoucherApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all vouchers (admin global)
    getAllSubscriptionVouchers: builder.query<SubscriptionVoucher[], void>({
      query: () => ({
        url: "/admin/subscription-vouchers",
        method: "GET",
      }),
      providesTags: ["Subscription"],
    }),

    // Get vouchers by tenant ID
    getSubscriptionVouchersByTenant: builder.query<
      SubscriptionVoucher[],
      string
    >({
      query: (tenantId) => ({
        url: `/admin/tenants/${tenantId}/subscription-vouchers`,
        method: "GET",
      }),
      providesTags: (result, error, tenantId) => [
        { type: "Subscription", id: tenantId },
      ],
    }),

    // Create new voucher for tenant
    createSubscriptionVoucher: builder.mutation<
      SubscriptionVoucher,
      { tenantId: string; data: CreateSubscriptionVoucherRequest }
    >({
      query: ({ tenantId, data }) => ({
        url: `/admin/tenants/${tenantId}/subscription-vouchers`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscription"],
    }),

    // Update voucher
    updateSubscriptionVoucher: builder.mutation<
      SubscriptionVoucher,
      { id: string; data: UpdateSubscriptionVoucherRequest }
    >({
      query: ({ id, data }) => ({
        url: `/admin/subscription-vouchers/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Subscription"],
    }),

    // Delete voucher
    deleteSubscriptionVoucher: builder.mutation<DeleteVoucherResponse, string>({
      query: (id) => ({
        url: `/admin/subscription-vouchers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subscription"],
    }),
  }),
});

export const {
  useGetAllSubscriptionVouchersQuery,
  useGetSubscriptionVouchersByTenantQuery,
  useCreateSubscriptionVoucherMutation,
  useUpdateSubscriptionVoucherMutation,
  useDeleteSubscriptionVoucherMutation,
} = subscriptionVoucherApi;
