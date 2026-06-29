const paintings = require("../data/paintings");

// GET all paintings
const getPaintings = (req, res) => {
  res.json(paintings);
};

// GET single painting
const getPaintingById = (req, res) => {
  const painting = paintings.find(p => p.id === req.params.id);

  if (!painting) {
    return res.status(404).json({ message: "Painting not found" });
  }

  const related = paintings.filter(p =>
    painting.relatedPaintings.includes(p.id)
  );

  res.json({
    ...painting,
    relatedPaintings: related
  });
};

module.exports = {
  getPaintings,
  getPaintingById
};