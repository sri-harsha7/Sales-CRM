import { createContext, useContext, useEffect, useState } from "react";

const EmployeeContext = createContext();
const URL = import.meta.env.VITE_BACKEND_URL;

export const EmployeeProvider = ({ children }) => {
  const [employee, setEmployee] = useState(null); // Current logged-in employee
  const [leads, setLeads] = useState([]);
  const [activities, setActivities] = useState([]);
  const [calls, setCalls] = useState([]);
  const [attendance, setAttendance] = useState({});

  const fetchEmployeeDashboard = async () => {
    try {
      const res = await fetch(`${URL}/employee/dashboard`, {
        credentials: "include",
      });
      const data = await res.json();
      setEmployee(data.employee);
      setLeads(data.leads);
      setActivities(data.activities);
      setCalls(data.calls);
      setAttendance(data.attendance);
    } catch (err) {
      console.error("Failed to load dashboard:", err);
    }
  };

  useEffect(() => {
    fetchEmployeeDashboard();
  }, []);

  return (
    <EmployeeContext.Provider
      value={{ employee, leads, activities, calls, attendance }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => useContext(EmployeeContext);
