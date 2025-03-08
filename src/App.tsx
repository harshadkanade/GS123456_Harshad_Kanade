// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Stores from "./pages/Stores";
import SKUs from "./pages/SKUs";
import Planning from "./pages/Planning";
import Chart from "./pages/Chart";
import { Box } from "@mui/material";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Box display="flex">
        <Sidebar />
        <Box flexGrow={1} p={2}>
          <Routes>
            <Route path="/stores" element={<Stores />} />
            <Route path="/skus" element={<SKUs />} />
            <Route path="/planning" element={<Planning />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="/" element={<Stores />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
