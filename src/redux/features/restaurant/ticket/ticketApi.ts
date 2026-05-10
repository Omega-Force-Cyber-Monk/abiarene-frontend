import { baseApi } from "@/redux/hooks/baseApi";
import { Ticket } from "./ticket.type";
import { PaginatedResponse } from "../restaurant.type";

export const ticketApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getKitchenBoardTickets: builder.query<Ticket[], void>({
      query: () => ({
        url: "/tickets/kitchen-board",
        method: "GET",
      }),
      providesTags: ["Order", "Table"],
    }),

    getAllTickets: builder.query<PaginatedResponse<Ticket> | Ticket[], { status?: string; page?: number; limit?: number }>({
      query: (params) => ({
        url: "/tickets",
        method: "GET",
        params: params || { page: 1, limit: 100 },
      }),
      providesTags: ["Order", "Table"],
    }),

    getTicketById: builder.query<any, string>({
      query: (id) => ({
        url: `/tickets/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Order", id }],
    }),

    bumpToReady: builder.mutation<any, string>({
      query: (id) => ({
        url: `/tickets/${id}/bump-to-ready`,
        method: "POST",
      }),
      invalidatesTags: ["Order", "Table"],
    }),

    forceArchive: builder.mutation<any, string>({
      query: (id) => ({
        url: `/tickets/${id}/force-archive`,
        method: "POST",
      }),
      invalidatesTags: ["Order", "Table"],
    }),
  }),
});

export const {
  useGetKitchenBoardTicketsQuery,
  useGetAllTicketsQuery,
  useGetTicketByIdQuery,
  useBumpToReadyMutation,
  useForceArchiveMutation,
} = ticketApi;
