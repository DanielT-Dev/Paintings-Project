const express = require("express");

const {
    getUsers,
    getUserById,
    createUser,
    loginUser,
} = require("../controllers/userController");


const router = express.Router();


// CREATE ACCOUNT
router.post("/", createUser);


// LOGIN
router.post("/login", loginUser);


// GET USERS
router.get("/", getUsers);


// GET USER
router.get("/:id", getUserById);



module.exports = router;