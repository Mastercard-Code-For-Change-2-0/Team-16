const mongoose = require("mongoose")

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["food", "clothes", "books", "stationery", "furniture", "electronics", "medical", "toys", "other"],
  },
  subcategory: {
    type: String,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  unit: {
    type: String,
    required: true,
    enum: ["pieces", "kg", "liters", "boxes", "sets", "bags"],
  },
  condition: {
    type: String,
    required: true,
    enum: ["new", "like-new", "good", "fair"],
  },
  images: [
    {
      url: String,
      alt: String,
    },
  ],
  location: {
    address: String,
    city: String,
    state: String,
    pincode: String,
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
  },
  availability: {
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: Date,
    timeSlots: [
      {
        day: String,
        startTime: String,
        endTime: String,
      },
    ],
  },
  status: {
    type: String,
    enum: ["available", "matched", "completed", "cancelled"],
    default: "available",
  },
  urgency: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  tags: [String],
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Update the updatedAt field before saving
donationSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

// Index for search functionality
donationSchema.index({ title: "text", description: "text", tags: "text" })
donationSchema.index({ category: 1, status: 1 })
donationSchema.index({ "location.city": 1, "location.state": 1 })

module.exports = mongoose.model("Donation", donationSchema)
