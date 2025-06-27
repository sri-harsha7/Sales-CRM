import React from "react";
import styles from "./Header.module.css";
import logo from "../assets/logo.png";

const Header = ({ page }) => {
  return (
    <div className={styles.header}>
      <img src={logo} alt="" />
      <div className={styles.pageName}>
        <p>{page}</p>
      </div>
    </div>
  );
};

export default Header;
