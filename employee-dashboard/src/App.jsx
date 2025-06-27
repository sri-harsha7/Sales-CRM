import React from "react";
import styles from "./App.module.css";
// import { useEmployeeContext } from "./config/EmployeeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Schedule from "./pages/Schedule";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import Login from ".//Login";

const App = () => {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <NavBar />
      </BrowserRouter>
    </div>
  );
};

export default App;
