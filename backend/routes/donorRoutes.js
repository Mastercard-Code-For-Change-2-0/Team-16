const express = require("express");
const { addDonor, addDonationItem, getApprovedDonations } = require("../controllers/donorController");
const upload = require("../middleware/fileUpload");
const router = express.Router();

// Add a donor
router.post("/", addDonor);

// Add donation item with image
router.post("/items", upload.single("image"), addDonationItem);

// Get approved donations
router.get("/items/approved", getApprovedDonations);

module.exports = router;
