const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Helper function to generate a JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token expires in 30 days
  });
};

// Register Route
router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const user = await User.create({ username, email, password, role });

    // Generate JWT for the user
    const token = generateToken(user._id, role);

    // Respond with user data and token
    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    console.error("Error during registration:", err.message);
    res.status(500).json({ message: "Error registering user. Please try again later." });
  }
});

// Player Login Route
router.post("/player-login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists and has the role "player"
    const user = await User.findOne({ username, role: "player" });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT for the user
    const token = generateToken(user._id, "player");

    // Respond with user data and token
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: "player",
      token,
    });
  } catch (err) {
    console.error("Error during player login:", err.message);
    res.status(500).json({ message: "Error logging in player. Please try again later." });
  }
});

// Organizer Login Route
router.post("/organizer-login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists and has the role "organizer"
    const user = await User.findOne({ username, role: "organizer" });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT for the user
    const token = generateToken(user._id, "organizer");

    // Respond with user data and token
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: "organizer",
      token,
    });
  } catch (err) {
    console.error("Error during organizer login:", err.message);
    res.status(500).json({ message: "Error logging in organizer. Please try again later." });
  }
});
router.post("/admin-login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, role: "admin" });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id, "admin");

    res.status(200).json({
      id: user._id,
      username: user.username,
      role: "admin",
      token,
    });
  } catch (err) {
    console.error("Error during admin login:", err.message);
    res.status(500).json({ message: "Error logging in admin. Please try again later." });
  }
});

// 🔹 Spectator Login Route
router.post("/spectator-login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, role: "spectator" });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id, "spectator");

    res.status(200).json({
      id: user._id,
      username: user.username,
      role: "spectator",
      token,
    });
  } catch (err) {
    console.error("Error during spectator login:", err.message);
    res.status(500).json({ message: "Error logging in spectator. Please try again later." });
  }
});

module.exports = router;
