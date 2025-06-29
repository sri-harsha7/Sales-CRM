import React from "react";
import styles from "./Table.module.css";
import { useAdminContext } from "../config/AdminContext";

const Table = () => {
  const { employees } = useAdminContext();
  const data = employees;
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Assigned Leads</th>
            <th>Closed Leads</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data.map((emp) => (
            <tr key={emp.id}>
              <td>
                <div className={styles.nameEmail}>
                  <div className={styles.avatar}>{emp.firstName.charAt(0)}</div>
                  <div>
                    <div className={styles.fullName}>
                      <div className={styles.name}>{emp.firstName}</div>
                      <div className={styles.name}>{emp.lastName}</div>
                    </div>
                    <div>
                      <div className={styles.email}>{emp.email}</div>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                {"#"}
                {emp._id.trim().slice(0, 7)}
              </td>
              <td>{emp.assignedLeads}</td>
              <td>{emp.closedLeads}</td>
              <td>
                <span className={styles.activeDot} /> {emp.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
