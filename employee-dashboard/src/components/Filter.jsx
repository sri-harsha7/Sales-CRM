import React from "react";
import styles from "./Filter.module.css";
import { LuSettings2 } from "react-icons/lu";

const Filter = () => {
  return (
    <div className={styles.filter}>
      <div className={styles.icon}>
        <LuSettings2 />
      </div>
    </div>
  );
};

export default Filter;
