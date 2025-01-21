const express = require("express");
const { protect } = require("../middleware/protect");
const Tournament = require("../models/TournamentDetail");

const router = express.Router();

// Create a new tournament
router.post("/", protect, async (req, res) => {
  try {
    // Ensure only organizers can access this route
    if (req.user.role !== "organizer") {
      return res.status(403).json({ message: "Access denied. Organizer only." });
    }

    // Create a new tournament with the organizer's ID
    const tournament = new Tournament({
      ...req.body,
      organizer: req.user.id, // Attach authenticated organizer's ID
    });

    await tournament.save();
    res.status(201).json({
      message: "Tournament created successfully.",
      tournament,
    });
  } catch (error) {
    console.error("Error creating tournament:", error.message);
    res.status(500).json({ message: "An error occurred while creating the tournament." });
  }
});

// Fetch all tournaments
router.get("/", async (req, res) => {
  try {
    const tournaments = await Tournament.find().populate(
      "organizer", // Populate organizer field
      "username email" // Return only username and email fields
    );
    res.status(200).json(tournaments);
  } catch (error) {
    console.error("Error fetching tournaments:", error.message);
    res.status(500).json({ message: "An error occurred while fetching tournaments." });
  }
});

module.exports = router;
