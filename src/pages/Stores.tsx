// src/pages/Stores.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addStore,
  removeStore,
  updateStore,
  reorderStores,
} from "../redux/storesSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Stores: React.FC = () => {
  const dispatch = useDispatch();
  const stores = useSelector((state: any) => state.stores);
  const [newStore, setNewStore] = useState({ label: "", city: "", state: "" });

  const handleAdd = () => {
    dispatch(addStore({ ...newStore, id: `ST${Date.now()}` }));
    setNewStore({ label: "", city: "", state: "" });
  };

  const handleRemove = (id: string) => {
    dispatch(removeStore(id));
  };

  const handleUpdate = (id: string, field: string, value: string) => {
    dispatch(updateStore({ id, [field]: value }));
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    dispatch(
      reorderStores({
        startIndex: result.source.index,
        endIndex: result.destination.index,
      })
    );
  };

  return (
    <div>
      <h2>Stores</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="stores">
          {(provided) => (
            <Table {...provided.droppableProps} ref={provided.innerRef}>
              <TableHead>
                <TableRow>
                  <TableCell>S.No</TableCell>
                  <TableCell>Store</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>State</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stores.map((store: any, index: number) => (
                  <Draggable
                    key={store.id}
                    draggableId={store.id}
                    index={index}
                  >
                    {(provided) => (
                      <TableRow
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <TextField
                            value={store.label}
                            onChange={(e) =>
                              handleUpdate(store.id, "label", e.target.value)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={store.city}
                            onChange={(e) =>
                              handleUpdate(store.id, "city", e.target.value)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            value={store.state}
                            onChange={(e) =>
                              handleUpdate(store.id, "state", e.target.value)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => handleRemove(store.id)}>
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TableBody>
            </Table>
          )}
        </Droppable>
      </DragDropContext>
      <TextField
        label="Store Name"
        value={newStore.label}
        onChange={(e) => setNewStore({ ...newStore, label: e.target.value })}
      />
      <TextField
        label="City"
        value={newStore.city}
        onChange={(e) => setNewStore({ ...newStore, city: e.target.value })}
      />
      <TextField
        label="State"
        value={newStore.state}
        onChange={(e) => setNewStore({ ...newStore, state: e.target.value })}
      />
      <Button onClick={handleAdd}>NEW STORE</Button>
    </div>
  );
};

export default Stores;
