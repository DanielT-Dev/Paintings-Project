const express = require("express");
const {
  getPaintings,
  getPaintingById,
} = require("../controllers/paintingController");

const router = express.Router();

router.get("/", getPaintings);
router.get("/:id", getPaintingById);

module.exports = router;