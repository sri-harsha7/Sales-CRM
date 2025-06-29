const express = require("express");

const router = express.Router();

const { getAdmins, postAdmin } = require("../controllers/adminController");

router.get("/", getAdmins);
router.post("/", postAdmin);

module.exports = router;
