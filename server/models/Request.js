const mongoose = require("mongoose")

const requestSchema = new mongoose.Schema({
  receiver: {
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
  urgency: {
    type: String,
    required: true,
    enum: ["low", "medium", "high"],
  },
  beneficiaries: {
    count: {
      type: Number,
      required: true,
      min: 1,
    },
    ageGroup: {
      type: String,
      enum: ["children", "adults", "elderly", "mixed"],
    },
    description: String,
  },
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
  deadline: {
    type: Date,
    required: true,
  },
  images: [
    {
      url: String,
      alt: String,
    },
  ],
  status: {
    type: String,
    enum: ["active", "matched", "fulfilled", "cancelled"],
    default: "active",
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
requestSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

// Index for search functionality
requestSchema.index({ title: "text", description: "text", tags: "text" })
requestSchema.index({ category: 1, status: 1 })
requestSchema.index({ urgency: 1, deadline: 1 })
requestSchema.index({ "location.city": 1, "location.state": 1 })

module.exports = mongoose.model("Request", requestSchema)
