const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  location: String,
  language: { type: String },
  id: Number,
  employeeId: String,
  assignedLeads: Number,
  closedLeads: Number,
  status: { type: String, default: "Active" },
});

module.exports = mongoose.model("Employee", employeeSchema);
