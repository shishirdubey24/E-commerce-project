import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    addInitialItems: (state, action) => {
      return action.payload;
    },
    addProduct: (state, action) => {
      console.log("Form added product is", action.payload);
      state.push(action.payload);
    },
  },
});

export const itemsActions = itemsSlice.actions;
export default itemsSlice;
