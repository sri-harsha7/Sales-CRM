const express = require("express");
const router = express.Router();
const {
  getEmployees,
  getEmployeesById,
  checkin,
  checkout,
  startBreak,
  endBreak,
} = require("../controllers/employeeController");

router.get("/", getEmployees);
router.get("/:id", getEmployeesById);
router.post("/checkin", checkin);
router.post("/checkout", checkout);
router.patch("/break/start", startBreak);
router.patch("/break/end", endBreak);

module.exports = router;
