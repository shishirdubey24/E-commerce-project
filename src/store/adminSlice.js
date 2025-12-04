// store/adminPanelSlice.js
import { createSlice } from "@reduxjs/toolkit";

const adminPanelSlice = createSlice({
  name: "adminPanel",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAdminProducts: (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearAdminData: (state) => {
      state.products = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const adminPanelActions = adminPanelSlice.actions;
export default adminPanelSlice;
