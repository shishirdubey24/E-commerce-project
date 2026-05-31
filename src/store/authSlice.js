import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  username: "",
  email: "",
  role: "",
  isAuthenticated: false,
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
      state.username = "";
      state.email = "";
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice;
