// import styles from "./Dashboard.module.css";
// import logo from "../assets/logo.png";
// import { useEmployeeContext } from "../config/EmployeeContext";
// import { useEffect, useState } from "react";

// const Dashboard = () => {
//   const { employees, refreshEmployee } = useEmployeeContext();
//   const employee = employees[0];

//   const [status, setStatus] = useState("Active");

//   useEffect(() => {
//     const interval = setInterval(() => {
//       refreshEmployee();
//     }, 10000); // refresh every 10 sec

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (employee?.status) setStatus(employee.status);
//   }, [employee]);

//   if (!employee) return <p style={{ textAlign: "center" }}>Loading...</p>;

//   const formatTime = (str) =>
//     str
//       ? new Date(str).toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         })
//       : "--I--";

//   const formatDate = (str) =>
//     str ? new Date(str).toLocaleDateString() : "--/--/----";

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <img src={logo} alt="logo" />
//         <div className={styles.greeting}>
//           <p>Good Morning</p>
//           <h1>
//             {employee.firstName} {employee.lastName}
//           </h1>
//         </div>
//       </div>

//       <div className={styles.content}>
//         <h2>Timings</h2>
//         <div className={styles.timings}>
//           <div>
//             <p>Check In</p>
//             <h4>{formatTime(employee.checkInTime)}</h4>
//           </div>
//           <div>
//             <p>Check Out</p>
//             <h4>{formatTime(employee.checkOutTime)}</h4>
//           </div>
//           <div>
//             <p>Status</p>
//             <h4
//               style={{
//                 color: status === "Active" ? "green" : "red",
//                 fontWeight: "bold",
//               }}
//             >
//               {status}
//             </h4>
//           </div>
//         </div>

//         <h2>Break</h2>
//         <div className={styles.break}>
//           {employee.breaks && employee.breaks.length ? (
//             employee.breaks.map((brk, i) => (
//               <div key={i} className={styles.breakDetails}>
//                 <div className={styles.breakTime}>
//                   <div>
//                     <p>Break</p>
//                     <h4>{formatTime(brk.start)}</h4>
//                   </div>
//                   <div>
//                     <p>Ended</p>
//                     <h4>{formatTime(brk.end)}</h4>
//                   </div>
//                 </div>
//                 <div className={styles.breakDate}>
//                   <p>Date</p>
//                   <h4>{formatDate(brk.start)}</h4>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p style={{ opacity: 0.6 }}>No breaks recorded</p>
//           )}
//         </div>

//         <h2>Recent Activity</h2>
//         <div className={styles.activity}>
//           <ul>
//             <li>Assigned lead "Ravi Kumar" - 1 hour ago</li>
//             <li>Closed deal with "Infosys" - 3 hours ago</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import styles from "./Dashboard.module.css";
import logo from "../assets/logo.png";
import { useEmployeeContext } from "../config/EmployeeContext";

const Dashboard = () => {
  const { employees } = useEmployeeContext();
  const employee = employees[0];

  const status = employee?.status || "Inactive";

  if (!employee) return <p style={{ textAlign: "center" }}>Loading...</p>;

  const formatTime = (str) =>
    str
      ? new Date(str).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : "--I--";

  const formatDate = (str) =>
    str ? new Date(str).toLocaleDateString() : "--/--/----";

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={logo} alt="logo" />
        <div className={styles.greeting}>
          <p>Good Morning</p>
          <h1>
            {employee.firstName} {employee.lastName}
          </h1>
        </div>
      </div>

      <div className={styles.content}>
        <h2>Timings</h2>
        <div className={styles.timings}>
          <div>
            <p>Check In</p>
            <h4>{formatTime(employee.checkInTime)}</h4>
          </div>
          <div>
            <p>Check Out</p>
            <h4>{formatTime(employee.checkOutTime)}</h4>
          </div>
          <div>
            <p>Status</p>
            <h4
              style={{
                color: status === "Active" ? "green" : "red",
                fontWeight: "bold",
              }}
            >
              {status}
            </h4>
          </div>
        </div>

        <h2>Break</h2>
        <div className={styles.break}>
          {employee.breaks && employee.breaks.length ? (
            employee.breaks.map((brk, i) => (
              <div key={i} className={styles.breakDetails}>
                <div className={styles.breakTime}>
                  <div>
                    <p>Break</p>
                    <h4>{formatTime(brk.start)}</h4>
                  </div>
                  <div>
                    <p>Ended</p>
                    <h4>{formatTime(brk.end)}</h4>
                  </div>
                </div>
                <div className={styles.breakDate}>
                  <p>Date</p>
                  <h4>{formatDate(brk.start)}</h4>
                </div>
              </div>
            ))
          ) : (
            <p style={{ opacity: 0.6 }}>No breaks recorded</p>
          )}
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
