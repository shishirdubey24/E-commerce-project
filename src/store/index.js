// store/index.js - SIMPLE VERSION WITHOUT REDUX PERSIST
import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./itemsSlice";
import bagReducer from "./bagSlice";
import MendataSlice from "./MendataSlice";
import authSlice from "./authSlice";

const myntraStore = configureStore({
  reducer: {
    items: itemsSlice.reducer,
    bag: bagReducer,
    mendata: MendataSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default myntraStore;
