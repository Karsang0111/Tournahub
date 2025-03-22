const Tournament = require("../models/Tournament");

// Controller to handle tournament creation
const createTournament = async (req, res) => {
  try {
    const {
      name,
      description,
      scheduleDate,
      startDate,
      endDate,
      prizeMoney,
      payment,
      organizer, // make sure to pass this from frontend or middleware
    } = req.body;

    // Validate request body
    if (
      !name ||
      !description ||
      !scheduleDate ||
      !startDate ||
      !endDate ||
      !prizeMoney ||
      payment === undefined ||
      !organizer
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create new tournament
    const newTournament = new Tournament({
      name,
      description,
      scheduleDate,
      startDate,
      endDate,
      prizeMoney,
      payment,
      organizer,
    });

    // Save to database
    await newTournament.save();

    res.status(201).json({
      message: "Tournament created successfully!",
      tournament: newTournament,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Controller to fetch all tournaments
const getAllTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find().populate("organizer", "name email"); // Optional: populate organizer info
    res.status(200).json(tournaments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = {
  createTournament,
  getAllTournaments,
};
