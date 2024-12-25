import {createSlice} from "@reduxjs/toolkit";

const MendataSlice = createSlice({
  name: 'mendata',
  initialState: [],
  reducers: {
    addMendata: (state, action) => {
      const newState= action.payload;
     
      return newState
    }
  }
  
});
export const mendataActions = MendataSlice.actions;
export default MendataSlice;