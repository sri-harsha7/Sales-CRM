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
  assignedLeads: Number,
  closedLeads: Number,
  status: String,
});

module.exports = mongoose.model("Employee", employeeSchema);
