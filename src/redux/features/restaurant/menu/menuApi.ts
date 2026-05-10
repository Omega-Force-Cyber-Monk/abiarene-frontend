import { baseApi } from "@/redux/hooks/baseApi";

export interface MenuItem {
  id: string;
  menuId: string;
  itemId: string;
  createdAt: string;
  item: {
    id: string;
    tenantId: string;
    image: string;
    name: string;
    category: string;
    description: string;
    price: number;
    isActive: boolean;
  };
}

export interface MenuResponse {
  id: string;
  tenantId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  items: MenuItem[];
}

export const menuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSharedMenu: builder.query<MenuResponse, void>({
      query: () => ({
        url: "/tables/menu",
        method: "GET",
      }),
      providesTags: ["Menu"],
    }),

    addToSharedMenu: builder.mutation<MenuResponse, { name: string; itemIds: string[] }>({
      query: (data) => ({
        url: "/tables/menu",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Menu"],
    }),

    removeFromSharedMenu: builder.mutation<void, string>({
      query: (itemId) => ({
        url: `/tables/menu/items/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Menu"],
    }),
  }),
});

export const {
  useGetSharedMenuQuery,
  useAddToSharedMenuMutation,
  useRemoveFromSharedMenuMutation,
} = menuApi;
