const express = require("express")
const { body, validationResult, query } = require("express-validator")
const Request = require("../models/Request")
const { authenticateToken, authorizeRole } = require("../middleware/auth")
const multer = require("multer")
const path = require("path")

const router = express.Router()

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/requests/")
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, "request-" + uniqueSuffix + path.extname(file.originalname))
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)

    if (mimetype && extname) {
      return cb(null, true)
    } else {
      cb(new Error("Only image files are allowed"))
    }
  },
})

// Get all requests with filtering and pagination
router.get(
  "/",
  [
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 50 }),
    query("category")
      .optional()
      .isIn(["food", "clothes", "books", "stationery", "furniture", "electronics", "medical", "toys", "other"]),
    query("status").optional().isIn(["active", "matched", "fulfilled", "cancelled"]),
    query("urgency").optional().isIn(["low", "medium", "high"]),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const page = Number.parseInt(req.query.page) || 1
      const limit = Number.parseInt(req.query.limit) || 10
      const skip = (page - 1) * limit

      const filter = {}
      if (req.query.category) filter.category = req.query.category
      if (req.query.status) filter.status = req.query.status
      if (req.query.urgency) filter.urgency = req.query.urgency
      if (req.query.city) filter["location.city"] = new RegExp(req.query.city, "i")
      if (req.query.search) {
        filter.$text = { $search: req.query.search }
      }

      const requests = await Request.find(filter)
        .populate("receiver", "name organization profileImage")
        .sort({ urgency: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)

      const total = await Request.countDocuments(filter)

      res.json({
        requests,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
        },
      })
    } catch (error) {
      console.error("Error fetching requests:", error)
      res.status(500).json({ message: "Server error" })
    }
  },
)

// Create new request
router.post(
  "/",
  authenticateToken,
  authorizeRole("receiver"),
  upload.array("images", 5),
  [
    body("title").trim().isLength({ min: 5 }).withMessage("Title must be at least 5 characters"),
    body("description").trim().isLength({ min: 20 }).withMessage("Description must be at least 20 characters"),
    body("category").isIn([
      "food",
      "clothes",
      "books",
      "stationery",
      "furniture",
      "electronics",
      "medical",
      "toys",
      "other",
    ]),
    body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
    body("urgency").isIn(["low", "medium", "high"]),
    body("deadline").isISO8601().withMessage("Valid deadline date required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const {
        title,
        description,
        category,
        subcategory,
        quantity,
        unit,
        urgency,
        beneficiaries,
        location,
        deadline,
        tags,
      } = req.body

      const images = req.files
        ? req.files.map((file) => ({
            url: `/uploads/requests/${file.filename}`,
            alt: `${title} - ${category}`,
          }))
        : []

      const request = new Request({
        receiver: req.user._id,
        title,
        description,
        category,
        subcategory,
        quantity,
        unit,
        urgency,
        beneficiaries: JSON.parse(beneficiaries || "{}"),
        location: JSON.parse(location || "{}"),
        deadline: new Date(deadline),
        images,
        tags: tags ? JSON.parse(tags) : [],
      })

      await request.save()
      await request.populate("receiver", "name organization profileImage")

      res.status(201).json({
        message: "Request created successfully",
        request,
      })
    } catch (error) {
      console.error("Error creating request:", error)
      res.status(500).json({ message: "Server error" })
    }
  },
)

// Get requests by current user
router.get("/user/my-requests", authenticateToken, authorizeRole("receiver"), async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const requests = await Request.find({ receiver: req.user._id }).sort({ createdAt: -1 }).skip(skip).limit(limit)

    const total = await Request.countDocuments({ receiver: req.user._id })

    res.json({
      requests,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      },
    })
  } catch (error) {
    console.error("Error fetching user requests:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
