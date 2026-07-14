const express = require("express");

const {
    getUsers,
    getUserById,
    createUser,
} = require("../controllers/userController");

const router = express.Router();


// CREATE user
router.post("/", createUser);


// GET all users
router.get("/", getUsers);


// GET single user
router.get("/:id", getUserById);


module.exports = router;