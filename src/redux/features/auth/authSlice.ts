import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

import { authApi } from "./authApi";
import { LoginResponse, User } from "./auth.type";

type AuthState = {
  user: User | null;
  token: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; token?: string }>) => {
      state.user = action.payload.user;
      if (action.payload.token) {
        state.token = action.payload.token;
        Cookies.set("token", action.payload.token, { expires: 1 });
      }
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("token");
      localStorage.removeItem("user");
    },
    loadUserFromToken: (state) => {
      const token = Cookies.get("token");
      if (token) {
        state.token = token;
        const userStr = localStorage.getItem("user");
        if (userStr) state.user = JSON.parse(userStr);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }: PayloadAction<LoginResponse>) => {
        state.token = payload.accessToken;
        state.user = {
          id: payload.user.id,
          email: payload.user.email,
          name: `${payload.user.firstName} ${payload.user.lastName}`,
          role: payload.user.role,
        };
        Cookies.set("token", payload.accessToken, { expires: 1 });
        localStorage.setItem("user", JSON.stringify(state.user));
      },
    );
  },
});

export const { setUser, logOut, loadUserFromToken } = authSlice.actions;
export default authSlice.reducer;
