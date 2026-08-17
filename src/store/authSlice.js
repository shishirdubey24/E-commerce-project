import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  username: "",
  email: "",
  role: "",
  isAuthenticated: false,
  isSessionInitialized: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginSuccess(state, action) {
      const { token, user } = action.payload || {};
      state.id = user?.id || user?._id || null;
      state.token = token || null;
      state.username = user?.username || "";
      state.email = user?.email || "";
      state.role = user?.role || "";
      state.isAuthenticated = true;
    },

    logout(state) {
      state.id = null;
      state.token = null;
      state.username = "";
      state.email = "";
      state.role = "";
      state.isAuthenticated = false;
    },

    sessionInitializationComplete(state) {
      state.isSessionInitialized = true;
    },
  },
});

export const { loginSuccess, logout, sessionInitializationComplete } = authSlice.actions;

export default authSlice;
