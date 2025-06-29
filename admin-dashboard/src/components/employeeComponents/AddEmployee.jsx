// import React, { useState } from "react";
// import styles from "./AddEmployee.module.css";

// const AddEmployee = ({ onClose, onAdd }) => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     location: "Karnataka",
//     language: "Tamil",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newEmployee = {
//       id: Date.now(),
//       name: `${formData.firstName} ${formData.lastName}`,
//       email: formData.email,
//       employeeId:
//         "#" + Math.random().toString(36).substring(2, 10).toUpperCase(),
//       assignedLeads: 0,
//       closedLeads: 0,
//       status: "Active",
//       location: formData.location,
//       language: formData.language,
//     };
//     onAdd(newEmployee);
//     onClose();
//   };

//   return (
//     <div className={styles.overlay}>
//       <div className={styles.modal}>
//         <h2>Add New Employee</h2>
//         <form className={styles.form} onSubmit={handleSubmit}>
//           <label>First Name</label>
//           <input
//             type="text"
//             placeholder="First Name"
//             value={formData.firstName}
//             onChange={(e) =>
//               setFormData({ ...formData, firstName: e.target.value })
//             }
//             required
//           />

//           <label>Last Name</label>
//           <input
//             type="text"
//             placeholder="Last Name"
//             value={formData.lastName}
//             onChange={(e) =>
//               setFormData({ ...formData, lastName: e.target.value })
//             }
//             required
//           />

//           <label>Email</label>
//           <input
//             type="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={(e) =>
//               setFormData({ ...formData, email: e.target.value })
//             }
//             required
//           />

//           <label>Location</label>
//           <select
//             value={formData.location}
//             onChange={(e) =>
//               setFormData({ ...formData, location: e.target.value })
//             }
//             required
//           >
//             <option value="">Select Location</option>
//             <option value="Karnataka">Karnataka</option>
//             <option value="Andhra Pradesh">Andhra Pradesh</option>
//             <option value="Tamil Nadu">Tamil Nadu</option>
//             <option value="Kerala">Kerala</option>
//           </select>

//           <label>Preferred Language</label>
//           <select
//             value={formData.language}
//             onChange={(e) =>
//               setFormData({ ...formData, language: e.target.value })
//             }
//             required
//           >
//             <option value="">Select Language</option>
//             <option value="English">English</option>
//             <option value="Hindi">Hindi</option>
//             <option value="Kannada">Kannada</option>
//             <option value="Telugu">Telugu</option>
//             <option value="Tamil">Tamil</option>
//             <option value="Malayalam">Malayalam</option>
//           </select>

//           <div className={styles.actions}>
//             <button
//               type="button"
//               onClick={onClose}
//               className={styles.cancelBtn}
//             >
//               Cancel
//             </button>
//             <button type="submit" className={styles.saveBtn}>
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddEmployee;

import React, { useEffect, useState } from "react";
import styles from "./AddEmployee.module.css";

const AddEmployee = ({ onClose, onAdd, editData }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "Karnataka",
    language: "Tamil",
  });

  useEffect(() => {
    if (editData) {
      const [firstName, lastName] = editData.name.split(" ");
      setFormData({
        firstName: firstName || "",
        lastName: lastName || "",
        email: editData.email,
        location: editData.location,
        language: editData.language,
      });
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEmployee = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,

      location: formData.location,
      language: formData.language,
    };
    onAdd(updatedEmployee);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{editData ? "Edit Employee" : "Add New Employee"}</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>First Name</label>
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            required
          />

          <label>Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />

          <label>Location</label>
          <select
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
          >
            <option value="">Select Location</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Kerala">Kerala</option>
          </select>

          <label>Preferred Language</label>
          <select
            value={formData.language}
            onChange={(e) =>
              setFormData({ ...formData, language: e.target.value })
            }
            required
          >
            <option value="">Select Language</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Kannada">Kannada</option>
            <option value="Telugu">Telugu</option>
            <option value="Tamil">Tamil</option>
            <option value="Malayalam">Malayalam</option>
          </select>

          <div className={styles.actions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelBtn}
            >
              Cancel
            </button>
            <button type="submit" className={styles.saveBtn}>
              {editData ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
