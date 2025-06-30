// const Lead = require("../models/Leads");
// const Employee = require("../models/Employee");
// const fs = require("fs");
// const csv = require("csv-parser");
// const path = require("path");
// const multer = require("multer");

// const upload = multer({ dest: "uploads/" });

// const addLead = async (req, res) => {
//   try {
//     const newLead = new Lead(req.body);
//     await newLead.save();
//     res
//       .status(201)
//       .json({ success: true, message: "Lead added", data: newLead });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
// const getLead = async (req, res) => {
//   try {
//     const leads = await Lead.find().populate("assignedEmployee");
//     res.json(leads);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const uploadLead = async (req, res) => {
//   if (!req.file) {
//     return res
//       .status(400)
//       .json({ success: false, message: "No file uploaded" });
//   }

//   const leads = [];

//   // Parse CSV
//   fs.createReadStream(req.file.path)
//     .pipe(csv())
//     .on("data", (row) => {
//       // Parse and validate date
//       const [day, month, year] = row.receivedDate.split("/");
//       const parsedDate = new Date(`${year}-${month}-${day}`);
//       if (isNaN(parsedDate)) return;

//       leads.push({
//         name: row.name,
//         email: row.email,
//         phone: row.phone,
//         status: "Ongoing",
//         type: row.type || "Warm",
//         location: row.location,
//         language: row.language,
//         receivedDate: parsedDate,
//       });
//     })
//     .on("end", async () => {
//       try {
//         // Get all sales employees
//         const employees = await Employee.find();
//         if (employees.length === 0) {
//           return res
//             .status(400)
//             .json({ success: false, message: "No employees to assign leads." });
//         }

//         // Assign leads in round-robin
//         let i = 0;
//         const createdLeads = [];

//         for (const lead of leads) {
//           const assignedTo = employees[i % employees.length]._id;
//           const newLead = new Lead({ ...lead, assignedTo });
//           await newLead.save();
//           createdLeads.push(newLead);
//           i++;
//         }

//         // Cleanup temp file
//         fs.unlinkSync(req.file.path);

//         res.status(200).json({
//           success: true,
//           message: "Leads uploaded and assigned.",
//           totalLeads: createdLeads.length,
//           assignedLeads: createdLeads.length,
//         });
//       } catch (err) {
//         console.error(err);
//         res
//           .status(500)
//           .json({ success: false, message: "Server error during upload." });
//       }
//     });
// };

// module.exports = { addLead, getLead, uploadLead };

const csv = require("csv-parser");
const fs = require("fs");
const Lead = require("../models/Leads");
const Employee = require("../models/Employee");
const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching leads" });
  }
};

const addLead = async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.json(lead);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding lead" });
  }
};

const uploadLeads = async (req, res) => {
  try {
    const file = req.file;
    const csvData = [];

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Step 1: Parse CSV rows
    fs.createReadStream(file.path)
      .pipe(csv())
      .on("data", (row) => {
        const rawDate = row["Received Date"];
        if (rawDate) {
          const [year, month, day] = rawDate.split("-").map(Number);
          const parsedDate = new Date(year, month - 1, day);

          if (isNaN(parsedDate.getTime())) {
            console.warn("⚠️ Invalid date:", rawDate);
            return;
          }

          // Validate enums before pushing
          const validStatus = ["Ongoing", "Closed"].includes(row.Status)
            ? row.Status
            : "Ongoing";

          const validType = ["Hot", "Warm", "Cold"].includes(row.Type)
            ? row.Type
            : "Warm";

          csvData.push({
            name: row.Name,
            email: row.Email,
            phone: row.Phone,
            location: row.Location || "Unknown",
            language: row.Language || "English",
            type: validType,
            status: validStatus,
            receivedDate: parsedDate,
          });
        } else {
          console.warn("⚠️ Missing received date in row:", row);
        }
      })
      .on("end", async () => {
        try {
          console.log("✅ Parsed rows:", csvData.length);

          // Step 2: Get active employees
          const employees = await Employee.find({ status: "Active" });
          const employeeCount = employees.length;

          console.log("👥 Active employees:", employeeCount);

          const leadsToInsert = [];
          let assignedCount = 0;

          // Step 3: Distribute leads
          for (let i = 0; i < csvData.length; i++) {
            const lead = csvData[i];
            const assignedTo =
              employeeCount > 0 ? employees[i % employeeCount]._id : null;

            if (assignedTo) assignedCount++;

            leadsToInsert.push({
              ...lead,
              assignedTo,
              batchName: file.originalname.replace(/\.csv$/i, ""),
            });
          }

          // Step 4: Insert into DB
          await Lead.insertMany(leadsToInsert);

          // Optional cleanup: remove file
          fs.unlink(file.path, () => {});

          // Step 5: Respond
          res.json({
            success: true,
            message: "Leads uploaded and assigned successfully",
            totalLeads: leadsToInsert.length,
            assignedLeads: assignedCount,
            unassignedLeads: leadsToInsert.length - assignedCount,
            newLead: {
              name: file.originalname.replace(/\.csv$/i, ""),
              date: new Date().toISOString().slice(0, 10),
              totalLeads: leadsToInsert.length,
              assignedLeads: assignedCount,
              unassignedLeads: leadsToInsert.length - assignedCount,
            },
          });
        } catch (err) {
          console.error("❌ DB insert error:", err);
          res.status(500).json({ message: "Error uploading leads" });
        }
      });
  } catch (err) {
    console.error("❌ General error:", err);
    res.status(500).json({ message: "Error uploading leads" });
  }
};

const getLeadBatches = async (req, res) => {
  try {
    const leads = await Lead.find();

    const grouped = {};

    for (const lead of leads) {
      const key = lead.batchName || "Unknown";

      if (!grouped[key]) {
        grouped[key] = {
          name: key,
          date: new Date(lead.receivedDate).toISOString().slice(0, 10),
          totalLeads: 0,
          assignedLeads: 0,
          unassignedLeads: 0,
        };
      }

      grouped[key].totalLeads++;
      if (lead.assignedTo) grouped[key].assignedLeads++;
      else grouped[key].unassignedLeads++;
    }

    const batches = Object.values(grouped).map((batch, index) => ({
      ...batch,
      id: String(index + 1).padStart(2, "0"),
    }));

    res.json({ success: true, data: batches });
  } catch (err) {
    console.error("❌ Error in getLeadBatches:", err);
    res.status(500).json({ message: "Failed to fetch lead batches" });
  }
};

module.exports = { getLeads, addLead, uploadLeads, getLeadBatches };
