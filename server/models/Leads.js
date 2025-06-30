const mongoose = require("mongoose");
const Employee = require("./Employee");

const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  location: String,
  language: String,
  type: {
    type: String,
    enum: ["Hot", "Warm", "Cold"],
    default: "Warm",
  },
  status: {
    type: String,
    enum: ["Ongoing", "Closed"],
    default: "Ongoing",
  },
  receivedDate: {
    type: Date,
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  batchName: String,
});

module.exports = mongoose.model("Lead", leadSchema);
