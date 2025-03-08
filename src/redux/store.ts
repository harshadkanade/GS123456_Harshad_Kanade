import { configureStore } from "@reduxjs/toolkit";
import storesReducer from "./storesSlice";
import skusReducer from "./skusSlice";
import salesReducer from "./salesSlice";

const store = configureStore({
  reducer: {
    stores: storesReducer,
    skus: skusReducer,
    sales: salesReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
