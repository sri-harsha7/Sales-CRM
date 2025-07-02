import React, { useState, useEffect } from "react";
import styles from "./Leads.module.css";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { useEmployeeContext } from "../config/EmployeeContext";
import { FaCalendarAlt, FaPen, FaClock, FaCheck } from "react-icons/fa";

const Leads = () => {
  const { employees, assignedLeads, fetchAssignedLeads } = useEmployeeContext();

  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [openDateIndex, setOpenDateIndex] = useState(null);
  const [openStatusIndex, setOpenStatusIndex] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [leads, setLeads] = useState([]);

  const URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (employees.length > 0) {
      fetchAssignedLeads();
    }
  }, [employees]);

  useEffect(() => {
    setLeads(
      assignedLeads.map((lead) => ({
        ...lead,
        date: lead.date || "",
        time: lead.time || "",
        error: "",
        type: lead.type || "Warm",
      }))
    );
  }, [assignedLeads]);

  const handleSaveDateTime = async (index) => {
    const updated = [...leads];
    const { _id, date, time } = updated[index];

    try {
      const res = await fetch(`${URL}/leads/${_id}/schedule`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time }),
      });

      if (res.ok) {
        updated[index].error = "";
        setOpenDateIndex(null);
        fetchAssignedLeads(); // Refresh assigned leads
      } else {
        const data = await res.json();
        updated[index].error = data.message || "Update failed";
      }
    } catch {
      updated[index].error = "Network error";
    }

    setLeads(updated);
  };

  const handleSaveStatus = async (index) => {
    const updated = [...leads];
    const { _id } = updated[index];

    if (
      selectedStatus === "Closed" &&
      (updated[index].date || updated[index].time)
    ) {
      updated[index].error = "Lead cannot be closed if scheduled";
    } else {
      try {
        const res = await fetch(`${URL}/leads/${_id}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: selectedStatus }),
        });

        if (res.ok) {
          updated[index].status = selectedStatus;
          updated[index].error = "";
          setOpenStatusIndex(null);
        } else {
          const data = await res.json();
          updated[index].error = data.message || "Update failed";
        }
      } catch {
        updated[index].error = "Network error";
      }
    }

    setLeads(updated);
  };

  const handleTypeChange = async (index, newType) => {
    const updated = [...leads];
    const { _id } = updated[index];

    try {
      const res = await fetch(`${URL}/leads/${_id}/type`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: newType }),
      });

      if (res.ok) {
        updated[index].type = newType;
        setOpenDropdownIndex(null);
      }
    } catch (err) {
      console.error("Error updating type:", err);
    }

    setLeads(updated);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header page="Leads" />
      </div>
      <div className={styles.searchContainer}>
        <SearchBar />
      </div>

      <div className={styles.leadsList}>
        {leads.map((lead, i) => (
          <div className={styles.card} key={i}>
            <div
              className={`${styles.sideBar} ${
                styles[lead.status?.toLowerCase()]
              }`}
            ></div>

            <div className={styles.details}>
              <h3>{lead.name}</h3>
              <p className={styles.email}>@{lead.email}</p>
              <p className={styles.dateLabel}>Scheduled Date</p>
              <p
                className={styles.date}
                onClick={() => setOpenDateIndex(openDateIndex === i ? null : i)}
              >
                <FaCalendarAlt /> {lead.date || "Not Set"}
              </p>

              {openDateIndex === i && (
                <div className={styles.dateTimePopup}>
                  <label>Date</label>
                  <input
                    type="date"
                    value={lead.date}
                    onChange={(e) => {
                      const updated = [...leads];
                      updated[i].date = e.target.value;
                      setLeads(updated);
                    }}
                  />
                  <label>Time</label>
                  <input
                    type="time"
                    value={lead.time}
                    onChange={(e) => {
                      const updated = [...leads];
                      updated[i].time = e.target.value;
                      setLeads(updated);
                    }}
                  />
                  <button onClick={() => handleSaveDateTime(i)}>Save</button>
                </div>
              )}
            </div>

            <div className={styles.statusSection}>
              <div
                className={`${styles.statusCircle} ${
                  styles[`${lead.status?.toLowerCase()}Circle`]
                }`}
              >
                {lead.status}
              </div>

              <div className={styles.actions}>
                {/* Type Selector */}
                <div
                  className={styles.icon}
                  onClick={() =>
                    setOpenDropdownIndex(openDropdownIndex === i ? null : i)
                  }
                >
                  <FaPen />
                  {openDropdownIndex === i && (
                    <div className={styles.typeDropdown}>
                      {["Hot", "Warm", "Cold"].map((type) => (
                        <div
                          key={type}
                          className={styles[type.toLowerCase()]}
                          onClick={() => handleTypeChange(i, type)}
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* FaClock behaves like FaCalendarAlt */}
                <div
                  className={styles.icon}
                  onClick={() =>
                    setOpenDateIndex(openDateIndex === i ? null : i)
                  }
                >
                  <FaClock />
                </div>

                {/* Status Selector */}
                <div
                  className={styles.icon}
                  onClick={() => {
                    setOpenStatusIndex(openStatusIndex === i ? null : i);
                    setSelectedStatus(lead.status);
                  }}
                >
                  <FaCheck />
                  {openStatusIndex === i && (
                    <form
                      className={styles.statusPopup}
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <label>Lead Status</label>
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                      >
                        <option value="Ongoing">Ongoing</option>
                        <option value="Closed">Closed</option>
                      </select>

                      {lead.error && (
                        <div className={styles.errorText}>{lead.error}</div>
                      )}

                      <button onClick={() => handleSaveStatus(i)}>Save</button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leads;
