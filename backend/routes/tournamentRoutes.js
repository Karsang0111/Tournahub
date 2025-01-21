const express = require("express");
const Tournament = require("../models/TournamentDetail");
const { protect } = require("../middleware/protect"); // Import the middleware

const router = express.Router();

// Create a new tournament (protected route)
router.post("/", protect, async (req, res) => {
  try {
    const tournament = new Tournament({
      ...req.body,
      organizer: req.user._id, // Associate the tournament with the logged-in organizer
    });
    await tournament.save();
    res.status(201).json(tournament);
  } catch (error) {
    console.error("Error saving tournament:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// Fetch all tournaments
router.get("/", async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.status(200).json(tournaments);
  } catch (error) {
    console.error("Error fetching tournaments:", error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
