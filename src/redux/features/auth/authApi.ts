// src/redux/features/auth/authApi.ts
import { baseApi } from "@/redux/hooks/baseApi";
import {
  LoginRequest,
  LoginResponse,
  PinLoginRequest,
  PinLoginResponse,
  SignupRequest,
  SignupResponse,
} from "./auth.type";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
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

    /* Pin Login */
    pinLogin: builder.mutation<PinLoginResponse, PinLoginRequest>({
      query: (body) => ({
        url: "/auth/pin-login",
        method: "POST",
        body,
      }),
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

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  usePinLoginMutation,
} = authApi;
