const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createRefreshToken = (res, userData) => {
  const id = userData.id;
  const token = jwtToken(id);

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + process.env.BROWSER_COOKIES_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
  });

  statusFunc(res, 201, token);
};

const jwtToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

const statusFunc = (res, statusCode, token) => {
  res.status(statusCode).json({
    message: "Request successful",
    token,
  });
};

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, role, contactNumber } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ username, email, password, role, contactNumber });
    await newUser.save();

    createRefreshToken(res, newUser);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch) return res.status(400).json({ message: "Invalid email or password" });

    createRefreshToken(res, user);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username, email, password, role, contactNumber } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (password) {
      user.password = password;
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (role) user.role = role;
    if (contactNumber) user.contactNumber = contactNumber;

    await user.save();
    res.json({ message: "User updated", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logoutUser = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};