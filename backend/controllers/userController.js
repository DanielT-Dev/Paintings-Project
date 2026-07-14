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


// CREATE user
const createUser = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
        } = req.body;


        logger.info("Creating user", {
            username,
            email,
        });


        if (!username || !email || !password) {
            logger.warn("Missing required user fields");

            return res.status(400).json({
                message: "Username, email and password are required",
            });
        }


        const existingUser = await User.findOne({
            $or: [
                { username },
                { email },
            ],
        });


        if (existingUser) {
            logger.warn("User already exists", {
                username,
                email,
            });

            return res.status(409).json({
                message: "Username or email already exists",
            });
        }


        const user = await User.create({
            username,
            email,
            password,
        });


        logger.info("User created successfully", {
            userId: user._id,
            username: user.username,
        });


        res.status(201).json(user);

    } catch (err) {
        logger.error("Failed to create user", {
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
    createUser,
};