const express = require("express");

const { getAllUsers, signup, login } = require("../controllers/authController");

const router = express.Router();

router.get("/allusers", getAllUsers);
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;