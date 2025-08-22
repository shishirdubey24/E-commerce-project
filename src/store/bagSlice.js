// store/bagSlice.js - SIMPLE AND CLEAN
import { createSlice } from "@reduxjs/toolkit";

const bagSlice = createSlice({
  name: "bag",
  initialState: [],
  reducers: {
    addToBag: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (!existingItem) {
        state.push(action.payload);
      }
    },
    removeFromBag: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    clearBag: () => {
      return [];
    },
  },
});

export const bagActions = bagSlice.actions;
export default bagSlice.reducer;
