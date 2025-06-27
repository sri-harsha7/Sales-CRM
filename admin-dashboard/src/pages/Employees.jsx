import React, { useState } from "react";
import Styles from "./Employees.module.css";
import EmployeeTable from "../components/employeeComponents/EmployeeTable";
import AddEmployee from "../components/employeeComponents/AddEmployee";

const Employees = () => {
  const [employees, setEmployees] = useState([
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
  ]);

  const [showModal, setShowModal] = useState(false);

  // 🟢 This function properly adds the new employee to the list
  const handleAdd = (newEmployee) => {
    setEmployees((prev) => [newEmployee, ...prev]);
  };

  return (
    <div className={Styles.employees}>
      <div className={Styles.header}>
        <h1 className={Styles.title}>Home &gt; Employees</h1>
        <button className={Styles.addButton} onClick={() => setShowModal(true)}>
          Add Employee
        </button>
      </div>

      <div className={Styles.tableContainer}>
        <EmployeeTable data={employees} />
      </div>

      {showModal && (
        <AddEmployee onClose={() => setShowModal(false)} onAdd={handleAdd} />
      )}
    </div>
  );
};

export default Employees;
