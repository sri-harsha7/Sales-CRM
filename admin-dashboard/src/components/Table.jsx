import React from "react";
import styles from "./Table.module.css";

const data = [
  {
    id: 1,
    name: "Tanner Finsha",
    email: "Tannerfisher@gmail.com",
    employeeId: "#23454GH6JYT6",
    assignedLeads: 5,
    closedLeads: 2,
    status: "Active",
  },
  {
    id: 2,
    name: "Emeto Winner",
    email: "Emetowinner@gmail.com",
    employeeId: "#23454GH6JYT6",
    assignedLeads: 3,
    closedLeads: 1,
    status: "Active",
  },
  {
    id: 3,
    name: "Tassy Omah",
    email: "Tassyomah@gmail.com",
    employeeId: "#23454GH6JYT6",
    assignedLeads: 6,
    closedLeads: 4,
    status: "Active",
  },
];

const Table = () => {
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
                  <div className={styles.avatar}>{emp.name.charAt(0)}</div>
                  <div>
                    <div className={styles.name}>{emp.name}</div>
                    <div className={styles.email}>{emp.email}</div>
                  </div>
                </div>
              </td>
              <td>{emp.employeeId}</td>
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
