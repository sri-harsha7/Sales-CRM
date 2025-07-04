import React, { useEffect, useState } from "react";
import styles from "./Schedule.module.css";
import Header from "../components/Header";
import { FaMapMarkerAlt } from "react-icons/fa";
import SearchBar from "../components/SearchBar";
import { useEmployeeContext } from "../config/EmployeeContext";

const Schedule = () => {
  const { employees, assignedLeads, fetchAssignedLeads } = useEmployeeContext();
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    if (employees.length > 0) {
      fetchAssignedLeads();
    }
  }, [employees]);

  useEffect(() => {
    console.log("🧪 Assigned Leads from context:", assignedLeads);

    const enriched = assignedLeads.map((lead, idx) => ({
      type: lead.type || "Warm",
      phone: lead.phone || "N/A",
      mode: "Call",
      name: lead.name || "Unnamed",
      date: lead.date || "Not Scheduled",
      image:
        lead.image ||
        `https://randomuser.me/api/portraits/${
          idx % 2 === 0 ? "men" : "women"
        }/${30 + idx}.jpg`,
      highlight: idx === 0,
    }));

    setSchedules(enriched);
  }, [assignedLeads]);

  return (
    <div className={styles.container}>
      <Header page="Schedule" />

      <div className={styles.searchContainer}>
        <SearchBar />
      </div>

      <div className={styles.scheduleList}>
        {schedules.length === 0 ? (
          <p style={{ padding: "1rem", color: "#888" }}>
            No leads scheduled yet.
          </p>
        ) : (
          schedules.map((item, index) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default Schedule;
