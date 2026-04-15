// src/redux/features/auth/authApi.ts
import { baseApi } from "@/redux/hooks/baseApi";
import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from "./auth.type";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/admin/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (payload) => ({
        url: "/admin/signup",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/admin/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useSignupMutation, useLogoutMutation } =
  authApi;

// import { baseApi } from "@/redux/hooks/baseApi";
// import {
//   LoginRequest,
//   LoginResponse,
//   RegisterRequest,
//   RegisterResponse,
// } from "./auth.type";

// export const authApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     login: builder.mutation<LoginResponse, LoginRequest>({
//       query: (credentials) => ({
//         url: "/admin/login",
//         method: "POST",
//         body: credentials,
//       }),
//       invalidatesTags: ["User"],
//     }),

//     register: builder.mutation<RegisterResponse, RegisterRequest>({
//       query: (payload) => ({
//         url: "/user",
//         method: "POST",
//         body: payload,
//       }),
//       invalidatesTags: ["User"],
//     }),

//     // 🟢 ADD THIS (CORRECT UPDATE PROFILE API)
//     updateProfile: builder.mutation({
//       query: ({ id, data }) => ({
//         url: `/user/my-profile/${id}`,
//         method: "PATCH",
//         body: data,
//       }),
//       invalidatesTags: ["User"],
//     }),
//   }),
//   overrideExisting: false,
// });

// export const {
//   useLoginMutation,
//   useRegisterMutation,
//   useUpdateProfileMutation,
// } = authApi;
