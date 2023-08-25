const express = require("express");
const { registerUser, login } = require("../controllers/authController");
const { body } = require("express-validator");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", body("username").trim(), login);

module.exports = router;
