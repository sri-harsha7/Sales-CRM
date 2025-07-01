const User = require("../models/User");
const Employee = require("../models/Employee");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  const employee = await Employee.findOne({ email });
  if (!employee) {
    return res.status(400).json({ message: "Employee not found" });
  }
  if (employee.password === password) {
    const token = jwt.sign({ id: employee._id }, "secret");
    return res
      .status(200)
      .json({ message: "Login successful", token, employee });
  } else {
    res.status(400).json({ message: "Incorrect password" });
  }
};

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, location, language } = req.body;

    // Ensure all fields are present
    if (!firstName || !lastName || !email || !location || !language) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if employee already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    // Create new employee
    const newEmployee = new Employee({
      firstName,
      lastName,
      email,
      location,
      language,
      password: lastName, // dummy password
      id: Date.now(),
      employeeId:
        "#" + Math.random().toString(36).substring(2, 10).toUpperCase(),
      assignedLeads: 0,
      closedLeads: 0,
      status: "Active",
    });

    const savedEmployee = await newEmployee.save(); // ✅ this is async

    res.status(200).json({
      message: "Employee registered successfully",
      employee: savedEmployee,
    });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  login,
  register,
};
