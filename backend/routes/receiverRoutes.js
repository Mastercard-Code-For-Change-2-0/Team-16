const express = require("express");
const { addReceiver, addReceiverItem, getReceiverRequests } = require("../controllers/receiverController");
const router = express.Router();

// Add a receiver
router.post("/", addReceiver);

// Add receiver requirement
router.post("/items", addReceiverItem);

// Get all receiver requests (with optional priority filter)
router.get("/items", getReceiverRequests);

module.exports = router;
