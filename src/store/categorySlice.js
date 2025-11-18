import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selected: "featured", // default
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.selected = action.payload;
    },
    clearCategory(state) {
      state.selected = "featured";
    },
  },
});

export const { setCategory, clearCategory } = categorySlice.actions;
export default categorySlice;
