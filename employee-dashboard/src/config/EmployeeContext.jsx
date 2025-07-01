// import { createContext, useContext, useEffect, useState } from "react";

// const EmployeeContext = createContext();
// const URL = import.meta.env.VITE_BACKEND_URL;

// export const EmployeeProvider = ({ children }) => {
//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     const stored = localStorage.getItem("employee");
//     if (stored) setEmployees([JSON.parse(stored)]);
//   }, []);

//   const fetchLogin = async ({ email, password }) => {
//     try {
//       const res = await fetch(`${URL}/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setEmployees([data.employee]);
//         localStorage.setItem("employee", JSON.stringify(data.employee));
//         await checkIn(data.employee.email);
//         return { success: true, employee: data.employee };
//       } else {
//         return { success: false, message: data.message };
//       }
//     } catch (error) {
//       return { success: false, message: "Network error", error };
//     }
//   };

//   // const refreshEmployee = async (email) => {
//   //   try {
//   //     const res = await fetch(`${URL}/employee/${email}`);
//   //     const data = await res.json();
//   //     if (res.ok) {
//   //       setEmployees([data.employee]);
//   //       localStorage.setItem("employee", JSON.stringify(data.employee));
//   //     }
//   //   } catch (e) {
//   //     console.error("Refresh error", e);
//   //   }
//   // };

//   const checkIn = async (email) => {
//     try {
//       await fetch(`${URL}/employee/checkin`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });
//     } catch (err) {
//       console.error("Check-in error", err);
//     }
//   };

//   const checkOut = async (email) => {
//     try {
//       await fetch(`${URL}/employee/checkout`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });
//       localStorage.removeItem("employee");
//       setEmployees([]);
//     } catch (err) {
//       console.error("Check-out error", err);
//     }
//   };

//   const logout = async () => {
//     const email = employees[0]?.email;
//     if (email) {
//       await checkOut(email);
//     } else {
//       localStorage.removeItem("employee");
//       setEmployees([]);
//     }
//   };

//   const startBreak = async (email) => {
//     try {
//       await fetch(`${URL}/employee/break/start`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });
//     } catch (err) {
//       console.error("Break start error", err);
//     }
//   };

//   const endBreak = async (email) => {
//     try {
//       await fetch(`${URL}/employee/break/end`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });
//     } catch (err) {
//       console.error("Break end error", err);
//     }
//   };

//   useEffect(() => {
//     const email = employees[0]?.email;
//     if (!email) return;

//     const handleVisibility = () => {
//       if (document.hidden) {
//         startBreak(email);
//       } else {
//         endBreak(email);
//       }
//     };

//     const handleBeforeUnload = () => {
//       navigator.sendBeacon(
//         `${URL}/employee/break/start`,
//         JSON.stringify({ email })
//       );
//     };

//     document.addEventListener("visibilitychange", handleVisibility);
//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibility);
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [employees]);

//   return (
//     <EmployeeContext.Provider
//       value={{
//         employees,
//         fetchLogin,
//         checkOut,

//         logout,
//       }}
//     >
//       {children}
//     </EmployeeContext.Provider>
//   );
// };

// export const useEmployeeContext = () => useContext(EmployeeContext);

import { createContext, useContext, useEffect, useState } from "react";

const EmployeeContext = createContext();
const URL = import.meta.env.VITE_BACKEND_URL;

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [assignedLeads, setAssignedLeads] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("employee");
    if (stored) setEmployees([JSON.parse(stored)]);
  }, []);

  const fetchLogin = async ({ email, password }) => {
    try {
      const res = await fetch(`${URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setEmployees([data.employee]);
        localStorage.setItem("employee", JSON.stringify(data.employee));
        await checkIn(data.employee.email);
        return { success: true, employee: data.employee };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: "Network error", error };
    }
  };

  const checkIn = async (email) => {
    try {
      await fetch(`${URL}/employee/checkin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch (err) {
      console.error("Check-in error", err);
    }
  };

  const checkOut = async (email) => {
    try {
      await fetch(`${URL}/employee/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      localStorage.removeItem("employee");
      setEmployees([]);
    } catch (err) {
      console.error("Check-out error", err);
    }
  };

  const logout = async () => {
    const email = employees[0]?.email;
    if (email) {
      await checkOut(email);
    } else {
      localStorage.removeItem("employee");
      setEmployees([]);
    }
  };

  const startBreak = async (email) => {
    try {
      await fetch(`${URL}/employee/break/start`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch (err) {
      console.error("Break start error", err);
    }
  };

  const endBreak = async (email) => {
    try {
      await fetch(`${URL}/employee/break/end`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch (err) {
      console.error("Break end error", err);
    }
  };

  const fetchAssignedLeads = async () => {
    try {
      const res = await fetch(`${URL}/leads`);
      const allLeads = await res.json();

      console.log("🔍 All leads from backend:", allLeads);

      const employeeId = employees[0]?._id;
      console.log("👤 Logged in employeeId:", employeeId);

      const filtered = allLeads.filter(
        (lead) => lead.assignedTo?._id === employeeId
      );

      console.log("✅ Filtered assigned leads:", filtered);

      setAssignedLeads(filtered);
    } catch (err) {
      console.error("❌ Error fetching employee leads:", err);
    }
  };

  useEffect(() => {
    const email = employees[0]?.email;
    if (!email) return;

    const handleVisibility = () => {
      if (document.hidden) {
        startBreak(email);
      } else {
        endBreak(email);
      }
    };

    const handleBeforeUnload = () => {
      navigator.sendBeacon(
        `${URL}/employee/break/start`,
        JSON.stringify({ email })
      );
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [employees]);

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        fetchLogin,
        checkOut,
        logout,
        assignedLeads,
        fetchAssignedLeads,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => useContext(EmployeeContext);
