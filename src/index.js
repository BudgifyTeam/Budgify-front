import React from "react";
import ReactDom from "react-dom/client";
import Login from "./pages/Login";
import Register from "./pages/Register";
import App from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Pockets from "./pages/Pockets";
import Stats from "./pages/Stats";
import Wallets from "./pages/Wallets";
import History from "./pages/history";
import {Income} from "./pages/Income";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
  <>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/dashboard/income" element={<Income/>} />
        <Route exact path="/dashboard/pockets" element={<Pockets />} />
        <Route exact path="/dashboard/stats" element={<Stats />} />
        <Route exact path="/dashboard/wallets" element={<Wallets />} />
        <Route exact path="/dashboard/history" element={<History />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  </>
);
