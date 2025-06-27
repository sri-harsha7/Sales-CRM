// src/components/BottomNav.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { IoHomeOutline } from "react-icons/io5";
import { LuUserPen } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { FaRegUserCircle } from "react-icons/fa";

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <Link to="/dashboard">
        <div className={styles.navItem}>
          <div className={styles.icon}>
            <IoHomeOutline />
          </div>
          <p>Home</p>
        </div>
      </Link>
      <Link to="/leads">
        <div className={styles.navItem}>
          <div className={styles.icon}>
            <LuUserPen />
          </div>
          <p>Leads</p>
        </div>
      </Link>
      <Link to="/schedule">
        <div className={styles.navItem}>
          <div className={styles.icon}>
            <SlCalender />
          </div>
          <p>Schedule</p>
        </div>
      </Link>
      <Link to="/profile">
        <div className={styles.navItem}>
          <div className={styles.icon}>
            <FaRegUserCircle />
          </div>
          <p>Profile</p>
        </div>
      </Link>
    </nav>
  );
};

export default NavBar;
