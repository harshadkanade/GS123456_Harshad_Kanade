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
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <TableRow ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </TableRow>
  );
};

const Stores: React.FC = () => {
  const dispatch = useDispatch();
  const stores = useSelector((state: any) => state.stores);
  const [newStore, setNewStore] = useState({ label: "", city: "", state: "" });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = stores.findIndex((store: any) => store.id === active.id);
      const newIndex = stores.findIndex((store: any) => store.id === over.id);
      dispatch(reorderStores({ startIndex: oldIndex, endIndex: newIndex }));
    }
  };

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

  return (
    <div>
      <h2>Stores</h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <Table>
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
            <SortableContext
              items={stores.map((store: any) => store.id)}
              strategy={verticalListSortingStrategy}
            >
              {stores.map((store: any, index: number) => (
                <SortableItem key={store.id} id={store.id}>
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
                </SortableItem>
              ))}
            </SortableContext>
          </TableBody>
        </Table>
      </DndContext>
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
