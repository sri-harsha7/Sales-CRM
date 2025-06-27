// src/pages/Dashboard.jsx
import React from "react";
import styles from "./Dashboard.module.css";
import logo from "../assets/logo.png";
// const Date = new Date().toLocaleString();
const Dashboard = () => {
  const employeeName = "John Doe";

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={logo} alt="" />
        <div className={styles.greeting}>
          <p>Good Morning</p>
          <h1>{employeeName}</h1>
        </div>
      </div>
      <div className={styles.content}>
        <h2>Timings</h2>
        <div className={styles.timings}>
          <div>
            <p>Check In</p>
            <h4>9:00 AM</h4>
          </div>
          <div>
            <p>Check Out</p>
            <h4>5:00 PM</h4>
          </div>
        </div>
        <h2>Break</h2>
        <div className={styles.break}>
          <div className={styles.breakDetails}>
            <div className={styles.breakTime}>
              <div>
                <p>Break</p>
                <h4>01:25 pm</h4>
              </div>
              <div>
                <p>Ended</p>
                <h4>01:50 pm</h4>
              </div>
            </div>
            <div className={styles.breakDate}>
              <p>Date</p>
              <h4>01/01/2023</h4>
            </div>
          </div>
          <div className={styles.breakDetails}>
            <div className={styles.breakTime}>
              <div>
                <p>Break</p>
                <h4>01:25 pm</h4>
              </div>
              <div>
                <p>Ended</p>
                <h4>01:50 pm</h4>
              </div>
            </div>
            <div className={styles.breakDate}>
              <p>Date</p>
              <h4>01/01/2023</h4>
            </div>
          </div>
          <div className={styles.breakDetails}>
            <div className={styles.breakTime}>
              <div>
                <p>Break</p>
                <h4>01:25 pm</h4>
              </div>
              <div>
                <p>Ended</p>
                <h4>01:50 pm</h4>
              </div>
            </div>
            <div className={styles.breakDate}>
              <p>Date</p>
              <h4>01/01/2023</h4>
            </div>
          </div>
          <div className={styles.breakDetails}>
            <div className={styles.breakTime}>
              <div>
                <p>Break</p>
                <h4>01:25 pm</h4>
              </div>
              <div>
                <p>Ended</p>
                <h4>01:50 pm</h4>
              </div>
            </div>
            <div className={styles.breakDate}>
              <p>Date</p>
              <h4>01/01/2023</h4>
            </div>
          </div>
        </div>
        <h2>Recent Activity</h2>
        <div className={styles.activity}>
          <ul>
            <li>Assigned lead "Ravi Kumar" - 1 hour ago</li>
            <li>Closed deal with "Infosys" - 3 hours ago</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
