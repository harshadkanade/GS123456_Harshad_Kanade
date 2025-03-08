import React from "react";
import { useNavigate } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import LabelIcon from "@mui/icons-material/Label";
import GridOnIcon from "@mui/icons-material/GridOn";
import BarChartIcon from "@mui/icons-material/BarChart";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <List
      component="nav"
      style={{ width: "200px", backgroundColor: "#f5f5f5", height: "100vh" }}
    >
      <ListItem button onClick={() => navigate("/stores")}>
        <ListItemIcon>
          <StoreIcon />
        </ListItemIcon>
        <ListItemText primary="STORE" />
      </ListItem>
      <ListItem button onClick={() => navigate("/skus")}>
        <ListItemIcon>
          <LabelIcon />
        </ListItemIcon>
        <ListItemText primary="SKU" />
      </ListItem>
      <ListItem button onClick={() => navigate("/planning")}>
        <ListItemIcon>
          <GridOnIcon />
        </ListItemIcon>
        <ListItemText primary="PLANNING" />
      </ListItem>
      <ListItem button onClick={() => navigate("/chart")}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="CHARTS" />
      </ListItem>
    </List>
  );
};

export default Sidebar;
