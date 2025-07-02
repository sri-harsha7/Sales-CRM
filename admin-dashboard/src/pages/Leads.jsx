import React, { useState, useEffect, useRef } from "react";
import styles from "./Leads.module.css";
import LeadsUpload from "../components/leadsComponents/LeadsUpload";
import DeleteLead from "../components/leadsComponents/DeleteLead";
import { useAdminContext } from "../config/AdminContext";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);
  const fileInputRef = useRef(null);

  const { deleteLead } = useAdminContext(); // ✅ use correct function name

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

  const confirmDeleteLead = async () => {
    try {
      await deleteLead(leadToDelete.name); // 👈 pass batchName
      setLeads((prev) => prev.filter((l) => l.name !== leadToDelete.name));
    } catch (err) {
      console.error("❌ Error deleting lead:", err);
    } finally {
      setShowDeleteModal(false);
      setLeadToDelete(null);
    }
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
          fetchLeadBatches(); // refresh after upload
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
