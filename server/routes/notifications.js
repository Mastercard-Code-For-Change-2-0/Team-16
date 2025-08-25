const express = require("express")
const { body, validationResult } = require("express-validator")
const Notification = require("../models/Notification")
const { authenticateToken } = require("../middleware/auth")

const router = express.Router()

// Create Notification model
const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    required: true,
    enum: [
      "match_created",
      "match_approved",
      "match_completed",
      "message_received",
      "donation_interest",
      "request_response",
      "system_update",
      "account_verified",
    ],
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  readAt: {
    type: Date,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  actionUrl: {
    type: String,
    trim: true,
  },
  expiresAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Index for efficient querying
notificationSchema.index({ recipient: 1, createdAt: -1 })
notificationSchema.index({ recipient: 1, isRead: 1 })
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

const NotificationModel = mongoose.model("Notification", notificationSchema)

// Get notifications for current user
router.get("/", authenticateToken, async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 20
    const skip = (page - 1) * limit

    const filter = { recipient: req.user._id }
    if (req.query.isRead !== undefined) {
      filter.isRead = req.query.isRead === "true"
    }
    if (req.query.type) {
      filter.type = req.query.type
    }

    const notifications = await NotificationModel.find(filter)
      .populate("sender", "name profileImage organization")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await NotificationModel.countDocuments(filter)
    const unreadCount = await NotificationModel.countDocuments({
      recipient: req.user._id,
      isRead: false,
    })

    res.json({
      notifications,
      unreadCount,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      },
    })
  } catch (error) {
    console.error("Error fetching notifications:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create notification (internal use)
router.post(
  "/",
  authenticateToken,
  [
    body("recipientId").isMongoId().withMessage("Valid recipient ID required"),
    body("type").isIn([
      "match_created",
      "match_approved",
      "match_completed",
      "message_received",
      "donation_interest",
      "request_response",
      "system_update",
      "account_verified",
    ]),
    body("title").trim().isLength({ min: 1, max: 100 }).withMessage("Title required (max 100 chars)"),
    body("message").trim().isLength({ min: 1, max: 500 }).withMessage("Message required (max 500 chars)"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { recipientId, type, title, message, data, priority, actionUrl, expiresAt } = req.body

      const notification = new NotificationModel({
        recipient: recipientId,
        sender: req.user._id,
        type,
        title,
        message,
        data: data ? JSON.parse(data) : {},
        priority: priority || "medium",
        actionUrl,
        expiresAt: expiresAt ? new Date(expiresAt) : undefined,
      })

      await notification.save()
      await notification.populate("sender", "name profileImage organization")

      // Send real-time notification
      const io = req.app.get("io")
      io.to(recipientId.toString()).emit("new_notification", notification)

      res.status(201).json({
        message: "Notification created successfully",
        notification,
      })
    } catch (error) {
      console.error("Error creating notification:", error)
      res.status(500).json({ message: "Server error" })
    }
  },
)

// Mark notification as read
router.put("/:id/read", authenticateToken, async (req, res) => {
  try {
    const notification = await NotificationModel.findOne({
      _id: req.params.id,
      recipient: req.user._id,
    })

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" })
    }

    notification.isRead = true
    notification.readAt = new Date()
    await notification.save()

    res.json({
      message: "Notification marked as read",
      notification,
    })
  } catch (error) {
    console.error("Error marking notification as read:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Mark all notifications as read
router.put("/mark-all-read", authenticateToken, async (req, res) => {
  try {
    await NotificationModel.updateMany(
      {
        recipient: req.user._id,
        isRead: false,
      },
      {
        isRead: true,
        readAt: new Date(),
      },
    )

    res.json({ message: "All notifications marked as read" })
  } catch (error) {
    console.error("Error marking all notifications as read:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Delete notification
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const notification = await NotificationModel.findOneAndDelete({
      _id: req.params.id,
      recipient: req.user._id,
    })

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" })
    }

    res.json({ message: "Notification deleted successfully" })
  } catch (error) {
    console.error("Error deleting notification:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
