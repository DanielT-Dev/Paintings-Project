const Painting = require("../models/Painting");
const logger = require("../utils/logger");

// GET all paintings
const getPaintings = async (req, res) => {
  try {
    logger.info("Fetching all paintings");

    const paintings = await Painting.find();

    logger.info("Paintings fetched successfully", {
      count: paintings.length,
    });

    res.json(paintings);
  } catch (err) {
    logger.error("Failed to fetch paintings", {
      error: err,
    });

    res.status(500).json({
      message: "Server error",
    });
  }
};

// GET single painting
const getPaintingById = async (req, res) => {
  try {
    logger.info("Fetching painting", {
      paintingId: req.params.id,
    });

    const painting = await Painting.findById(req.params.id).populate(
      "relatedPaintings"
    );

    if (!painting) {
      logger.warn("Painting not found", {
        paintingId: req.params.id,
      });

      return res.status(404).json({
        message: "Painting not found",
      });
    }

    logger.info("Painting fetched successfully", {
      paintingId: painting._id,
      title: painting.title,
      relatedCount: painting.relatedPaintings?.length || 0,
    });

    res.json(painting);
  } catch (err) {
    logger.error("Failed to fetch painting", {
      paintingId: req.params.id,
      error: err,
    });

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getPaintings,
  getPaintingById,
};