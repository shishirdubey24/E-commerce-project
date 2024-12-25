import {createSlice} from "@reduxjs/toolkit";

const bagSlice = createSlice({
  name: 'bag',
  initialState: [],
  reducers: {
    addToBag: (state, action) => {
      state.push(action.payload); // Add the item if it doesn't already exist     
    },
    removeFromBag: (state, action) => { 
     return state.filter(item => item.id !== action.payload);
    }, 
  }
});
export const bagActions = bagSlice.actions;
export default bagSlice.reducer;