const Painting = require("../models/Painting");
const Category = require("../models/Category");
const logger = require("../utils/logger");

// GET all paintings
const getPaintings = async (req, res) => {
    try {
        const { category, search } = req.query;

        logger.info("Fetching paintings", {
            category,
            search,
        });

        let filter = {};

        // ---------------------------------------------------------------------
        // CATEGORY FILTER (by slug)
        // ---------------------------------------------------------------------
        if (category) {
            const categoryDoc = await Category.findOne({
                slug: category.trim().toLowerCase(),
            });

            if (!categoryDoc) {
                logger.warn("Category not found", { category });

                return res.status(404).json({
                    message: "Category not found",
                });
            }

            filter.categories = categoryDoc._id;
        }

        // ---------------------------------------------------------------------
        // SEARCH FILTER (FIXED + ADDED)
        // ---------------------------------------------------------------------
        if (search && search.trim() !== "") {
            const q = search.trim();

            filter.$or = [
                { title: { $regex: q, $options: "i" } },
                { artist: { $regex: q, $options: "i" } },
                { description: { $regex: q, $options: "i" } },
            ];
        }

        const paintings = await Painting.find(filter).populate("categories");

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

        const painting = await Painting.findById(req.params.id)
            .populate("categories")
            .populate("relatedPaintings.id");

        if (!painting) {
            logger.warn("Painting not found", {
                paintingId: req.params.id,
            });

            return res.status(404).json({
                message: "Painting not found",
            });
        }

        const formattedPainting = {
            ...painting.toObject(),
            relatedPaintings: painting.relatedPaintings
                .map((r) => {
                    if (!r.id) return null;

                    return {
                        score: r.score,
                        ...r.id.toObject(),
                    };
                })
                .filter(Boolean),
        };

        logger.info("Painting fetched successfully", {
            paintingId: painting._id,
            title: painting.title,
            relatedCount:
                formattedPainting.relatedPaintings.length,
        });

        res.json(formattedPainting);
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