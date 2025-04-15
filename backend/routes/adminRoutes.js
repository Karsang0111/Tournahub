const express = require("express");
const User = require("../models/User");
const { protect, adminOnly } = require("../middleware/protect"); // Ensure only admin accesses
const router = express.Router();

// ✅ Get All Users (Admin Only)
router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude passwords for security
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// ✅ Delete User by ID (Admin Only)
router.delete("/users/:id", protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

// ✅ Update User Role (Admin Only)
router.put("/users/:id", protect, adminOnly, async (req, res) => {
  const { role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating user role" });
  }
});

module.exports = router;
