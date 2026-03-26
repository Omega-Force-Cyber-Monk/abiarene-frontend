import { baseApi } from "@/redux/hooks/baseApi";

export const moderationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getModerationQueue: builder.query({
      query: () => ({
        url: "/moderation/queue",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetModerationQueueQuery } = moderationApi;
