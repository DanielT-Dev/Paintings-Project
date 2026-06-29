const Painting = require("../models/Painting");

// GET all paintings
const getPaintings = async (req, res) => {
  try {
    const paintings = await Painting.find();
    res.json(paintings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET single painting
const getPaintingById = async (req, res) => {
  try {
    const painting = await Painting.findById(req.params.id);

    if (!painting) {
      return res.status(404).json({ message: "Painting not found" });
    }

    const related = await Painting.find({
      _id: { $in: painting.relatedPaintings }
    });

    res.json({ ...painting.toObject(), relatedPaintings: related });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getPaintings,
  getPaintingById
};