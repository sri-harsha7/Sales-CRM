import React from "react";
import styles from "./TopBar.module.css";
import { CiSearch } from "react-icons/ci";

const TopBar = () => {
  return (
    <div className={styles.topBar}>
      <div className={styles.topBarContainer}>
        <div className={styles.searchContainer}>
          <div>
            <CiSearch />
          </div>
          <div>
            <input type="text" placeholder="Search..." />
          </div>
          <div className={styles.down}></div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
