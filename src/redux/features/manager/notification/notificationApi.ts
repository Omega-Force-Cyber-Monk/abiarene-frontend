import { baseApi } from "@/redux/hooks/baseApi";

import {
  Notification,
  CreateNotificationRequest,
  UpdateNotificationRequest,
} from "./notification";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all notifications
    getNotifications: builder.query<Notification[], void>({
      query: () => ({
        url: "/notifications",
        method: "GET",
      }),
      providesTags: ["Notification"],
      transformResponse: (response: Notification[]) => {
        // Sort by createdAt (newest first)
        return response.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      },
    }),

    // Get single notification
    getNotificationById: builder.query<Notification, string>({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Notification", id }],
    }),

    // Create notification
    createNotification: builder.mutation<
      Notification,
      CreateNotificationRequest
    >({
      query: (body) => ({
        url: "/notifications",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Notification"],
    }),

    // Update notification
    updateNotification: builder.mutation<
      Notification,
      { id: string; data: UpdateNotificationRequest }
    >({
      query: ({ id, data }) => ({
        url: `/notifications/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Notification", id },
      ],
    }),

    // Delete notification
    deleteNotification: builder.mutation<void, string>({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notification"],
    }),

    // Mark notification as read (using update)
    markAsRead: builder.mutation<Notification, string>({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "PATCH",
        body: { isRead: true },
      }),
      invalidatesTags: (result, error, id) => [{ type: "Notification", id }],
    }),

    // Mark all as read
    markAllAsRead: builder.mutation<void, void>({
      query: () => ({
        url: "/notifications/mark-all-read",
        method: "POST",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetNotificationByIdQuery,
  useCreateNotificationMutation,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
} = notificationApi;
