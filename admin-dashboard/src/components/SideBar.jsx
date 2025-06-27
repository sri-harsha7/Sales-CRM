import React from "react";
import styles from "./SideBar.module.css";

import { Link, useNavigate } from "react-router-dom";
import login from "../assets/login.png";

const SideBar = () => {
  const nav = useNavigate();
  return (
    <div className={styles.sideBar}>
      <div className={styles.logo}>
        <img src={login} alt="" />
      </div>

      <div
        className={styles.button}
        onClick={() => {
          nav("/");
        }}
      >
        <p>Dashboard</p>
      </div>

      <div
        className={styles.button}
        onClick={() => {
          nav("/leads");
        }}
      >
        <p>Leads</p>
      </div>
      <div
        className={styles.button}
        onClick={() => {
          nav("/employees");
        }}
      >
        <p>Employees</p>
      </div>
      <div
        className={styles.button}
        onClick={() => {
          nav("/settings");
        }}
      >
        <p>Settings</p>
      </div>
    </div>
  );
};

export default SideBar;
