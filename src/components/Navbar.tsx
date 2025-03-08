import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import logo from "../assets/gsynergy-logo.png";

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <img
          src={logo}
          alt="GSynergy Logo"
          style={{ height: "40px", marginRight: "16px" }}
        />
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Data Viewer App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
