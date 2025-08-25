const express = require("express")
const { body, validationResult, query } = require("express-validator")
const Message = require("../models/Message")
const Conversation = require("../models/Conversation")
const User = require("../models/User")
const { authenticateToken } = require("../middleware/auth")
const multer = require("multer")
const path = require("path")

const router = express.Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/messages/")
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, "message-" + uniqueSuffix + path.extname(file.originalname))
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|pdf|doc|docx/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype) || file.mimetype.includes("document")

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error("Only images and documents are allowed"))
    }
  },
})

// Get conversations for current user
router.get("/conversations", authenticateToken, async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user._id,
    })
      .populate("participants", "name profileImage organization role")
      .populate("lastMessage")
      .sort({ lastActivity: -1 })

    // Format conversations for frontend
    const formattedConversations = conversations.map((conv) => {
      const otherParticipant = conv.participants.find((p) => p._id.toString() !== req.user._id.toString())
      const unreadCount = conv.unreadCount.get(req.user._id.toString()) || 0

      return {
        id: conv._id,
        participant: otherParticipant,
        lastMessage: conv.lastMessage,
        lastActivity: conv.lastActivity,
        unreadCount,
        isArchived: conv.isArchived.get(req.user._id.toString()) || false,
      }
    })

    res.json({ conversations: formattedConversations })
  } catch (error) {
    console.error("Error fetching conversations:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get messages in a conversation
router.get(
  "/conversations/:userId",
  authenticateToken,
  [query("page").optional().isInt({ min: 1 }), query("limit").optional().isInt({ min: 1, max: 50 })],
  async (req, res) => {
    try {
      const { userId } = req.params
      const page = Number.parseInt(req.query.page) || 1
      const limit = Number.parseInt(req.query.limit) || 20
      const skip = (page - 1) * limit

      // Verify the other user exists
      const otherUser = await User.findById(userId).select("name profileImage organization role")
      if (!otherUser) {
        return res.status(404).json({ message: "User not found" })
      }

      // Get messages between current user and specified user
      const messages = await Message.find({
        $or: [
          { sender: req.user._id, receiver: userId },
          { sender: userId, receiver: req.user._id },
        ],
        $and: [{ "isDeleted.sender": { $ne: true } }, { "isDeleted.receiver": { $ne: true } }],
      })
        .populate("sender", "name profileImage")
        .populate("receiver", "name profileImage")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)

      // Mark messages as read
      await Message.updateMany(
        {
          sender: userId,
          receiver: req.user._id,
          isRead: false,
        },
        {
          isRead: true,
          readAt: new Date(),
        },
      )

      // Update conversation unread count
      await Conversation.findOneAndUpdate(
        { participants: { $all: [req.user._id, userId] } },
        {
          $set: {
            [`unreadCount.${req.user._id}`]: 0,
          },
        },
      )

      const total = await Message.countDocuments({
        $or: [
          { sender: req.user._id, receiver: userId },
          { sender: userId, receiver: req.user._id },
        ],
      })

      res.json({
        messages: messages.reverse(), // Reverse to show oldest first
        otherUser,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
        },
      })
    } catch (error) {
      console.error("Error fetching messages:", error)
      res.status(500).json({ message: "Server error" })
    }
  },
)

// Send a message
router.post(
  "/send",
  authenticateToken,
  upload.array("attachments", 3),
  [
    body("receiverId").isMongoId().withMessage("Valid receiver ID required"),
    body("content").trim().isLength({ min: 1, max: 1000 }).withMessage("Message content required (max 1000 chars)"),
    body("relatedTo.type").optional().isIn(["donation", "request", "match"]),
    body("relatedTo.id").optional().isMongoId(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { receiverId, content, relatedTo } = req.body

      // Verify receiver exists
      const receiver = await User.findById(receiverId)
      if (!receiver) {
        return res.status(404).json({ message: "Receiver not found" })
      }

      // Process attachments
      const attachments = req.files
        ? req.files.map((file) => ({
            url: `/uploads/messages/${file.filename}`,
            filename: file.originalname,
            fileType: file.mimetype,
            fileSize: file.size,
          }))
        : []

      // Create message
      const message = new Message({
        sender: req.user._id,
        receiver: receiverId,
        content,
        messageType: attachments.length > 0 ? "file" : "text",
        attachments,
        relatedTo: relatedTo ? JSON.parse(relatedTo) : undefined,
      })

      await message.save()
      await message.populate("sender", "name profileImage")

      // Find or create conversation
      let conversation = await Conversation.findOne({
        participants: { $all: [req.user._id, receiverId] },
      })

      if (!conversation) {
        conversation = new Conversation({
          participants: [req.user._id, receiverId],
          lastMessage: message._id,
          lastActivity: new Date(),
          unreadCount: new Map([
            [req.user._id.toString(), 0],
            [receiverId.toString(), 1],
          ]),
        })
      } else {
        conversation.lastMessage = message._id
        conversation.lastActivity = new Date()
        const currentUnread = conversation.unreadCount.get(receiverId.toString()) || 0
        conversation.unreadCount.set(receiverId.toString(), currentUnread + 1)
      }

      await conversation.save()

      // Send real-time notification
      const io = req.app.get("io")
      io.to(receiverId.toString()).emit("new_message", {
        message,
        sender: {
          id: req.user._id,
          name: req.user.name,
          profileImage: req.user.profileImage,
        },
      })

      res.status(201).json({
        message: "Message sent successfully",
        data: message,
      })
    } catch (error) {
      console.error("Error sending message:", error)
      res.status(500).json({ message: "Server error" })
    }
  },
)

// Delete a message
router.delete("/:messageId", authenticateToken, async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId)

    if (!message) {
      return res.status(404).json({ message: "Message not found" })
    }

    // Check if user is sender or receiver
    const isSender = message.sender.toString() === req.user._id.toString()
    const isReceiver = message.receiver.toString() === req.user._id.toString()

    if (!isSender && !isReceiver) {
      return res.status(403).json({ message: "Access denied" })
    }

    // Mark as deleted for the user
    if (isSender) {
      message.isDeleted.sender = true
    }
    if (isReceiver) {
      message.isDeleted.receiver = true
    }

    await message.save()

    res.json({ message: "Message deleted successfully" })
  } catch (error) {
    console.error("Error deleting message:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get unread message count
router.get("/unread-count", authenticateToken, async (req, res) => {
  try {
    const unreadCount = await Message.countDocuments({
      receiver: req.user._id,
      isRead: false,
      "isDeleted.receiver": { $ne: true },
    })

    res.json({ unreadCount })
  } catch (error) {
    console.error("Error fetching unread count:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
