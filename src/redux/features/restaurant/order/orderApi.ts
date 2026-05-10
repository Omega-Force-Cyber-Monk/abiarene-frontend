import { baseApi } from "@/redux/hooks/baseApi";
import { PaginatedResponse } from "../restaurant.type";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<PaginatedResponse<any>, { page?: number; limit?: number } | void>({
      query: (params) => ({
        url: "/orders",
        method: "GET",
        params: params || { page: 1, limit: 10 },
      }),
      providesTags: ["Order"],
    }),

    getOrderById: builder.query<any, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Order", id }],
    }),

    createOrder: builder.mutation<any, any>({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),

    updateOrder: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Order", id }, "Order"],
    }),

    deleteOrder: builder.mutation<void, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),

    addItemsToOrder: builder.mutation<any, { id: string; items: any[] }>({
      query: ({ id, items }) => ({
        url: `/orders/${id}/items`,
        method: "POST",
        body: { items },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Order", id }],
    }),

    sendToKitchen: builder.mutation<any, string>({
      query: (id) => ({
        url: `/orders/${id}/send-to-kitchen`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Order", id }, "Order"],
    }),

    cancelOrder: builder.mutation<any, string>({
      query: (id) => ({
        url: `/orders/${id}/cancel`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Order", id }, "Order"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useAddItemsToOrderMutation,
  useSendToKitchenMutation,
  useCancelOrderMutation,
} = orderApi;
