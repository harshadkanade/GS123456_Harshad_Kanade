// src/pages/Planning.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSalesUnits } from "../redux/salesSlice";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const Planning: React.FC = () => {
  const dispatch = useDispatch();
  const stores = useSelector((state: any) => state.stores);
  const skus = useSelector((state: any) => state.skus);
  const sales = useSelector((state: any) => state.sales);

  const weeks = Array.from({ length: 52 }, (_, i) => ({
    week: `W${String(i + 1).padStart(2, "0")}`,
    month: `M${Math.ceil((i + 1) / 4)}`,
  }));

  const rowData = stores.flatMap((store: any) =>
    skus.map((sku: any) => ({
      store: store.label,
      sku: sku.label,
      storeId: store.id,
      skuId: sku.id,
    }))
  );

  const columnDefs = [
    { headerName: "Store", field: "store", pinned: "left" },
    { headerName: "SKU", field: "sku", pinned: "left" },
    ...weeks.map((week) => ({
      headerName: week.week,
      children: [
        {
          headerName: "Sales Units",
          field: `${week.week}_salesUnits`,
          editable: true,
          valueGetter: (params: any) => {
            const sale = sales.find(
              (s: any) =>
                s.storeId === params.data.storeId &&
                s.skuId === params.data.skuId &&
                s.week === week.week
            );
            return sale ? sale.units : 0;
          },
          onCellValueChanged: (params: any) => {
            dispatch(
              updateSalesUnits({
                storeId: params.data.storeId,
                skuId: params.data.skuId,
                week: week.week,
                units: params.newValue,
              })
            );
          },
        },
        {
          headerName: "Sales Dollars",
          field: `${week.week}_salesDollars`,
          valueGetter: (params: any) => {
            const sale = sales.find(
              (s: any) =>
                s.storeId === params.data.storeId &&
                s.skuId === params.data.skuId &&
                s.week === week.week
            );
            const sku = skus.find((s: any) => s.id === params.data.skuId);
            return sale && sku ? (sale.units * sku.price).toFixed(2) : "0.00";
          },
        },
        {
          headerName: "GM Dollars",
          field: `${week.week}_gmDollars`,
          valueGetter: (params: any) => {
            const sale = sales.find(
              (s: any) =>
                s.storeId === params.data.storeId &&
                s.skuId === params.data.skuId &&
                s.week === week.week
            );
            const sku = skus.find((s: any) => s.id === params.data.skuId);
            return sale && sku
              ? (sale.units * sku.price - sale.units * sku.cost).toFixed(2)
              : "0.00";
          },
        },
        {
          headerName: "GM %",
          field: `${week.week}_gmPercent`,
          valueGetter: (params: any) => {
            const sale = sales.find(
              (s: any) =>
                s.storeId === params.data.storeId &&
                s.skuId === params.data.skuId &&
                s.week === week.week
            );
            const sku = skus.find((s: any) => s.id === params.data.skuId);
            if (!sale || !sku || sale.units === 0) return "0%";
            const salesDollars = sale.units * sku.price;
            const gmDollars = salesDollars - sale.units * sku.cost;
            return `${((gmDollars / salesDollars) * 100).toFixed(2)}%`;
          },
          cellStyle: (params: any) => {
            const value = parseFloat(params.value);
            if (value >= 40)
              return { backgroundColor: "green", color: "white" };
            if (value >= 10) return { backgroundColor: "yellow" };
            if (value > 5) return { backgroundColor: "orange" };
            return { backgroundColor: "red", color: "white" };
          },
        },
      ],
    })),
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: "600px", width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{ resizable: true }}
      />
    </div>
  );
};

export default Planning;
