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

  //deleteLeads from Server

  const deleteLead = async (batchName) => {
    try {
      await fetch(`${URL}/leads/batches/${encodeURIComponent(batchName)}`, {
        method: "DELETE",
      });
      setLeads((prev) => prev.filter((lead) => lead.name !== batchName));
    } catch (err) {
      console.error("Error deleting lead batch:", err);
    }
  };

  // Delete employee from local state only

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
      value={{
        employees,
        addEmployee,
        deleteEmployee,
        admins,
        leads,
        deleteLead,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
