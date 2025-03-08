import { createSlice } from "@reduxjs/toolkit";

import sampleSKUs from "../data/skus.json";

const initialState = sampleSKUs;
//const initialState: any[] = [];

const skusSlice = createSlice({
  name: "skus",
  initialState,
  reducers: {
    addSKU: (state, action) => {
      state.push(action.payload);
    },
    removeSKU: (state, action) => {
      return state.filter((sku) => sku.id !== action.payload);
    },
    updateSKU: (state, action) => {
      const index = state.findIndex((sku) => sku.id === action.payload.id);
      if (index !== -1) state[index] = { ...state[index], ...action.payload };
    },
  },
});

export const { addSKU, removeSKU, updateSKU } = skusSlice.actions;
export default skusSlice.reducer;
