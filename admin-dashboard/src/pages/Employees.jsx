import React, { useState } from "react";
import Styles from "./Employees.module.css";
import EmployeeTable from "../components/employeeComponents/EmployeeTable";
import AddEmployee from "../components/employeeComponents/AddEmployee";
import { useAdminContext } from "../config/AdminContext";

const Employees = () => {
  const { employees, addEmployee, deleteEmployee } = useAdminContext();
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleEdit = (employee) => {
    setEditData(employee);
    setShowModal(true);
  };

  const handleDelete = async (_id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/employee/${_id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        deleteEmployee(_id);
      } else {
        console.error("❌ Failed to delete employee");
      }
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setEditData(null);
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
        <EmployeeTable
          data={employees}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {showModal && (
        <AddEmployee
          onClose={handleClose}
          onAdd={addEmployee}
          editData={editData}
        />
      )}
    </div>
  );
};

export default Employees;
