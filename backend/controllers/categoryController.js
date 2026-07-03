const Category = require("../models/Category");
const logger = require("../utils/logger");

// GET all categories
const getCategories = async (req, res) => {
  try {
    logger.info("Fetching all categories");

    const categories = await Category.find().sort({ name: 1 });

    logger.info("Categories fetched successfully", {
      count: categories.length,
    });

    res.json(categories);
  } catch (err) {
    logger.error("Failed to fetch categories", {
    error: err,
    });

    res.status(500).json({
      message: "Server error",
    });
  }
};

// GET category by ID
const getCategoryById = async (req, res) => {
  try {
    logger.info("Fetching category", {
      categoryId: req.params.id,
    });

    const category = await Category.findById(req.params.id);

    if (!category) {
      logger.warn("Category not found", {
        categoryId: req.params.id,
      });

      return res.status(404).json({
        message: "Category not found",
      });
    }

    logger.info("Category fetched successfully", {
      categoryId: category._id,
      name: category.name,
    });

    res.json(category);
  } catch (err) {
    logger.error("Failed to fetch category", {
      categoryId: req.params.id,
      error: err,
    });

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
};