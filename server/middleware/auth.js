const jwt = require("jsonwebtoken")
const User = require("../models/User")

// Verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1] // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: "Access token required" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.userId).select("-password")

    if (!user) {
      return res.status(401).json({ message: "Invalid token" })
    }

    if (!user.isActive) {
      return res.status(401).json({ message: "Account deactivated" })
    }

    req.user = user
    next()
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" })
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" })
    }
    return res.status(500).json({ message: "Server error" })
  }
}

// Check user role
const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Required role: ${roles.join(" or ")}`,
      })
    }

    next()
  }
}

// Check if user owns resource or is admin
const authorizeOwnerOrAdmin = (resourceUserField = "user") => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" })
    }

    // Admin can access everything
    if (req.user.role === "admin") {
      return next()
    }

    // Check if user owns the resource
    const resourceUserId = req[resourceUserField] || req.body[resourceUserField]
    if (resourceUserId && resourceUserId.toString() === req.user._id.toString()) {
      return next()
    }

    return res.status(403).json({ message: "Access denied" })
  }
}

module.exports = {
  authenticateToken,
  authorizeRole,
  authorizeOwnerOrAdmin,
}
