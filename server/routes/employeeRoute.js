const express = require("express");

const router = express.Router();

const {
  getEmployees,
  getEmployeesById,
} = require("../controllers/employeeController");

router.get("/", getEmployees);
router.get("/:id", getEmployeesById);

module.exports = router;
