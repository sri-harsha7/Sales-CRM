const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer({ dest: "uploads/" });

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

module.exports = router;
