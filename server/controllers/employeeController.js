const Employee = require("../models/Employee");

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Error fetching employees" });
  }
};

const getEmployeesById = async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.status(200).json(employee);
};

module.exports = { getEmployees, getEmployeesById };
