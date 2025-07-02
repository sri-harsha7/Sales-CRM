// src/pages/Profile.jsx
import React from "react";
import styles from "./Profile.module.css";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useEmployeeContext } from "../config/EmployeeContext";

const Profile = () => {
  const { logout } = useEmployeeContext();
  const nav = useNavigate();

  const handleLogout = async () => {
    await logout();
    nav("/"); // Navigate to login
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header page="Profile" />
      </div>
      <div className={styles.content}>
        <h2>Profile Settings</h2>
        <form>
          <label>First Name</label>
          <input type="text" placeholder="John" />

          <label>Last Name</label>
          <input type="text" placeholder="Doe" />

          <label>Email</label>
          <input type="email" placeholder="example@example.com" />

          <label>Password</label>
          <input type="password" />

          <label>Confirm Password</label>
          <input type="password" />
          <div className={styles.buttons}>
            <button type="submit" className={styles.saveBtn}>
              Save
            </button>
            <div>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
