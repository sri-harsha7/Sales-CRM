import React from "react";
import styles from "./DeleteLead.module.css";
const DeleteLead = ({ show, lead, onCancel, onConfirm }) => {
  if (!show) return null;

  return (
    <div className={styles.deleteOverlay}>
      <div className={styles.confirmationModal}>
        <p>
          Are you sure you want to delete <strong>{lead?.name}</strong>?
        </p>
        <div className={styles.confirmActions}>
          <button onClick={onCancel} className={styles.cancelBtn}>
            Cancel
          </button>
          <button onClick={onConfirm} className={styles.nextBtn}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteLead;
