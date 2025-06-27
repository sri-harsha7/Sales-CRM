import React from "react";
import styles from "./Card.module.css";

const Card = ({ icon, value, content }) => {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.content}>
        <p>{content}</p>
        <h2>{value}</h2>
      </div>
    </div>
  );
};

export default Card;
