import { baseApi } from "@/redux/hooks/baseApi";

import {
  Notification,
  NotificationListResponse,
  CreateNotificationRequest,
  UpdateNotificationRequest,
} from "./notification";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all notifications
    getNotifications: builder.query<NotificationListResponse, void>({
      query: () => ({
        url: "/notifications",
        method: "GET",
      }),
      providesTags: ["Notification"],
      transformResponse: (response: NotificationListResponse) => {
        // Sort data by createdAt (newest first)
        if (response.data) {
          response.data.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
        }
        return response;
      },
    }),


    // Get unread notification count
    getUnreadCount: builder.query<{ unreadCount: number }, void>({
      query: () => ({
        url: "/notifications/unread-count",
        method: "GET",
      }),
      providesTags: ["Notification"],
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

    // Update notification (general update if needed)
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

    // Mark notification as read
    markAsRead: builder.mutation<Notification, string>({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),

    // Mark all as read
    markAllAsRead: builder.mutation<{ count: number }, void>({
      query: () => ({
        url: "/notifications/read-all",
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});


export const {
  useGetNotificationsQuery,
  useGetUnreadCountQuery,
  useGetNotificationByIdQuery,
  useCreateNotificationMutation,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
} = notificationApi;

