const mongoose = require("mongoose");

const relatedPaintingSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Painting",
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const paintingSchema = new mongoose.Schema(
  {
    title: String,
    artist: String,
    year: Number,
    medium: String,
    description: String,
    imageUrls: [String],
    tags: [String],

    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],

    relatedPaintings: [relatedPaintingSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Painting", paintingSchema);