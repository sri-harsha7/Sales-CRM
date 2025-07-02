import React, { useState } from "react";
import styles from "./EmployeeTable.module.css";

const EmployeeTable = ({ data, onEdit, onDelete }) => {
  const [dropdownOpenId, setDropdownOpenId] = useState(null);

  const toggleDropdown = (id) => {
    setDropdownOpenId((prev) => (prev === id ? null : id));
  };

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
          {Object.values(data).map((emp) => (
            <tr key={emp._id} className={styles.row}>
              <td>
                <div className={styles.nameEmail}>
                  <div className={styles.avatar}>{emp.firstName.charAt(0)}</div>
                  <div>
                    <div className={styles.fullName}>
                      <div className={styles.name}>{emp.firstName}</div>
                      <div className={styles.name}>{emp.lastName}</div>
                    </div>
                    <div className={styles.email}>{emp.email}</div>
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
                <span
                  className={`${styles.statusDot} ${
                    emp.status === "Active" ? styles.active : styles.inactive
                  }`}
                ></span>
                {emp.status}
              </td>
              <td className={styles.actions}>
                <button
                  className={styles.moreBtn}
                  onClick={() => toggleDropdown(emp._id)}
                >
                  ⋯
                </button>
                {dropdownOpenId === emp._id && (
                  <div className={styles.edit}>
                    <button onClick={() => onEdit(emp)}>✏️ Edit</button>
                    <button onClick={() => onDelete(emp._id)}>🗑 Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
