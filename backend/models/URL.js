const mongoose = require('mongoose');

const clickDetailSchema = new mongoose.Schema({
  ipAddress: String,
  device: String, // e.g., 'Mobile', 'Desktop'
  browser: String,
  clickedAt: {
    type: Date,
    default: Date.now,
  },
});

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  deviceBreakdown: {
    type: Map,
    of: Number,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
  },
  clickDetails: [clickDetailSchema], 
});

module.exports = mongoose.model("Url", urlSchema);
