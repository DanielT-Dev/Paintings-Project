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
    relatedPaintings: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Painting",
        },
        score: Number,
      },
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Painting", paintingSchema);