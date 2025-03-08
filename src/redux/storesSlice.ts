import { createSlice } from "@reduxjs/toolkit";

import sampleStores from "../data/stores.json";
const initialState = sampleStores;

//const initialState: any[] = []; // We'll add sample data later

const storesSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    addStore: (state, action) => {
      state.push(action.payload);
    },
    removeStore: (state, action) => {
      return state.filter((store) => store.id !== action.payload);
    },
    updateStore: (state, action) => {
      const index = state.findIndex((store) => store.id === action.payload.id);
      if (index !== -1) state[index] = { ...state[index], ...action.payload };
    },
    reorderStores: (state, action) => {
      const { startIndex, endIndex } = action.payload;
      const [moved] = state.splice(startIndex, 1);
      state.splice(endIndex, 0, moved);
    },
  },
});

export const { addStore, removeStore, updateStore, reorderStores } =
  storesSlice.actions;
export default storesSlice.reducer;
