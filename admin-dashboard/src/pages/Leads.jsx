// import React, { useState, useRef } from "react";
// import styles from "./Leads.module.css";
// import LeadsUpload from "../components/leadsComponents/LeadsUpload";
// import DeleteLead from "../components/leadsComponents/DeleteLead";

// const initialLeads = [
//   {
//     id: "01",
//     name: "March Leads",
//     date: "2025-03-01",
//     totalLeads: 250,
//     assignedLeads: 213,
//     unassignedLeads: 30,
//   },
// ];

// const Leads = () => {
//   const [leads, setLeads] = useState(initialLeads);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
//   const [showUploadModal, setShowUploadModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [leadToDelete, setLeadToDelete] = useState(null);
//   const fileInputRef = useRef(null);

//   const handleSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });

//     const sorted = [...leads].sort((a, b) => {
//       if (key === "date") {
//         return direction === "asc"
//           ? new Date(a[key]) - new Date(b[key])
//           : new Date(b[key]) - new Date(a[key]);
//       }
//       if (typeof a[key] === "number") {
//         return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
//       }
//       return direction === "asc"
//         ? a[key].localeCompare(b[key])
//         : b[key].localeCompare(a[key]);
//     });
//     setLeads(sorted);
//   };

//   const handleDeleteLead = (lead) => {
//     setLeadToDelete(lead);
//     setShowDeleteModal(true);
//   };

//   const confirmDeleteLead = () => {
//     setLeads((prev) => prev.filter((lead) => lead.id !== leadToDelete.id));
//     setShowDeleteModal(false);
//     setLeadToDelete(null);
//   };

//   const addNewLead = (newLead) => {
//     setLeads((prev) => [...prev, newLead]);
//   };

//   return (
//     <div className={styles.leads}>
//       <div className={styles.header}>
//         <h2 className={styles.breadcrumb}>Home &gt; Leads</h2>
//         <button
//           className={styles.addButton}
//           onClick={() => setShowUploadModal(true)}
//         >
//           Add Leads
//         </button>
//       </div>

//       <div className={styles.tableWrapper}>
//         <table className={styles.table}>
//           <thead>
//             <tr className={styles.headerRow}>
//               <th>No.</th>
//               <th>
//                 <button
//                   className={styles.sortBtn}
//                   onClick={() => handleSort("name")}
//                 >
//                   Name
//                 </button>
//               </th>
//               <th>
//                 <button
//                   className={styles.sortBtn}
//                   onClick={() => handleSort("date")}
//                 >
//                   Date
//                 </button>
//               </th>
//               <th>
//                 <button
//                   className={styles.sortBtn}
//                   onClick={() => handleSort("totalLeads")}
//                 >
//                   No. of Leads
//                 </button>
//               </th>
//               <th>Assigned Leads</th>
//               <th>Unassigned Leads</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {leads.map((lead) => (
//               <tr key={lead.id} className={styles.row}>
//                 <td>{lead.id}</td>
//                 <td>{lead.name}</td>
//                 <td>{new Date(lead.date).toLocaleDateString()}</td>
//                 <td>{lead.totalLeads}</td>
//                 <td>{lead.assignedLeads}</td>
//                 <td>{lead.unassignedLeads}</td>
//                 <td>
//                   <button
//                     className={styles.moreBtn}
//                     onClick={() => handleDeleteLead(lead)}
//                   >
//                     ⋯
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <LeadsUpload
//         show={showUploadModal}
//         onClose={() => setShowUploadModal(false)}
//         onAddLead={addNewLead}
//         fileInputRef={fileInputRef}
//       />

//       <DeleteLead
//         show={showDeleteModal}
//         lead={leadToDelete}
//         onCancel={() => setShowDeleteModal(false)}
//         onConfirm={confirmDeleteLead}
//       />
//     </div>
//   );
// };

// export default Leads;

import React, { useState, useEffect, useRef } from "react";
import styles from "./Leads.module.css";
import LeadsUpload from "../components/leadsComponents/LeadsUpload";
import DeleteLead from "../components/leadsComponents/DeleteLead";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);
  const fileInputRef = useRef(null);

  // 👇 FETCH LEADS FROM API
  const fetchLeadBatches = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/leads/batches`
      );
      const data = await res.json();
      if (data.success) {
        setLeads(data.data);
      } else {
        console.error("Failed to fetch leads");
      }
    } catch (err) {
      console.error("❌ Error fetching lead batches:", err);
    }
  };

  // 👇 Fetch leads when page loads
  useEffect(() => {
    fetchLeadBatches();
  }, []);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...leads].sort((a, b) => {
      if (key === "date") {
        return direction === "asc"
          ? new Date(a[key]) - new Date(b[key])
          : new Date(b[key]) - new Date(a[key]);
      }
      if (typeof a[key] === "number") {
        return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
      }
      return direction === "asc"
        ? a[key].localeCompare(b[key])
        : b[key].localeCompare(a[key]);
    });
    setLeads(sorted);
  };

  const handleDeleteLead = (lead) => {
    setLeadToDelete(lead);
    setShowDeleteModal(true);
  };

  const confirmDeleteLead = () => {
    setLeads((prev) => prev.filter((lead) => lead.id !== leadToDelete.id));
    setShowDeleteModal(false);
    setLeadToDelete(null);
  };

  const addNewLead = (newLead) => {
    setLeads((prev) => [...prev, newLead]);
  };

  return (
    <div className={styles.leads}>
      <div className={styles.header}>
        <h2 className={styles.breadcrumb}>Home &gt; Leads</h2>
        <button
          className={styles.addButton}
          onClick={() => setShowUploadModal(true)}
        >
          Add Leads
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.headerRow}>
              <th>No.</th>
              <th>
                <button
                  className={styles.sortBtn}
                  onClick={() => handleSort("name")}
                >
                  Name
                </button>
              </th>
              <th>
                <button
                  className={styles.sortBtn}
                  onClick={() => handleSort("date")}
                >
                  Date
                </button>
              </th>
              <th>
                <button
                  className={styles.sortBtn}
                  onClick={() => handleSort("totalLeads")}
                >
                  No. of Leads
                </button>
              </th>
              <th>Assigned Leads</th>
              <th>Unassigned Leads</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className={styles.row}>
                <td>{lead.id}</td>
                <td>{lead.name}</td>
                <td>{new Date(lead.date).toLocaleDateString()}</td>
                <td>{lead.totalLeads}</td>
                <td>{lead.assignedLeads}</td>
                <td>{lead.unassignedLeads}</td>
                <td>
                  <button
                    className={styles.moreBtn}
                    onClick={() => handleDeleteLead(lead)}
                  >
                    ⋯
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <LeadsUpload
        show={showUploadModal}
        onClose={() => {
          setShowUploadModal(false);
          fetchLeadBatches(); // 👈 Refresh after uploading
        }}
        onAddLead={addNewLead}
        fileInputRef={fileInputRef}
      />

      <DeleteLead
        show={showDeleteModal}
        lead={leadToDelete}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteLead}
      />
    </div>
  );
};

export default Leads;
