const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register User
const registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "Username already taken." });
    }

    // Create new user
    const user = await User.create({ username, password, role });
    const token = generateToken(user._id);

    res.status(201).json({
      id: user._id,
      username: user.username,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    res.status(200).json({
      id: user._id,
      username: user.username,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again." });
  }
};

module.exports = { registerUser, loginUser };
