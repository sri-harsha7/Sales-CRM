import React from "react";
import styles from "./Schedule.module.css";
import Header from "../components/Header";
import { FaSearch, FaSlidersH, FaMapMarkerAlt } from "react-icons/fa";
import SearchBar from "../components/SearchBar";

const schedules = [
  {
    type: "Referral",
    phone: "949-365-6533",
    mode: "Call",
    name: "Brooklyn Williamson",
    date: "10/04/25",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    highlight: true,
  },
  {
    type: "Referral",
    phone: "365-865-8854",
    mode: "Call",
    name: "Julie Watson",
    date: "10/04/25",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    type: "Cold call",
    phone: "654-692-8895",
    mode: "Call",
    name: "Jenny Alexander",
    date: "10/04/25",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const Schedule = () => {
  return (
    <div className={styles.container}>
      <Header page="Schedule" />

      <div className={styles.searchContainer}>
        <SearchBar></SearchBar>
      </div>

      <div className={styles.scheduleList}>
        {schedules.map((item, index) => (
          <div
            key={index}
            className={`${styles.card} ${
              item.highlight ? styles.highlight : ""
            }`}
          >
            <div className={styles.cardLeft}>
              <p className={styles.type}>{item.type}</p>
              <p className={styles.phone}>{item.phone}</p>
              <div className={styles.row}>
                <FaMapMarkerAlt className={styles.icon} />
                <span>{item.mode}</span>
              </div>
              <div className={styles.row}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.avatar}
                />
                <span>{item.name}</span>
              </div>
            </div>
            <div className={styles.cardRight}>
              <span className={styles.dateLabel}>Date</span>
              <span className={styles.date}>{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
