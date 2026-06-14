import { baseApi } from "@/redux/hooks/baseApi";
import {
  SubscriptionPrice,
  CreateSubscriptionPriceRequest,
  UpdateSubscriptionPriceRequest,
  DeleteSubscriptionResponse,
} from "@/redux/features/admin/subscription/subscription";

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all subscription prices
    getAllSubscriptionPrices: builder.query<SubscriptionPrice[], { currency?: string } | void>({
      query: (params) => ({
        url: "/admin/subscription-prices",
        method: "GET",
        params: params && params.currency ? { currency: params.currency } : undefined,
      }),
      providesTags: ["Subscription"],
    }),

    // Create new subscription price
    createSubscriptionPrice: builder.mutation<
      SubscriptionPrice,
      CreateSubscriptionPriceRequest
    >({
      query: (data) => ({
        url: "/admin/subscription-prices",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscription"],
    }),

    // Update subscription price
    updateSubscriptionPrice: builder.mutation<
      SubscriptionPrice,
      { id: string; data: UpdateSubscriptionPriceRequest }
    >({
      query: ({ id, data }) => ({
        url: `/admin/subscription-prices/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Subscription"],
    }),

    // Delete subscription price
    deleteSubscriptionPrice: builder.mutation<
      DeleteSubscriptionResponse,
      string
    >({
      query: (id) => ({
        url: `/admin/subscription-prices/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subscription"],
    }),
  }),
});

export const {
  useGetAllSubscriptionPricesQuery,
  useCreateSubscriptionPriceMutation,
  useUpdateSubscriptionPriceMutation,
  useDeleteSubscriptionPriceMutation,
} = subscriptionApi;
