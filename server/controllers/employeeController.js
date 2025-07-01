// const Employee = require("../models/Employee");

// const getEmployees = async (req, res) => {
//   try {
//     const employees = await Employee.find({});
//     res.status(200).json(employees);
//   } catch (error) {
//     console.error("Error fetching employees:", error);
//     res.status(500).json({ message: "Error fetching employees" });
//   }
// };

// const getEmployeesById = async (req, res) => {
//   const employee = await Employee.findById(req.params.id);
//   res.status(200).json(employee);
// };
// //Checkin
// router.post("/checkin", async (req, res) => {
//   const { email } = req.body;
//   try {
//     const employee = await Employee.findOneAndUpdate(
//       { email },
//       {
//         status: "Active",
//         checkInTime: new Date(),
//       },
//       { new: true }
//     );
//     res.status(200).json(employee);
//   } catch (err) {
//     res.status(500).json({ message: "Check-in failed", error: err });
//   }
// });

// // routes/employee.js/Checkout
// router.post("/checkout", async (req, res) => {
//   const { email } = req.body;
//   try {
//     const employee = await Employee.findOneAndUpdate(
//       { email },
//       {
//         status: "Inactive",
//         checkOutTime: new Date(),
//       },
//       { new: true }
//     );
//     res.status(200).json(employee);
//   } catch (err) {
//     res.status(500).json({ message: "Check-out failed", error: err });
//   }
// });

// module.exports = { getEmployees, getEmployeesById, checkin, checkout };

const Employee = require("../models/Employee");

// GET all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};

// GET employee by ID
const getEmployeesById = async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.status(200).json(employee);
};

// POST /checkin
const checkin = async (req, res) => {
  const { email } = req.body;
  try {
    const employee = await Employee.findOneAndUpdate(
      { email },
      {
        checkInTime: new Date(),
        status: "Active",
      },
      { new: true }
    );
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: "Check-in failed", error: err });
  }
};

// POST /checkout
const checkout = async (req, res) => {
  const { email } = req.body;
  try {
    const employee = await Employee.findOneAndUpdate(
      { email },
      {
        checkOutTime: new Date(),
        status: "Inactive",
      },
      { new: true }
    );
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: "Check-out failed", error: err });
  }
};

// PATCH /break/start
const startBreak = async (req, res) => {
  const { email } = req.body;
  try {
    const employee = await Employee.findOne({ email });
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    employee.breaks.push({ start: new Date() });
    await employee.save();

    res.status(200).json({ message: "Break started", breaks: employee.breaks });
  } catch (err) {
    res.status(500).json({ message: "Break start failed", error: err });
  }
};

// PATCH /break/end
const endBreak = async (req, res) => {
  const { email } = req.body;
  try {
    const employee = await Employee.findOne({ email });
    if (!employee || !employee.breaks.length) {
      return res.status(404).json({ message: "No active break found" });
    }

    const lastBreak = employee.breaks[employee.breaks.length - 1];
    if (!lastBreak.end) {
      lastBreak.end = new Date();
    }

    await employee.save();
    res.status(200).json({ message: "Break ended", breaks: employee.breaks });
  } catch (err) {
    res.status(500).json({ message: "Break end failed", error: err });
  }
};

module.exports = {
  getEmployees,
  getEmployeesById,
  checkin,
  checkout,
  startBreak,
  endBreak,
};
