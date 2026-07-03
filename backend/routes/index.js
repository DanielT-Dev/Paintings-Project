const express = require("express");

const router = express.Router();

// API modules
router.use("/paintings", require("./paintingRoutes"));
router.use("/categories", require("./categoryRoutes"));

module.exports = router;