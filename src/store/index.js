import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./itemsSlice";
import fetchStatusSlice from "./fetchStatusSlice";
 import bagReducer from "./bagSlice";
import MendataSlice from "./MendataSlice";
 const myntraStore=configureStore({
    reducer: {
        items: itemsSlice.reducer,
        fetchStatus:fetchStatusSlice.reducer,
         bag:bagReducer,
         mendata: MendataSlice.reducer
        }
 })
 export default myntraStore;