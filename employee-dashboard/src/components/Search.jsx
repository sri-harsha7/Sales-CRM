import React from "react";
import styles from "./Search.module.css";
import { CiSearch } from "react-icons/ci";

const Search = () => {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.icon}>
        <CiSearch />
      </div>
      <div>
        <input type="text" placeholder="Search..." />
      </div>
      <div className={styles.down}></div>
    </div>
  );
};

export default Search;
