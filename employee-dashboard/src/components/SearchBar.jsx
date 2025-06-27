import styles from "./SearchBar.module.css";
import Search from "./Search";

import Filter from "./Filter";

import React from "react";

const SearchBar = () => {
  return (
    <div className={styles.searchBar}>
      <Search />
      <Filter />
    </div>
  );
};

export default SearchBar;
