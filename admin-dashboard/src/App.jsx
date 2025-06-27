import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";

import SideBar from "./components/SideBar";

import TopBar from "./components/TopBar";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Employees from "./pages/Employees";
import Settings from "./pages/Settings";
const App = () => {
  return (
    <Router>
      <div className={styles.app}>
        <div className={styles.sideBar}>
          <SideBar></SideBar>
        </div>
        <div className={styles.container}>
          <div className={styles.topBar}>
            <TopBar></TopBar>
          </div>
          <div className={styles.content}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
