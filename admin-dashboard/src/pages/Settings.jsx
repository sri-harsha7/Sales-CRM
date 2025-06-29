// import React from "react";
// import styles from "./Settings.module.css";
// import toast from "react-hot-toast";
// const Settings = () => {
//   const [data, setData] = React.useState([
//     {
//       id: 1,
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//   ]);

//   const handleSave = (e) => {
//     e.preventDefault();
//     toast.success("Profile Updated Successfully");
//   };

//   return (
//     <div className={styles.settingsContainer}>
//       <div className={styles.settings}>
//         <div>
//           <h2>Home {">"} Settings</h2>
//         </div>
//         <div className={styles.edit}>
//           <p>Edit Profile</p>
//         </div>
//         <div className={styles.form}>
//           <form action="" onSubmit={handleSave}>
//             <label htmlFor="firstName">First Name</label>
//             <input
//               type="text"
//               placeholder="First Name"
//               value={data.firstName}
//               onChange={(e) => setData({ ...data, firstName: e.target.value })}
//             />
//             <label htmlFor="lastName">Last Name</label>
//             <input
//               type="text"
//               placeholder="Last Name"
//               value={data.lastName}
//               onChange={(e) => setData({ ...data, lastName: e.target.value })}
//             />
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               placeholder="Email"
//               value={data.email}
//               onChange={(e) => setData({ ...data, email: e.target.value })}
//             />
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               placeholder="Password"
//               value={data.password}
//               onChange={(e) => setData({ ...data, password: e.target.value })}
//             />
//             <label htmlFor="confirmPassword">Confirm Password</label>
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               value={data.confirmPassword}
//               onChange={(e) =>
//                 setData({ ...data, confirmPassword: e.target.value })
//               }
//             />
//             <div className={styles.button}>
//               <button className={styles.saveBtn}>Save</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Settings;

// src/components/settings/Settings.jsx

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
