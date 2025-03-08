import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const Chart: React.FC = () => {
  const stores = useSelector((state: any) => state.stores);
  const skus = useSelector((state: any) => state.skus);
  const sales = useSelector((state: any) => state.sales);
  const [selectedStore, setSelectedStore] = useState(stores[0]?.id || "");

  const weeks = Array.from(
    { length: 52 },
    (_, i) => `W${String(i + 1).padStart(2, "0")}`
  );

  const chartData = weeks.map((week) => {
    const storeSales = sales.filter(
      (s: any) => s.storeId === selectedStore && s.week === week
    );
    const gmDollars = storeSales.reduce((sum: number, sale: any) => {
      const sku = skus.find((k: any) => k.id === sale.skuId);
      return sum + (sale.units * sku.price - sale.units * sku.cost);
    }, 0);
    const salesDollars = storeSales.reduce((sum: number, sale: any) => {
      const sku = skus.find((k: any) => k.id === sale.skuId);
      return sum + sale.units * sku.price;
    }, 0);
    const gmPercent = salesDollars ? (gmDollars / salesDollars) * 100 : 0;
    return { week, gmDollars, gmPercent };
  });

  return (
    <div>
      <h2>Gross Margin</h2>
      <FormControl fullWidth>
        <InputLabel>Store</InputLabel>
        <Select
          value={selectedStore}
          onChange={(e) => setSelectedStore(e.target.value)}
        >
          {stores.map((store: any) => (
            <MenuItem key={store.id} value={store.id}>
              {store.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis
            yAxisId="left"
            label={{ value: "GM Dollars", angle: -90, position: "insideLeft" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            label={{ value: "GM %", angle: 90, position: "insideRight" }}
            domain={[0, 100]}
          />
          <Tooltip />
          <Legend />
          <Bar
            yAxisId="left"
            dataKey="gmDollars"
            fill="#8884d8"
            name="GM Dollars"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="gmPercent"
            stroke="#ff7300"
            name="GM %"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
