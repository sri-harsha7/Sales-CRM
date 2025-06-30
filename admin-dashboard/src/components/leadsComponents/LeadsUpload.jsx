import React, { useState } from "react";
import styles from "./LeadsUpload.module.css";

const LeadsUpload = ({ show, onClose, onAddLead, fileInputRef }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    setShowConfirmModal(true);
  };

  const confirmUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/leads/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        alert("Leads uploaded and assigned successfully!");

        onAddLead({
          id: String(Date.now()),
          name: data.newLead.name,
          date: data.newLead.date,
          totalLeads: data.newLead.totalLeads,
          assignedLeads: data.newLead.assignedLeads,
          unassignedLeads: data.newLead.unassignedLeads,
        });
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong during upload.");
    }

    setShowConfirmModal(false);
    onClose();
  };

  if (!show) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>
        <h3>CSV Upload</h3>
        <p>Add your documents here</p>

        <div className={styles.uploadBox}>
          <label className={styles.uploadLabel}>
            Drag your file(s) to start uploading
            <br /> OR <br />
            <button
              type="button"
              className={styles.browseBtn}
              onClick={() => fileInputRef.current.click()}
            >
              Browse files
            </button>
          </label>

          {/* 👇 This must come after handleFileChange is defined */}
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: "none" }}
          />

          {selectedFile && (
            <div className={styles.fileDetails}>
              <div>
                <strong>{selectedFile.name}</strong>{" "}
                {(selectedFile.size / (1024 * 1024)).toFixed(2)}MB
              </div>
              <button
                className={styles.removeFile}
                onClick={() => setSelectedFile(null)}
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <div className={styles.modalActions}>
          <button onClick={onClose} className={styles.cancelBtn}>
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className={styles.nextBtn}
            disabled={!selectedFile}
          >
            Upload
          </button>
        </div>

        {showConfirmModal && (
          <div className={styles.confirmationModal}>
            <p>
              All the Leads will be distributed among other employees equally.
              Do you want to proceed with this upload?
            </p>
            <div className={styles.confirmActions}>
              <button
                onClick={() => setShowConfirmModal(false)}
                className={styles.cancelBtn}
              >
                Cancel
              </button>
              <button onClick={confirmUpload} className={styles.nextBtn}>
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadsUpload;
