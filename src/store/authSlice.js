import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: "",
  email: "",
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      const { id, name, email, isAdmin } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.isAdmin = !!isAdmin;
    },
    logout(state) {
      state.id = null;
      state.name = "";
      state.email = "";
      state.isAdmin = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice;
