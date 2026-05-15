import { baseApi } from "@/redux/hooks/baseApi";

export interface Discount {
  id: string;
  tenantId: string;
  name: string;
  minimumPrice: number;
  offPrice: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DiscountResponse {
  data: Discount[];
  meta: {
    page: number;
    limit: number;
    total: number;
    count: number;
    totalPages: number;
  };
}

export interface CreateDiscountRequest {
  name: string;
  minimumPrice: number;
  offPrice: number;
  isActive: boolean;
}

export const discountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDiscounts: builder.query<DiscountResponse, { page?: number; limit?: number; isActive?: boolean } | void>({
      query: (params) => ({
        url: "/discount",
        method: "GET",
        params: params || {},
      }),
      providesTags: ["Discount"],
    }),
    getDiscountById: builder.query<Discount, string>({
      query: (id) => ({
        url: `/discount/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Discount", id }],
    }),
    createDiscount: builder.mutation<Discount, CreateDiscountRequest>({
      query: (body) => ({
        url: "/discount",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Discount"],
    }),
    updateDiscount: builder.mutation<Discount, { id: string; data: Partial<CreateDiscountRequest> }>({
      query: ({ id, data }) => ({
        url: `/discount/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => ["Discount", { type: "Discount", id }],
    }),
    deleteDiscount: builder.mutation<{ count: number }, string>({
      query: (id) => ({
        url: `/discount/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Discount"],
    }),
  }),
});

export const {
  useGetDiscountsQuery,
  useGetDiscountByIdQuery,
  useCreateDiscountMutation,
  useUpdateDiscountMutation,
  useDeleteDiscountMutation,
} = discountApi;
