import { createSlice } from "@reduxjs/toolkit";

import sampleSales from "../data/sales.json";
const initialState = sampleSales;

//const initialState: any[] = [];

const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    updateSalesUnits: (state, action) => {
      const { storeId, skuId, week, units } = action.payload;
      const index = state.findIndex(
        (sale) =>
          sale.storeId === storeId && sale.skuId === skuId && sale.week === week
      );
      if (index !== -1) {
        state[index].units = parseInt(units, 10);
      } else {
        state.push({ storeId, skuId, week, units: parseInt(units, 10) });
      }
    },
  },
});

export const { updateSalesUnits } = salesSlice.actions;
export default salesSlice.reducer;
