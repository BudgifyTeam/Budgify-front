import React from "react";
import ReactDom from "react-dom/client";
import Login from "./pages/Login"
import Register from "./pages/Register"
import App from "./pages/Home"
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
  <>
    <Router>
      <Routes>
        <Route exact path="/" element={<App/>}/>
        <Route exact path="/dashboard" element={<Dashboard/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  </>
);
