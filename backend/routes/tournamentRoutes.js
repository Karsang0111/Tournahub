const express = require("express");
const { protect } = require("../middleware/protect");
const Tournament = require("../models/TournamentDetail");

const router = express.Router();

// Create a new tournament
router.post("/", protect, async (req, res) => {
  try {
    // Only organizers allowed
    if (req.user.role !== "organizer") {
      return res.status(403).json({ message: "Access denied. Organizer only." });
    }

    const {
      name,
      description,
      scheduleDate,
      startDate,
      endDate,
      prizeMoney,
      payment,
    } = req.body;

    // Validate required fields
    if (!name || !description || !scheduleDate || !startDate || !endDate || !prizeMoney || !payment) {
      return res.status(400).json({ message: "All tournament fields are required." });
    }

    // Create and save the tournament
    const tournament = new Tournament({
      name,
      description,
      scheduleDate,
      startDate,
      endDate,
      prizeMoney,
      payment,
      organizer: req.user.id, // Organizer ID from token
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
      "organizer", // Foreign key population
      "username email" // Only return selected fields
    );
    res.status(200).json(tournaments);
  } catch (error) {
    console.error("Error fetching tournaments:", error.message);
    res.status(500).json({ message: "An error occurred while fetching tournaments." });
  }
});

module.exports = router;
