import React from "react";
import styles from "./Settings.module.css";

const Settings = () => {
  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settings}>
        <div>
          <h2>Home {">"} Settings</h2>
        </div>
        <div className={styles.edit}>
          <p>Edit Profile</p>
        </div>
        <div className={styles.form}>
          <form action="" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" placeholder="First Name" />
            <label htmlFor="lastName">Last Name</label>
            <input type="text" placeholder="Last Name" />
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Email" />
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" placeholder="Confirm Password" />
            <div className={styles.button}>
              <button className={styles.saveBtn}>Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
