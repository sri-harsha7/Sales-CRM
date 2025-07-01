// const mongoose = require("mongoose");

// const employeeSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   email: { type: String, unique: true },
//   password: String,
//   location: String,
//   language: String,
//   id: Number,
//   employeeId: String,
//   assignedLeads: { type: Number, default: 0 },
//   closedLeads: { type: Number, default: 0 },
//   status: { type: String, default: "Active" },
//   checkInTime: Date,
//   checkOutTime: Date,
//   status: {
//     type: String,
//     enum: ["Active", "Inactive"],
//     default: "Inactive",
//   },
// });

// module.exports = mongoose.model("Employee", employeeSchema);

const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  location: String,
  language: String,
  id: Number,
  employeeId: String,
  assignedLeads: { type: Number, default: 0 },
  closedLeads: { type: Number, default: 0 },
  checkInTime: Date,
  checkOutTime: Date,
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Inactive",
  },
  breaks: [
    {
      start: Date,
      end: Date,
    },
  ],
});

module.exports = mongoose.model("Employee", employeeSchema);
