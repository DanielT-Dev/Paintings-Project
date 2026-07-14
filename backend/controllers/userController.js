const User = require("../models/User");
const logger = require("../utils/logger");

// GET all users
const getUsers = async (req, res) => {
    try {
        logger.info("Fetching users");

        const users = await User.find()
            .populate("favoritePaintings");

        logger.info("Users fetched successfully", {
            count: users.length,
        });

        res.json(users);
    } catch (err) {
        logger.error("Failed to fetch users", {
            error: err,
        });

        res.status(500).json({
            message: "Server error",
        });
    }
};

// GET single user
const getUserById = async (req, res) => {
    try {
        logger.info("Fetching user", {
            userId: req.params.id,
        });

        const user = await User.findById(req.params.id)
            .populate("favoritePaintings");

        if (!user) {
            logger.warn("User not found", {
                userId: req.params.id,
            });

            return res.status(404).json({
                message: "User not found",
            });
        }

        logger.info("User fetched successfully", {
            userId: user._id,
            username: user.username,
        });

        res.json(user);
    } catch (err) {
        logger.error("Failed to fetch user", {
            userId: req.params.id,
            error: err,
        });

        res.status(500).json({
            message: "Server error",
        });
    }
};

module.exports = {
    getUsers,
    getUserById,
};