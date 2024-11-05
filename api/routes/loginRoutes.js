const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    console.log("User not found", username);
    if (!user) return res.status(401).send("User not found");

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      console.log("Invalid credentials for user:", username);
      return res.status(401).send("Invalid credentials");
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Server error");
  }
});

router.get("/login", (req, res) => {
  res.send("<h1>Login Page</h1><h3>Welcome to music finder</h3>");
});

module.exports = router;
