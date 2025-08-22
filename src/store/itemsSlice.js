// store/itemsSlice.js - SIMPLE AND CLEAN
import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    addInitialItems: (state, action) => {
      return Array.isArray(action.payload) ? action.payload : [];
    },
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    clearItems: () => {
      return [];
    },
  },
});

export const itemsActions = itemsSlice.actions;
export default itemsSlice;
