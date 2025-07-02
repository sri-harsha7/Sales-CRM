const csv = require("csv-parser");
const fs = require("fs");
const Lead = require("../models/Leads");
const Employee = require("../models/Employee");

const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().populate(
      "assignedTo",
      "firstName lastName"
    );

    const formattedLeads = leads.map((lead) => ({
      ...lead.toObject(),
      assignedToName: lead.assignedTo
        ? `${lead.assignedTo.firstName} ${lead.assignedTo.lastName}`
        : null,
    }));

    res.json(formattedLeads);
  } catch (err) {
    console.error("❌ Error fetching leads:", err);
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

          const employees = await Employee.find({ status: "Active" });
          const employeeCount = employees.length;

          const leadsToInsert = [];
          const leadCountMap = {}; // { employeeId: count }

          for (let i = 0; i < csvData.length; i++) {
            const lead = csvData[i];
            const assignedTo =
              employeeCount > 0 ? employees[i % employeeCount]._id : null;

            if (assignedTo) {
              leadsToInsert.push({
                ...lead,
                assignedTo,
                batchName: file.originalname.replace(/\.csv$/i, ""),
              });

              leadCountMap[assignedTo] = (leadCountMap[assignedTo] || 0) + 1;
            }
          }

          // Insert new leads
          await Lead.insertMany(leadsToInsert);

          // Update assignedLeads count in Employee collection
          const updatePromises = Object.entries(leadCountMap).map(
            async ([empId, newCount]) => {
              const employee = await Employee.findById(empId);
              const existingAssigned =
                typeof employee.assignedLeads === "number"
                  ? employee.assignedLeads
                  : 0;

              return Employee.findByIdAndUpdate(empId, {
                assignedLeads: existingAssigned + newCount,
              });
            }
          );
          await Promise.all(updatePromises);

          // Delete temp CSV
          fs.unlink(file.path, () => {});

          res.json({
            success: true,
            message: "Leads uploaded and assigned successfully",
            totalLeads: leadsToInsert.length,
            assignedLeads: leadsToInsert.length,
            unassignedLeads: 0,
            newLead: {
              name: file.originalname.replace(/\.csv$/i, ""),
              date: new Date().toISOString().slice(0, 10),
              totalLeads: leadsToInsert.length,
              assignedLeads: leadsToInsert.length,
              unassignedLeads: 0,
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

const deleteLeadBatch = async (req, res) => {
  try {
    const batchName = req.params.batchName;
    const result = await Lead.deleteMany({ batchName });
    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} leads`,
    });
  } catch (err) {
    console.error("❌ Error deleting lead batch:", err);
    res.status(500).json({ message: "Error deleting lead batch" });
  }
};

module.exports = {
  getLeads,
  addLead,
  uploadLeads,
  getLeadBatches,
  deleteLeadBatch,
};
