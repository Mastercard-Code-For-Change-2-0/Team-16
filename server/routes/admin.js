const express = require("express")
const User = require("../models/User")
const Donation = require("../models/Donation")
const Request = require("../models/Request")
const { authenticateToken, authorizeRole } = require("../middleware/auth")

const router = express.Router()

// Get dashboard statistics
router.get("/stats", authenticateToken, authorizeRole("admin"), async (req, res) => {
  try {
    const [totalUsers, totalDonations, totalRequests, activeMatches] = await Promise.all([
      User.countDocuments(),
      Donation.countDocuments(),
      Request.countDocuments(),
      // Assuming we have a Match model
      Donation.countDocuments({ status: "matched" }),
    ])

    const usersByRole = await User.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } },
      { $project: { role: "$_id", count: 1, _id: 0 } },
    ])

    const donationsByCategory = await Donation.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $project: { category: "$_id", count: 1, _id: 0 } },
    ])

    const recentActivity = await Donation.find()
      .populate("donor", "name organization")
      .sort({ createdAt: -1 })
      .limit(10)
      .select("title category createdAt donor")

    res.json({
      stats: {
        totalUsers,
        totalDonations,
        totalRequests,
        activeMatches,
      },
      usersByRole,
      donationsByCategory,
      recentActivity,
    })
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get all users with pagination
router.get("/users", authenticateToken, authorizeRole("admin"), async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 20
    const skip = (page - 1) * limit

    const filter = {}
    if (req.query.role) filter.role = req.query.role
    if (req.query.isActive !== undefined) filter.isActive = req.query.isActive === "true"

    const users = await User.find(filter).select("-password").sort({ createdAt: -1 }).skip(skip).limit(limit)

    const total = await User.countDocuments(filter)

    res.json({
      users,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      },
    })
  } catch (error) {
    console.error("Error fetching users:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Toggle user active status
router.put("/users/:id/toggle-status", authenticateToken, authorizeRole("admin"), async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    user.isActive = !user.isActive
    await user.save()

    res.json({
      message: `User ${user.isActive ? "activated" : "deactivated"} successfully`,
      user: { id: user._id, name: user.name, isActive: user.isActive },
    })
  } catch (error) {
    console.error("Error toggling user status:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Generate reports
router.get("/reports/:type", authenticateToken, authorizeRole("admin"), async (req, res) => {
  try {
    const { type } = req.params
    const { startDate, endDate } = req.query

    const dateFilter = {}
    if (startDate && endDate) {
      dateFilter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      }
    }

    let reportData = {}

    switch (type) {
      case "donations":
        reportData = await Donation.aggregate([
          { $match: dateFilter },
          {
            $group: {
              _id: {
                category: "$category",
                status: "$status",
              },
              count: { $sum: 1 },
              totalQuantity: { $sum: "$quantity" },
            },
          },
          {
            $group: {
              _id: "$_id.category",
              statuses: {
                $push: {
                  status: "$_id.status",
                  count: "$count",
                  totalQuantity: "$totalQuantity",
                },
              },
              totalCount: { $sum: "$count" },
            },
          },
        ])
        break

      case "users":
        reportData = await User.aggregate([
          { $match: dateFilter },
          {
            $group: {
              _id: {
                role: "$role",
                month: { $month: "$createdAt" },
                year: { $year: "$createdAt" },
              },
              count: { $sum: 1 },
            },
          },
          { $sort: { "_id.year": 1, "_id.month": 1 } },
        ])
        break

      case "impact":
        const [donationsCompleted, requestsFulfilled] = await Promise.all([
          Donation.countDocuments({ ...dateFilter, status: "completed" }),
          Request.countDocuments({ ...dateFilter, status: "fulfilled" }),
        ])
        reportData = {
          donationsCompleted,
          requestsFulfilled,
          impactScore: donationsCompleted + requestsFulfilled,
        }
        break

      default:
        return res.status(400).json({ message: "Invalid report type" })
    }

    res.json({
      reportType: type,
      dateRange: { startDate, endDate },
      data: reportData,
      generatedAt: new Date(),
    })
  } catch (error) {
    console.error("Error generating report:", error)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router
