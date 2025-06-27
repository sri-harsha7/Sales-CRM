import React from "react";
import styles from "./EmployeeTable.module.css";

const EmployeeTable = ({ data }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Assigned Leads</th>
            <th>Closed Leads</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((emp) => (
            <tr key={emp.id} className={styles.row}>
              <td>
                <div className={styles.nameEmail}>
                  <div className={styles.avatar}>{emp.name.charAt(0)}</div>
                  <div>
                    <div className={styles.name}>{emp.name}</div>
                    <div className={styles.email}>{emp.email}</div>
                  </div>
                </div>
              </td>
              <td className={styles.employeeId}>{emp.employeeId}</td>
              <td>{emp.assignedLeads}</td>
              <td>{emp.closedLeads}</td>
              <td>
                <span className={`${styles.statusDot} ${styles.active}`}></span>{" "}
                Active
              </td>
              <td>
                <button className={styles.moreBtn}>⋯</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
