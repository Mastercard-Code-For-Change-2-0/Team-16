const express = require("express")
const { body, validationResult, query } = require("express-validator")
const Donation = require("../models/Donation")
const { authenticateToken, authorizeRole } = require("../middleware/auth")
const multer = require("multer")
const path = require("path")

const router = express.Router()

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/donations/")
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, "donation-" + uniqueSuffix + path.extname(file.originalname))
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
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

// Get all donations with filtering and pagination
router.get(
  "/",
  [
    query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
    query("limit").optional().isInt({ min: 1, max: 50 }).withMessage("Limit must be between 1 and 50"),
    query("category")
      .optional()
      .isIn(["food", "clothes", "books", "stationery", "furniture", "electronics", "medical", "toys", "other"]),
    query("status").optional().isIn(["available", "matched", "completed", "cancelled"]),
    query("city").optional().trim(),
    query("state").optional().trim(),
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

      // Build filter object
      const filter = {}
      if (req.query.category) filter.category = req.query.category
      if (req.query.status) filter.status = req.query.status
      if (req.query.city) filter["location.city"] = new RegExp(req.query.city, "i")
      if (req.query.state) filter["location.state"] = new RegExp(req.query.state, "i")
      if (req.query.search) {
        filter.$text = { $search: req.query.search }
      }

      const donations = await Donation.find(filter)
        .populate("donor", "name organization profileImage")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)

      const total = await Donation.countDocuments(filter)

      res.json({
        donations,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
        },
      })
    } catch (error) {
      console.error("Error fetching donations:", error)
      res.status(500).json({ message: "Server error" })
    }
  },
)

// Get single donation by ID
router.get("/:id", async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id).populate(
      "donor",
      "name organization profileImage phone email",
    )

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" })
    }

    // Increment view count
    donation.views += 1
    await donation.save()

    res.json({ donation })
  } catch (error) {
    console.error("Error fetching donation:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Create new donation
router.post(
  "/",
  authenticateToken,
  authorizeRole("donor"),
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
    body("unit").isIn(["pieces", "kg", "liters", "boxes", "sets", "bags"]),
    body("condition").isIn(["new", "like-new", "good", "fair"]),
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
        condition,
        location,
        availability,
        urgency,
        tags,
      } = req.body

      // Process uploaded images
      const images = req.files
        ? req.files.map((file) => ({
            url: `/uploads/donations/${file.filename}`,
            alt: `${title} - ${category}`,
          }))
        : []

      const donation = new Donation({
        donor: req.user._id,
        title,
        description,
        category,
        subcategory,
        quantity,
        unit,
        condition,
        images,
        location: JSON.parse(location || "{}"),
        availability: JSON.parse(availability || "{}"),
        urgency: urgency || "medium",
        tags: tags ? JSON.parse(tags) : [],
      })

      await donation.save()
      await donation.populate("donor", "name organization profileImage")

      res.status(201).json({
        message: "Donation created successfully",
        donation,
      })
    } catch (error) {
      console.error("Error creating donation:", error)
      res.status(500).json({ message: "Server error" })
    }
  },
)

// Update donation
router.put(
  "/:id",
  authenticateToken,
  upload.array("images", 5),
  [
    body("title").optional().trim().isLength({ min: 5 }).withMessage("Title must be at least 5 characters"),
    body("description")
      .optional()
      .trim()
      .isLength({ min: 20 })
      .withMessage("Description must be at least 20 characters"),
    body("quantity").optional().isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const donation = await Donation.findById(req.params.id)

      if (!donation) {
        return res.status(404).json({ message: "Donation not found" })
      }

      // Check if user owns the donation or is admin
      if (donation.donor.toString() !== req.user._id.toString() && req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" })
      }

      // Update fields
      const allowedUpdates = [
        "title",
        "description",
        "quantity",
        "condition",
        "location",
        "availability",
        "urgency",
        "tags",
        "status",
      ]
      const updates = {}

      Object.keys(req.body).forEach((key) => {
        if (allowedUpdates.includes(key)) {
          if (key === "location" || key === "availability" || key === "tags") {
            updates[key] = JSON.parse(req.body[key])
          } else {
            updates[key] = req.body[key]
          }
        }
      })

      // Handle new images
      if (req.files && req.files.length > 0) {
        const newImages = req.files.map((file) => ({
          url: `/uploads/donations/${file.filename}`,
          alt: `${updates.title || donation.title} - ${donation.category}`,
        }))
        updates.images = [...donation.images, ...newImages]
      }

      const updatedDonation = await Donation.findByIdAndUpdate(req.params.id, updates, {
        new: true,
        runValidators: true,
      }).populate("donor", "name organization profileImage")

      res.json({
        message: "Donation updated successfully",
        donation: updatedDonation,
      })
    } catch (error) {
      console.error("Error updating donation:", error)
      res.status(500).json({ message: "Server error" })
    }
  },
)

// Delete donation
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id)

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" })
    }

    // Check if user owns the donation or is admin
    if (donation.donor.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" })
    }

    await Donation.findByIdAndDelete(req.params.id)

    res.json({ message: "Donation deleted successfully" })
  } catch (error) {
    console.error("Error deleting donation:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get donations by current user
router.get("/user/my-donations", authenticateToken, authorizeRole("donor"), async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const donations = await Donation.find({ donor: req.user._id }).sort({ createdAt: -1 }).skip(skip).limit(limit)

    const total = await Donation.countDocuments({ donor: req.user._id })

    res.json({
      donations,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      },
    })
  } catch (error) {
    console.error("Error fetching user donations:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
