const express = require("express");
const router = express.Router();
const {
    getUsers,
    getUserById,
    fetchUserPayments,
} = require("../controllers/adminUserController");

// Get all users
router.get("/", getUsers);

// Get single user
router.get("/:id", getUserById);

// Get user payments
router.get("/:id/payments", fetchUserPayments);

module.exports = router;
