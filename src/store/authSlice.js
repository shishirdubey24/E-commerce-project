import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  username: "",
  email: "",
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginSuccess(state, action) {
      const { id, username, email } = action.payload;

      state.id = id || null;
      state.username = username || "";
      state.email = email || "";
    },

    logout(state) {
      state.id = null;
      state.username = "";
      state.email = "";
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice;
