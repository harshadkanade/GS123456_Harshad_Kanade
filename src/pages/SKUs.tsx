// src/pages/SKUs.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSKU, removeSKU, updateSKU } from "../redux/skusSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
} from "@mui/material";

const SKUs: React.FC = () => {
  const dispatch = useDispatch();
  const skus = useSelector((state: any) => state.skus);
  const [newSKU, setNewSKU] = useState({ label: "", price: "", cost: "" });

  const handleAdd = () => {
    dispatch(addSKU({ ...newSKU, id: `SK${Date.now()}` }));
    setNewSKU({ label: "", price: "", cost: "" });
  };

  const handleRemove = (id: string) => {
    dispatch(removeSKU(id));
  };

  const handleUpdate = (id: string, field: string, value: string) => {
    dispatch(updateSKU({ id, [field]: value }));
  };

  return (
    <div>
      <h2>SKUs</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>SKU</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Cost</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {skus.map((sku: any) => (
            <TableRow key={sku.id}>
              <TableCell>
                <TextField
                  value={sku.label}
                  onChange={(e) =>
                    handleUpdate(sku.id, "label", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={sku.price}
                  onChange={(e) =>
                    handleUpdate(sku.id, "price", e.target.value)
                  }
                  type="number"
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={sku.cost}
                  onChange={(e) => handleUpdate(sku.id, "cost", e.target.value)}
                  type="number"
                />
              </TableCell>
              <TableCell>
                <Button onClick={() => handleRemove(sku.id)}>Remove</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TextField
        label="SKU Name"
        value={newSKU.label}
        onChange={(e) => setNewSKU({ ...newSKU, label: e.target.value })}
      />
      <TextField
        label="Price"
        value={newSKU.price}
        onChange={(e) => setNewSKU({ ...newSKU, price: e.target.value })}
        type="number"
      />
      <TextField
        label="Cost"
        value={newSKU.cost}
        onChange={(e) => setNewSKU({ ...newSKU, cost: e.target.value })}
        type="number"
      />
      <Button onClick={handleAdd}>NEW SKU</Button>
    </div>
  );
};

export default SKUs;
