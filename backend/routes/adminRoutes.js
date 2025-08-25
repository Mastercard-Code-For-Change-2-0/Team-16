const express = require("express");
const { approveDonation, approveReceiver, getPendingDonations, getPendingReceivers } = require("../controllers/adminController");
const router = express.Router();

// Approve donation
router.put("/donations/:id/approve", approveDonation);

// Approve receiver
router.put("/receivers/:id/approve", approveReceiver);

// Get pending donations
router.get("/donations/pending", getPendingDonations);

// Get pending receivers
router.get("/receivers/pending", getPendingReceivers);

module.exports = router;
