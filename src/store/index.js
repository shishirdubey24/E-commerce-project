// store/index.js - SIMPLE VERSION WITHOUT REDUX PERSIST
import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./itemsSlice";
import bagReducer from "./bagSlice";
import MendataSlice from "./MendataSlice";
import authSlice from "./authSlice";
import categorySlice from "./categorySlice";
import adminPanelSlice from "./adminSlice";
const myntraStore = configureStore({
  reducer: {
    items: itemsSlice.reducer,
    bag: bagReducer,
    mendata: MendataSlice.reducer,
    auth: authSlice.reducer,
    category: categorySlice.reducer,
    adminPanel: adminPanelSlice.reducer,
  },
});

export default myntraStore;
