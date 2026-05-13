import { baseApi } from "@/redux/hooks/baseApi";
import { 
  SubscriptionResponse, 
  InitiatePaymentRequest, 
  InitiatePaymentResponse, 
  PaymentStatusResponse 
} from "./subscription.type";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTenantSubscription: builder.query<SubscriptionResponse, void>({
      query: () => ({
        url: "/tenant/subscription/me",
        method: "GET",
      }),
      providesTags: ["Subscription"],
    }),
    initiatePayment: builder.mutation<InitiatePaymentResponse, InitiatePaymentRequest>({
      query: (data) => ({
        url: "/tenant/subscription/pay",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscription"],
    }),
    getPaymentStatus: builder.query<PaymentStatusResponse, string>({
      query: (reference) => ({
        url: `/tenant/subscription/payments/${reference}/status`,
        method: "GET",
      }),
      providesTags: (result) => 
        result ? [{ type: "Subscription" as const, id: result.payment.reference }] : ["Subscription"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.payment?.status === "COMPLETED") {
            // Invalidate the Subscription tag to refresh the main subscription status
            dispatch(
              subscriptionApi.util.invalidateTags(["Subscription"])
            );
          }
        } catch {
          // Handle error if needed
        }
      },
    }),
  }),
});


export const { 
  useGetTenantSubscriptionQuery, 
  useInitiatePaymentMutation,
  useGetPaymentStatusQuery
} = subscriptionApi;

