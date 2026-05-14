// adminsupportApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { SupportTicket, UpdateSupportTicketRequest } from "./adminsupportTypes";
import { baseApi } from "@/redux/hooks/baseApi";

interface SupportTicketsResponse {
  data: SupportTicket[];
  meta: {
    page: number;
    limit: number;
    total: number;
    count: number;
    totalPages: number;
  };
}

export const adminSupportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminSupportTickets: builder.query<
      SupportTicketsResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 20 }) => ({
        url: "/support",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["Support"],
    }),
    updateAdminSupportTicket: builder.mutation<
      SupportTicket,
      { id: string; data: UpdateSupportTicketRequest }
    >({
      query: ({ id, data }) => ({
        url: `/support/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Support"],
    }),
    getAdminSupportTicketById: builder.query<SupportTicket, string>({
      query: (id) => `/support/${id}`,
      providesTags: (result, error, id) => [{ type: "Support", id }],
    }),
  }),
});

export const {
  useGetAdminSupportTicketsQuery,
  useUpdateAdminSupportTicketMutation,
  useGetAdminSupportTicketByIdQuery,
} = adminSupportApi;

// import { baseApi } from "@/redux/hooks/baseApi";
// import {
//   SupportTicket,
//   CreateSupportTicketRequest,
//   UpdateSupportTicketRequest,
// } from "./adminsupportTypes";

// export const supportApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // Get all support tickets
//     getAdminSupportTickets: builder.query<SupportTicket[], void>({
//       query: () => ({
//         url: "/support",
//         method: "GET",
//       }),
//       providesTags: ["Support"],
//     }),

//     // Get single support ticket by ID
//     getAdminSupportTicketById: builder.query<SupportTicket, string>({
//       query: (id) => ({
//         url: `/support/${id}`,
//         method: "GET",
//       }),
//       providesTags: (_result, _error, id) => [{ type: "Support", id }],
//     }),

//     // Create new support ticket
//     createAdminSupportTicket: builder.mutation<
//       SupportTicket,
//       CreateSupportTicketRequest
//     >({
//       query: (body) => ({
//         url: "/support",
//         method: "POST",
//         body,
//       }),
//       invalidatesTags: ["Support"],
//     }),

//     // Update support ticket
//     updateAdminSupportTicket: builder.mutation<
//       SupportTicket,
//       { id: string; data: UpdateSupportTicketRequest }
//     >({
//       query: ({ id, data }) => ({
//         url: `/support/${id}`,
//         method: "PATCH",
//         body: data,
//       }),
//       invalidatesTags: (_result, _error, { id }) => [
//         "Support",
//         { type: "Support", id },
//       ],
//     }),

//     // Delete support ticket
//     deleteAdminSupportTicket: builder.mutation<void, string>({
//       query: (id) => ({
//         url: `/support/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Support"],
//     }),
//   }),
// });

// export const {
//   useGetAdminSupportTicketsQuery,
//   useGetAdminSupportTicketByIdQuery,
//   useCreateAdminSupportTicketMutation,
//   useUpdateAdminSupportTicketMutation,
//   useDeleteAdminSupportTicketMutation,
// } = supportApi;
