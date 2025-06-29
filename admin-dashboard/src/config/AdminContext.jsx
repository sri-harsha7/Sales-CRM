// // src/context/AdminContext.jsx
// import { useEffect } from "react";
// import { createContext, useContext, useState } from "react";

// const AdminContext = createContext();

// const URL = import.meta.env.VITE_BACKEND_URL;

// export const AdminProvider = ({ children }) => {
//   const [employees, setEmployees] = useState([]);
//   const [addEmployee, setAddEmployee] = useState([]);

//   const AddEmployee = async (newEmployee) => {
//     try {
//       const response = await fetch(`${URL}/auth/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newEmployee),
//       });
//       const data = await response.json();
//       setAddEmployee(data);
//     } catch (error) {
//       console.error("Error adding employee:", error);
//     }
//   };

//   const fetchEmployees = async () => {
//     try {
//       const response = await fetch(`${URL}/employee`);
//       const data = await response.json();
//       setEmployees(data);
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const deleteEmployee = (id) => {
//     setEmployees((prev) => prev.filter((emp) => emp.id !== id));
//   };

//   // const addEmployee = (newEmployee) => {
//   //   setEmployees((prev) => {
//   //     const exists = prev.find((emp) => emp.id === newEmployee.id);
//   //     if (exists) {
//   //       return prev.map((emp) =>
//   //         emp.id === newEmployee.id ? newEmployee : emp
//   //       );
//   //     }
//   //     return [newEmployee, ...prev];
//   //   });
//   // };

//   return (
//     <AdminContext.Provider
//       value={{ employees, addEmployee, deleteEmployee, AddEmployee }}
//     >
//       {children}
//     </AdminContext.Provider>
//   );
// };

// export const useAdminContext = () => useContext(AdminContext);

import { useEffect, useState, createContext, useContext } from "react";

const AdminContext = createContext();

const URL = import.meta.env.VITE_BACKEND_URL;

export const AdminProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [admins, setAdmins] = useState([]);

  // Fetch all employees from the backend
  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${URL}/employee`);
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Add new employee or update existing employee profile
  const addEmployee = async (employeeData) => {
    try {
      const response = await fetch(`${URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      const result = await response.json();

      if (response.ok) {
        // Add to local state
        const updatedList = employees.map((emp) =>
          emp.email === result.employee.email ? result.employee : emp
        );

        const emailExists = employees.some(
          (emp) => emp.email === result.employee.email
        );

        if (emailExists) {
          setEmployees(updatedList);
        } else {
          setEmployees((prev) => [...prev, result.employee]);
        }
      } else {
        console.error("Error:", result.message);
      }
    } catch (error) {
      console.error("Error adding/updating employee:", error);
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await fetch(`${URL}/admin`);
      const data = await response.json();
      setAdmins(data[0]);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  console.log(admins);
  // Delete employee from local state only
  const deleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp._id !== id));
    // Optionally: Make a DELETE API request here
  };

  useEffect(() => {
    fetchEmployees();
    fetchAdmins();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        employees,
        addEmployee,
        deleteEmployee,
        admins,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
