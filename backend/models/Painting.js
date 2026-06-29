const mongoose = require("mongoose");

const paintingSchema = new mongoose.Schema(
  {
    title: String,
    artist: String,
    year: Number,
    medium: String,
    description: String,
    imageUrls: [String],
    tags: [String],
    relatedPaintings: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Painting", paintingSchema);