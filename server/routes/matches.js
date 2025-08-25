const express = require("express")
const { body, validationResult } = require("express-validator")
const Match = require("../models/Match")
const Donation = require("../models/Donation")
const Request = require("../models/Request")
const { authenticateToken, authorizeRole } = require("../middleware/auth")
const { sendNotificationEmail } = require("../utils/emailService")

const router = express.Router()

// Create Match model
const mongoose = require("mongoose")

const matchSchema = new mongoose.Schema({
  donation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donation",
    required: true,
  },
  request: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Request",
    required: true,
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "in-progress", "completed", "cancelled"],
    default: "pending",
  },
  matchedQuantity: {
    type: Number,
    required: true,
    min: 1,
  },
  notes: {
    donor: String,
    receiver: String,
    admin: String,
  },
  timeline: [
    {
      status: String,
      timestamp: { type: Date, default: Date.now },
      updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      notes: String,
    },
  ],
  deliveryDetails: {
    method: {
      type: String,
      enum: ["pickup", "delivery", "meetup"],
    },
    scheduledDate: Date,
    address: String,
    contactPerson: String,
    contactPhone: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const MatchModel = mongoose.model("Match", matchSchema)

// Create a match
router.post(
  "/",
  authenticateToken,
  [
    body("donationId").isMongoId().withMessage("Valid donation ID required"),
    body("requestId").isMongoId().withMessage("Valid request ID required"),
    body("matchedQuantity").isInt({ min: 1 }).withMessage("Matched quantity must be at least 1"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { donationId, requestId, matchedQuantity, notes } = req.body

      // Verify donation and request exist
      const donation = await Donation.findById(donationId).populate("donor")
      const request = await Request.findById(requestId).populate("receiver")

      if (!donation || !request) {
        return res.status(404).json({ message: "Donation or request not found" })
      }

      // Check if items are available
      if (donation.status !== "available" || request.status !== "active") {
        return res.status(400).json({ message: "Items are not available for matching" })
      }

      // Check quantity availability
      if (matchedQuantity > donation.quantity || matchedQuantity > request.quantity) {
        return res.status(400).json({ message: "Insufficient quantity available" })
      }

      // Create match
      const match = new MatchModel({
        donation: donationId,
        request: requestId,
        donor: donation.donor._id,
        receiver: request.receiver._id,
        matchedQuantity,
        notes: {
          [req.user.role]: notes,
        },
        timeline: [
          {
            status: "pending",
            updatedBy: req.user._id,
            notes: `Match created by ${req.user.role}`,
          },
        ],
      })

      await match.save()

      // Update donation and request status
      donation.status = "matched"
      request.status = "matched"
      await donation.save()
      await request.save()

      // Send notifications
      const io = req.app.get("io")
      if (req.user.role === "donor") {
        io.to(request.receiver._id.toString()).emit("new_notification", {
          type: "match_created",
          message: `Your request "${request.title}" has been matched with a donation!`,
          matchId: match._id,
        })
        await sendNotificationEmail(
          request.receiver,
          "New Match Found",
          `Your request "${request.title}" has been matched!`,
        )
      } else {
        io.to(donation.donor._id.toString()).emit("new_notification", {
          type: "match_created",
          message: `Your donation "${donation.title}" has been matched with a request!`,
          matchId: match._id,
        })
        await sendNotificationEmail(
          donation.donor,
          "New Match Found",
          `Your donation "${donation.title}" has been matched!`,
        )
      }

      await match.populate([
        { path: "donation", populate: { path: "donor", select: "name organization" } },
        { path: "request", populate: { path: "receiver", select: "name organization" } },
      ])

      res.status(201).json({
        message: "Match created successfully",
        match,
      })
    } catch (error) {
      console.error("Error creating match:", error)
      res.status(500).json({ message: "Server error" })
    }
  },
)

// Get matches for current user
router.get("/user/my-matches", authenticateToken, async (req, res) => {
  try {
    const filter = {}
    if (req.user.role === "donor") {
      filter.donor = req.user._id
    } else if (req.user.role === "receiver") {
      filter.receiver = req.user._id
    }

    const matches = await MatchModel.find(filter)
      .populate([
        { path: "donation", populate: { path: "donor", select: "name organization profileImage" } },
        { path: "request", populate: { path: "receiver", select: "name organization profileImage" } },
      ])
      .sort({ createdAt: -1 })

    res.json({ matches })
  } catch (error) {
    console.error("Error fetching user matches:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Update match status (admin only)
router.put("/:id/status", authenticateToken, authorizeRole("admin"), async (req, res) => {
  try {
    const { status, notes } = req.body
    const validStatuses = ["pending", "approved", "in-progress", "completed", "cancelled"]

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" })
    }

    const match = await MatchModel.findById(req.params.id)
    if (!match) {
      return res.status(404).json({ message: "Match not found" })
    }

    match.status = status
    match.notes.admin = notes
    match.timeline.push({
      status,
      updatedBy: req.user._id,
      notes: notes || `Status updated to ${status}`,
    })

    await match.save()

    // Send notifications to both parties
    const io = req.app.get("io")
    io.to(match.donor.toString()).emit("new_notification", {
      type: "match_updated",
      message: `Match status updated to: ${status}`,
      matchId: match._id,
    })
    io.to(match.receiver.toString()).emit("new_notification", {
      type: "match_updated",
      message: `Match status updated to: ${status}`,
      matchId: match._id,
    })

    res.json({
      message: "Match status updated successfully",
      match,
    })
  } catch (error) {
    console.error("Error updating match status:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
