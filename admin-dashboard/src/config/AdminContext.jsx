// // // src/context/AdminContext.jsx
// // import { useEffect } from "react";
// // import { createContext, useContext, useState } from "react";

// // const AdminContext = createContext();

// // const URL = import.meta.env.VITE_BACKEND_URL;

// // export const AdminProvider = ({ children }) => {
// //   const [employees, setEmployees] = useState([]);
// //   const [addEmployee, setAddEmployee] = useState([]);

// //   const AddEmployee = async (newEmployee) => {
// //     try {
// //       const response = await fetch(`${URL}/auth/register`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(newEmployee),
// //       });
// //       const data = await response.json();
// //       setAddEmployee(data);
// //     } catch (error) {
// //       console.error("Error adding employee:", error);
// //     }
// //   };

// //   const fetchEmployees = async () => {
// //     try {
// //       const response = await fetch(`${URL}/employee`);
// //       const data = await response.json();
// //       setEmployees(data);
// //     } catch (error) {
// //       console.error("Error fetching employees:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchEmployees();
// //   }, []);

// //   const deleteEmployee = (id) => {
// //     setEmployees((prev) => prev.filter((emp) => emp.id !== id));
// //   };

// //   // const addEmployee = (newEmployee) => {
// //   //   setEmployees((prev) => {
// //   //     const exists = prev.find((emp) => emp.id === newEmployee.id);
// //   //     if (exists) {
// //   //       return prev.map((emp) =>
// //   //         emp.id === newEmployee.id ? newEmployee : emp
// //   //       );
// //   //     }
// //   //     return [newEmployee, ...prev];
// //   //   });
// //   // };

// //   return (
// //     <AdminContext.Provider
// //       value={{ employees, addEmployee, deleteEmployee, AddEmployee }}
// //     >
// //       {children}
// //     </AdminContext.Provider>
// //   );
// // };

// // export const useAdminContext = () => useContext(AdminContext);

// import { useEffect, useState, createContext, useContext } from "react";

// const AdminContext = createContext();

// const URL = import.meta.env.VITE_BACKEND_URL;

// export const AdminProvider = ({ children }) => {
//   const [employees, setEmployees] = useState([]);
//   const [admins, setAdmins] = useState([]);
//   const [leads, setLeads] = useState([]);

//   // Fetch all employees from the backend
//   const fetchEmployees = async () => {
//     try {
//       const response = await fetch(`${URL}/employee`);
//       const data = await response.json();
//       setEmployees(data);
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//     }
//   };

//   // Add new employee or update existing employee profile
//   const addEmployee = async (employeeData) => {
//     try {
//       const response = await fetch(`${URL}/auth/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(employeeData),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         // Add to local state
//         const updatedList = employees.map((emp) =>
//           emp.email === result.employee.email ? result.employee : emp
//         );

//         const emailExists = employees.some(
//           (emp) => emp.email === result.employee.email
//         );

//         if (emailExists) {
//           setEmployees(updatedList);
//         } else {
//           setEmployees((prev) => [...prev, result.employee]);
//         }
//       } else {
//         console.error("Error:", result.message);
//       }
//     } catch (error) {
//       console.error("Error adding/updating employee:", error);
//     }
//   };

//   const fetchAdmins = async () => {
//     try {
//       const response = await fetch(`${URL}/admin`);
//       const data = await response.json();
//       setAdmins(data[0]);
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//     }
//   };

//   const fetchLeads = async () => {
//     try {
//       const response = await fetch(`${URL}/leads`);
//       const data = await response.json();
//       setLeads(data);
//     } catch (error) {
//       console.error("Error fetching leads:", error);
//     }
//   };

//   console.log(admins);
//   // Delete employee from local state only
//   const deleteEmployee = (id) => {
//     setEmployees((prev) => prev.filter((emp) => emp._id !== id));
//     // Optionally: Make a DELETE API request here
//   };
//   console.log(leads);

//   useEffect(() => {
//     fetchEmployees();
//     fetchAdmins();
//     fetchLeads();
//   }, []);

//   return (
//     <AdminContext.Provider
//       value={{
//         employees,
//         addEmployee,
//         deleteEmployee,
//         admins,
//       }}
//     >
//       {children}
//     </AdminContext.Provider>
//   );
// };

// export const useAdminContext = () => useContext(AdminContext);

// src/context/AdminContext.jsx
import { useEffect, useState, createContext, useContext } from "react";

const AdminContext = createContext();
const URL = import.meta.env.VITE_BACKEND_URL;

export const AdminProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [leads, setLeads] = useState([]);

  const fetchEmployees = async () => {
    try {
      const res = await fetch(`${URL}/employee`);
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  const addEmployee = async (employeeData) => {
    try {
      const res = await fetch(`${URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData),
      });
      const result = await res.json();

      if (res.ok) {
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
    } catch (err) {
      console.error("Error adding/updating employee:", err);
    }
  };

  const fetchAdmins = async () => {
    try {
      const res = await fetch(`${URL}/admin`);
      const data = await res.json();
      setAdmins(data[0]);
    } catch (err) {
      console.error("Error fetching admins:", err);
    }
  };

  const fetchLeads = async () => {
    try {
      const res = await fetch(`${URL}/leads`);
      const data = await res.json();
      setLeads(
        data.map((lead) => {
          let activityType = "added";
          if (lead.status?.toLowerCase() === "closed") activityType = "closed";
          else if (lead.assignedTo) activityType = "assigned";

          return {
            ...lead,
            activityType,
          };
        })
      );
    } catch (err) {
      console.error("Error fetching leads:", err);
    }
  };

  const deleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp._id !== id));
  };

  useEffect(() => {
    fetchEmployees();
    fetchAdmins();
    fetchLeads();
  }, []);

  return (
    <AdminContext.Provider
      value={{ employees, addEmployee, deleteEmployee, admins, leads }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
