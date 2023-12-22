import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css'
import Home from "./companents/Home/Home"
import UserChange from "./companents/UserChange/UserChange"
import Register from "./Pages/Register/Register"
import Login from "./Pages/Login/Login"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/change" element={<UserChange />} />
    </Routes>

  </Router>
);