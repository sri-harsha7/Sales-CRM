// import React, { useState } from "react";
// import styles from "./Leads.module.css";
// import Header from "../components/Header";
// import SearchBar from "../components/SearchBar";

// // React icons
// import { FaCalendarAlt, FaPen, FaClock, FaCheck } from "react-icons/fa";

// const Leads = () => {
//   const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
//   const [openDateIndex, setOpenDateIndex] = useState(null);
//   const [openStatusIndex, setOpenStatusIndex] = useState(null);
//   const [selectedStatus, setSelectedStatus] = useState("");

//   const [leads, setLeads] = useState([
//     {
//       name: "Tanner Finsha",
//       email: "Tannerfisher@gmail.com",
//       status: "Ongoing",
//       date: "",
//       time: "",
//       error: "",
//     },
//     {
//       name: "Tanner Finsha",
//       email: "Tannerfisher@gmail.com",
//       status: "Ongoing",
//       date: "",
//       time: "",
//       error: "",
//     },
//     {
//       name: "Tanner Finsha",
//       email: "Tannerfisher@gmail.com",
//       status: "Closed",
//       date: "",
//       time: "",
//       error: "",
//     },
//   ]);

//   const handleSaveDateTime = () => {
//     setOpenDateIndex(null);
//   };

//   const handleSaveStatus = (index, newStatus) => {
//     const updated = [...leads];
//     const { date, time } = updated[index];

//     if (newStatus === "Closed" && (date || time)) {
//       updated[index].error = "Lead can not be closed if scheduled";
//     } else {
//       updated[index].status = newStatus;
//       updated[index].error = "";
//       setOpenStatusIndex(null);
//     }

//     setLeads(updated);
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.header}>
//         <Header page="Leads" />
//       </div>
//       <div className={styles.searchContainer}>
//         <SearchBar />
//       </div>

//       <div className={styles.leadsList}>
//         {leads.map((lead, i) => (
//           <div className={styles.card} key={i}>
//             <div
//               className={`${styles.sideBar} ${
//                 styles[lead.status.toLowerCase()]
//               }`}
//             ></div>

//             <div className={styles.details}>
//               <h3>{lead.name}</h3>
//               <p className={styles.email}>@{lead.email}</p>
//               <p className={styles.dateLabel}>date</p>
//               <p
//                 className={styles.date}
//                 onClick={() => setOpenDateIndex(openDateIndex === i ? null : i)}
//               >
//                 <FaCalendarAlt /> {lead.date || "Not Set"}
//               </p>

//               {openDateIndex === i && (
//                 <div className={styles.dateTimePopup}>
//                   <label>Date</label>
//                   <input
//                     type="date"
//                     value={lead.date}
//                     onChange={(e) => {
//                       const updated = [...leads];
//                       updated[i].date = e.target.value;
//                       setLeads(updated);
//                     }}
//                   />
//                   <label>Time</label>
//                   <input
//                     type="time"
//                     value={lead.time}
//                     onChange={(e) => {
//                       const updated = [...leads];
//                       updated[i].time = e.target.value;
//                       setLeads(updated);
//                     }}
//                   />
//                   <button onClick={handleSaveDateTime}>Save</button>
//                 </div>
//               )}
//             </div>

//             <div className={styles.statusSection}>
//               <div
//                 className={`${styles.statusCircle} ${
//                   styles[`${lead.status.toLowerCase()}Circle`]
//                 }`}
//               >
//                 {lead.status}
//               </div>

//               <div className={styles.actions}>
//                 {/* Lead Type Dropdown */}
//                 <div
//                   className={styles.icon}
//                   onClick={() =>
//                     setOpenDropdownIndex(openDropdownIndex === i ? null : i)
//                   }
//                 >
//                   <FaPen />
//                   {openDropdownIndex === i && (
//                     <div className={styles.typeDropdown}>
//                       <div className={styles.select}>Select</div>
//                       <div className={styles.hot}>Hot</div>
//                       <div className={styles.warm}>Warm</div>
//                       <div className={styles.cold}>Cold</div>
//                     </div>
//                   )}
//                 </div>

//                 <div className={styles.icon}>
//                   <FaClock />
//                 </div>

//                 {/* Status Change Popup */}
//                 <div
//                   className={styles.icon}
//                   onClick={() => {
//                     setOpenStatusIndex(openStatusIndex === i ? null : i);
//                     setSelectedStatus(lead.status); // reset on open
//                   }}
//                 >
//                   <FaCheck />
//                   {openStatusIndex === i && (
//                     <form
//                       className={styles.statusPopup}
//                       onSubmit={(e) => e.preventDefault()}
//                     >
//                       <label>Lead Status</label>
//                       <select
//                         value={selectedStatus}
//                         onChange={(e) => setSelectedStatus(e.target.value)}
//                       >
//                         <option value="Ongoing">Ongoing</option>
//                         <option value="Closed">Closed</option>
//                       </select>

//                       {lead.error && (
//                         <div className={styles.errorText}>{lead.error}</div>
//                       )}

//                       <button
//                         onClick={() => handleSaveStatus(i, selectedStatus)}
//                       >
//                         Save
//                       </button>
//                     </form>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Leads;

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

  useEffect(() => {
    if (employees.length > 0) {
      fetchAssignedLeads(); // removed email param
    }
  }, [employees]);
  useEffect(() => {
    console.log("🟡 Incoming assignedLeads:", assignedLeads);
    setLeads(
      assignedLeads.map((lead) => ({
        ...lead,
        date: "",
        time: "",
        error: "",
      }))
    );
  }, [assignedLeads]);

  const handleSaveDateTime = () => {
    setOpenDateIndex(null);
  };

  const handleSaveStatus = (index, newStatus) => {
    const updated = [...leads];
    const { date, time } = updated[index];

    if (newStatus === "Closed" && (date || time)) {
      updated[index].error = "Lead can not be closed if scheduled";
    } else {
      updated[index].status = newStatus;
      updated[index].error = "";
      setOpenStatusIndex(null);
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
              <p className={styles.dateLabel}>date</p>
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
                  <button onClick={handleSaveDateTime}>Save</button>
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
                <div
                  className={styles.icon}
                  onClick={() =>
                    setOpenDropdownIndex(openDropdownIndex === i ? null : i)
                  }
                >
                  <FaPen />
                  {openDropdownIndex === i && (
                    <div className={styles.typeDropdown}>
                      <div className={styles.select}>Select</div>
                      <div className={styles.hot}>Hot</div>
                      <div className={styles.warm}>Warm</div>
                      <div className={styles.cold}>Cold</div>
                    </div>
                  )}
                </div>

                <div className={styles.icon}>
                  <FaClock />
                </div>

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

                      <button
                        onClick={() => handleSaveStatus(i, selectedStatus)}
                      >
                        Save
                      </button>
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
