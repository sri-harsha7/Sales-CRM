const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer({ dest: "uploads/" });
const Lead = require("../models/Leads");

const {
  addLead,
  getLeads,
  uploadLeads,
  getLeadBatches,
  deleteLeadBatch,
} = require("../controllers/leadsController");

// POST: Add new lead
router.post("/", addLead);

// POST: Upload CSV
router.post("/upload", upload.single("file"), uploadLeads); // ✅ correct function

// GET: Fetch all leads (admin)
router.get("/", getLeads); // ✅ correct function

// GET: Fetch lead batches (admin)
router.get("/batches", getLeadBatches);

// DELETE: Delete lead (admin)
router.delete("/batches/:batchName", deleteLeadBatch);

router.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["Ongoing", "Closed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json(updatedLead);
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH: Update lead type
router.patch("/:id/type", async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body;

    if (!type || !["Hot", "Warm", "Cold"].includes(type)) {
      return res.status(400).json({ message: "Invalid type value" });
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      { type },
      { new: true }
    );

    if (!updatedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.status(200).json(updatedLead);
  } catch (err) {
    console.error("Error updating type:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH /leads/:id/schedule
// PATCH /leads/:id/schedule
router.patch("/:id/schedule", async (req, res) => {
  const { id } = req.params;
  const { date, time } = req.body;

  try {
    const lead = await Lead.findById(id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    lead.date = date;
    lead.time = time;

    await lead.save();
    res.json({ message: "Schedule updated", lead });
  } catch (error) {
    console.error("Error updating schedule:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
