const mongoose = require( 'mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortId: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Url", urlSchema);
