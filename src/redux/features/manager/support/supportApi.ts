import { baseApi } from "@/redux/hooks/baseApi";
import {
  SupportTicket,
  CreateSupportTicketRequest,
  UpdateSupportTicketRequest,
  SupportTicketsResponse,
  AddMessageRequest,
} from "./supportTypes";

export const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all support tickets with pagination and optional status filter
    getSupportTickets: builder.query<
      SupportTicketsResponse,
      { page?: number; limit?: number; status?: string }
    >({
      query: ({ page = 1, limit = 20, status }) => ({
        url: `/support?page=${page}&limit=${limit}${status ? `&status=${status}` : ""}`,
        method: "GET",
      }),
      providesTags: ["Support"],
    }),

    // Get single support ticket by ID
    getSupportTicketById: builder.query<SupportTicket, string>({
      query: (id) => ({
        url: `/support/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Support", id }],
    }),

    // Create new support ticket
    createSupportTicket: builder.mutation<
      SupportTicket,
      CreateSupportTicketRequest
    >({
      query: (body) => ({
        url: "/support",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Support"],
    }),

    // Add message to support ticket
    addSupportMessage: builder.mutation<
      SupportTicket,
      { id: string; data: AddMessageRequest }
    >({
      query: ({ id, data }) => ({
        url: `/support/${id}/messages`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Support",
        { type: "Support", id },
      ],
    }),

    // Update support ticket
    updateSupportTicket: builder.mutation<
      SupportTicket,
      { id: string; data: UpdateSupportTicketRequest }
    >({
      query: ({ id, data }) => ({
        url: `/support/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Support",
        { type: "Support", id },
      ],
    }),

    // Update support ticket status (Admin only)
    updateSupportTicketStatus: builder.mutation<
      SupportTicket,
      { id: string; data: { status: "OPEN" | "CLOSED" } }
    >({
      query: ({ id, data }) => ({
        url: `/support/${id}/status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Support",
        { type: "Support", id },
      ],
    }),

    // Delete support ticket
    deleteSupportTicket: builder.mutation<void, string>({
      query: (id) => ({
        url: `/support/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Support"],
    }),
  }),
});

export const {
  useGetSupportTicketsQuery,
  useGetSupportTicketByIdQuery,
  useCreateSupportTicketMutation,
  useAddSupportMessageMutation,
  useUpdateSupportTicketMutation,
  useUpdateSupportTicketStatusMutation,
  useDeleteSupportTicketMutation,
} = supportApi;

// import { baseApi } from "@/redux/hooks/baseApi";
// import {
//   SupportTicket,
//   CreateSupportTicketRequest,
//   UpdateSupportTicketRequest,
// } from "./supportTypes";

// export const supportApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // Get all support tickets
//     getSupportTickets: builder.query<SupportTicket[], void>({
//       query: () => ({
//         url: "/support",
//         method: "GET",
//       }),
//       providesTags: ["Support"],
//     }),

//     // Get single support ticket by ID
//     getSupportTicketById: builder.query<SupportTicket, string>({
//       query: (id) => ({
//         url: `/support/${id}`,
//         method: "GET",
//       }),
//       providesTags: (_result, _error, id) => [{ type: "Support", id }],
//     }),

//     // Create new support ticket
//     createSupportTicket: builder.mutation<
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
//     updateSupportTicket: builder.mutation<
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
//     deleteSupportTicket: builder.mutation<void, string>({
//       query: (id) => ({
//         url: `/support/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Support"],
//     }),
//   }),
// });

// export const {
//   useGetSupportTicketsQuery,
//   useGetSupportTicketByIdQuery,
//   useCreateSupportTicketMutation,
//   useUpdateSupportTicketMutation,
//   useDeleteSupportTicketMutation,
// } = supportApi;
