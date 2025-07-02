import styles from "./Settings.module.css";
import { useAdminContext } from "../config/AdminContext";
import toast from "react-hot-toast";
const Settings = () => {
  const { admins } = useAdminContext();
  const data = admins;
  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Profile Updated Successfully");
  };

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
          <form onSubmit={handleSave}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              placeholder="First Name"
              value={data.firstName}
              readOnly
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              value={data.lastName}
              readOnly
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={data.email}
              readOnly
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={data.password}
              readOnly
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={data.confirmPassword}
              readOnly
            />
            <div className={styles.button}>
              <button type="submit" className={styles.saveBtn}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
