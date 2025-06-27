// import React, { useState, useRef } from "react";
// import styles from "./Leads.module.css";

// const initialLeads = [
//   {
//     id: "01",
//     name: "CSV0225",
//     date: "2025-03-01",
//     totalLeads: 250,
//     assignedLeads: 213,
//     unassignedLeads: 30,
//   },
//   {
//     id: "02",
//     name: "CSV0101",
//     date: "2025-01-01",
//     totalLeads: 300,
//     assignedLeads: 200,
//     unassignedLeads: 100,
//   },
//   {
//     id: "03",
//     name: "CSV0410",
//     date: "2025-04-10",
//     totalLeads: 180,
//     assignedLeads: 150,
//     unassignedLeads: 30,
//   },
// ];

// const Leads = () => {
//   const [leads, setLeads] = useState(initialLeads);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
//   const [showUploadModal, setShowUploadModal] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
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

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleUpload = () => {
//     if (!selectedFile) return;
//     setIsUploading(true);
//     setUploadProgress(0);

//     const interval = setInterval(() => {
//       setUploadProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           setTimeout(() => {
//             setIsUploading(false);
//             setShowUploadModal(false);
//             setSelectedFile(null);
//           }, 500);
//           return 100;
//         }
//         return prev + 10;
//       });
//     }, 200);
//   };

//   const cancelUpload = () => {
//     setIsUploading(false);
//     setUploadProgress(0);
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
//                   <button className={styles.moreBtn}>⋯</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* CSV Upload Modal */}
//       {showUploadModal && (
//         <div className={styles.modalOverlay}>
//           <div className={styles.modal}>
//             <button
//               className={styles.closeBtn}
//               onClick={() => setShowUploadModal(false)}
//               disabled={isUploading}
//             >
//               ✕
//             </button>
//             <h3>CSV Upload</h3>
//             <p>Add your documents here</p>

//             <div className={styles.uploadBox}>
//               {isUploading ? (
//                 <div className={styles.progressWrapper}>
//                   <div className={styles.progressCircle}>{uploadProgress}%</div>
//                   <p>Verifying...</p>
//                   <button onClick={cancelUpload} className={styles.cancelBtn}>
//                     Cancel
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <label className={styles.uploadLabel}>
//                     Drag your file(s) to start uploading
//                     <br /> OR <br />
//                     <button
//                       type="button"
//                       className={styles.browseBtn}
//                       onClick={() => fileInputRef.current.click()}
//                     >
//                       Browse files
//                     </button>
//                   </label>
//                   <input
//                     type="file"
//                     accept=".csv"
//                     onChange={handleFileChange}
//                     ref={fileInputRef}
//                     style={{ display: "none" }}
//                   />
//                   <div className={styles.selectedFile}>
//                     {selectedFile ? selectedFile.name : "Sample File.csv"}
//                   </div>
//                 </>
//               )}
//             </div>

//             <div className={styles.modalActions}>
//               <button
//                 onClick={() => setShowUploadModal(false)}
//                 className={styles.cancelBtn}
//                 disabled={isUploading}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleUpload}
//                 className={styles.nextBtn}
//                 disabled={isUploading || !selectedFile}
//               >
//                 {isUploading ? "Uploading..." : "Next →"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Leads;

// import React, { useState, useRef } from "react";
// import styles from "./Leads.module.css";

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
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
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

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleUpload = () => {
//     if (!selectedFile) return;
//     setShowConfirmModal(true);
//   };

//   const confirmUpload = () => {
//     setLeads((prev) => [
//       ...prev,
//       {
//         id: String(prev.length + 1).padStart(2, "0"),
//         name: selectedFile.name.replace(".csv", ""),
//         date: new Date().toISOString().slice(0, 10),
//         totalLeads: Math.floor(Math.random() * 500 + 100),
//         assignedLeads: Math.floor(Math.random() * 300),
//         unassignedLeads: Math.floor(Math.random() * 200),
//       },
//     ]);
//     setShowUploadModal(false);
//     setShowConfirmModal(false);
//     setSelectedFile(null);
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

//       {/* CSV Upload Modal */}
//       {showUploadModal && (
//         <div className={styles.modalOverlay}>
//           <div className={styles.modal}>
//             <button
//               className={styles.closeBtn}
//               onClick={() => setShowUploadModal(false)}
//             >
//               ✕
//             </button>
//             <h3>CSV Upload</h3>
//             <p>Add your documents here</p>

//             <div className={styles.uploadBox}>
//               <label className={styles.uploadLabel}>
//                 Drag your file(s) to start uploading
//                 <br /> OR <br />
//                 <button
//                   type="button"
//                   className={styles.browseBtn}
//                   onClick={() => fileInputRef.current.click()}
//                 >
//                   Browse files
//                 </button>
//               </label>
//               <input
//                 type="file"
//                 accept=".csv"
//                 onChange={handleFileChange}
//                 ref={fileInputRef}
//                 style={{ display: "none" }}
//               />
//               {selectedFile && (
//                 <div className={styles.fileDetails}>
//                   <div>
//                     <strong>{selectedFile.name}</strong>{" "}
//                     {(selectedFile.size / (1024 * 1024)).toFixed(2)}MB
//                   </div>
//                   <button
//                     className={styles.removeFile}
//                     onClick={() => setSelectedFile(null)}
//                   >
//                     ✕
//                   </button>
//                 </div>
//               )}
//             </div>

//             <div className={styles.modalActions}>
//               <button
//                 onClick={() => setShowUploadModal(false)}
//                 className={styles.cancelBtn}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleUpload}
//                 className={styles.nextBtn}
//                 disabled={!selectedFile}
//               >
//                 Upload
//               </button>
//             </div>

//             {/* Confirmation Modal */}
//             {showConfirmModal && (
//               <div className={styles.confirmationModal}>
//                 <p>
//                   All the Leads will be distributed among other employees
//                   equally. Do you want to proceed with this upload?
//                 </p>
//                 <div className={styles.confirmActions}>
//                   <button
//                     onClick={() => setShowConfirmModal(false)}
//                     className={styles.cancelBtn}
//                   >
//                     Cancel
//                   </button>
//                   <button onClick={confirmUpload} className={styles.nextBtn}>
//                     Confirm
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Delete Lead Confirmation Modal */}
//       {showDeleteModal && (
//         <div className={styles.deleteOverlay}>
//           <div className={styles.confirmationModal}>
//             <p>
//               Are you sure you want to delete{" "}
//               <strong>{leadToDelete.name}</strong>?
//             </p>
//             <div className={styles.confirmActions}>
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className={styles.cancelBtn}
//               >
//                 Cancel
//               </button>
//               <button onClick={confirmDeleteLead} className={styles.nextBtn}>
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Leads;

import React, { useState, useRef } from "react";
import styles from "./Leads.module.css";
import LeadsUpload from "../components/leadsComponents/LeadsUpload";
import DeleteLead from "../components/leadsComponents/DeleteLead";

const initialLeads = [
  {
    id: "01",
    name: "March Leads",
    date: "2025-03-01",
    totalLeads: 250,
    assignedLeads: 213,
    unassignedLeads: 30,
  },
];

const Leads = () => {
  const [leads, setLeads] = useState(initialLeads);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);
  const fileInputRef = useRef(null);

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
        onClose={() => setShowUploadModal(false)}
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
