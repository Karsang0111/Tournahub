const express = require("express");
const mongoose = require("mongoose");
const { protect } = require("../middleware/protect");
const Participant = require("../models/Participant");
const Tournament = require("../models/TournamentDetail");

const router = express.Router();

/**
 * 🎯 Register a participant for a tournament
 */
router.post("/", protect, async (req, res) => {
  try {
    if (!req.user || req.user.role !== "player") {
      return res.status(403).json({ message: "Only players can join tournaments." });
    }

    const { tournamentId, teamName, contactNumber } = req.body;

    // Validate required fields
    if (!tournamentId || !teamName || !contactNumber) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate contact number format
    if (!/^[0-9]{10}$/.test(contactNumber)) {
      return res.status(400).json({ message: "Contact number must be a valid 10-digit number." });
    }

    // Find tournament by ID or Name (case-insensitive)
    const tournament = mongoose.isValidObjectId(tournamentId)
      ? await Tournament.findById(tournamentId)
      : await Tournament.findOne({ name: new RegExp(`^${tournamentId}$`, "i") });

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found." });
    }

    // Check if participant has already joined
    const existingParticipant = await Participant.findOne({
      player: req.user.id,
      tournament: tournament._id,
    });

    if (existingParticipant) {
      return res.status(400).json({ message: "You have already joined this tournament." });
    }

    // Register new participant
    const participant = new Participant({
      player: req.user.id,
      tournament: tournament._id,
      teamName,
      contactNumber,
    });

    await participant.save();
    return res.status(201).json({ message: "Successfully joined the tournament!", participant });

  } catch (error) {
    console.error("[SERVER ERROR] Error registering participant:", error.message);
    return res.status(500).json({ message: "Error joining tournament: " + error.message });
  }
});

/**
 * 🎯 Fetch all tournaments the player has joined
 */
router.get("/my-tournaments", protect, async (req, res) => {
  try {
    if (!req.user || req.user.role !== "player") {
      return res.status(403).json({ message: "Only players can access this information." });
    }

    const joinedTournaments = await Participant.find({ player: req.user.id })
      .populate("tournament", "name description scheduleDate startDate endDate prizeMoney payment")
      .populate("player", "username email");

    if (!joinedTournaments.length) {
      return res.status(404).json({ message: "No joined tournaments found." });
    }

    return res.status(200).json(joinedTournaments);
  } catch (error) {
    console.error("[SERVER ERROR] Error fetching tournaments:", error.message);
    return res.status(500).json({ message: "Error fetching joined tournaments: " + error.message });
  }
});

/**
 * 🎯 Fetch details of a specific participant for a tournament
 */
router.get("/my-team/:tournamentId", protect, async (req, res) => {
  try {
    const { tournamentId } = req.params;

    if (!req.user || req.user.role !== "player") {
      return res.status(403).json({ message: "Only players can access this information." });
    }

    const tournament = mongoose.isValidObjectId(tournamentId)
      ? await Tournament.findById(tournamentId)
      : await Tournament.findOne({ name: new RegExp(`^${tournamentId}$`, "i") });

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found." });
    }

    const participant = await Participant.findOne({
      player: req.user.id,
      tournament: tournament._id,
    })
      .populate("tournament", "name description scheduleDate startDate endDate prizeMoney payment")
      .populate("player", "username email");

    if (!participant) {
      return res.status(404).json({ message: "You have not joined this tournament." });
    }

    return res.status(200).json(participant);
  } catch (error) {
    console.error("[SERVER ERROR] Error fetching participant details:", error.message);
    return res.status(500).json({ message: "Error fetching participant details: " + error.message });
  }
});

/**
 * 🎯 Generate brackets based on team names
 */
router.get("/brackets/:tournamentId", async (req, res) => {
  try {
    const { tournamentId } = req.params;

    const formattedName = tournamentId.replace(/-/g, " ");

    const tournament = mongoose.isValidObjectId(tournamentId)
      ? await Tournament.findById(tournamentId)
      : await Tournament.findOne({ name: new RegExp(`^${formattedName}$`, "i") });

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found." });
    }

    const participants = await Participant.find({ tournament: tournament._id }).select("teamName");

    if (participants.length < 2) {
      return res.status(400).json({ message: "Not enough participants to generate brackets." });
    }

    const teamNames = participants.map((p) => p.teamName);
    teamNames.sort(() => Math.random() - 0.5);

    const generateBrackets = (teams) => {
      const rounds = [];
      let currentRound = [...teams];

      while (currentRound.length > 1) {
        const nextRound = [];
        const currentMatches = [];

        for (let i = 0; i < currentRound.length; i += 2) {
          if (i + 1 < currentRound.length) {
            currentMatches.push({ team1: currentRound[i], team2: currentRound[i + 1] });
          } else {
            currentMatches.push({ team1: currentRound[i], team2: "Bye" });
          }
        }

        rounds.push(currentMatches);
        nextRound.push(...currentMatches.map((match) => match.team1));
        currentRound = nextRound.filter((team) => team !== "Bye");
      }

      return rounds;
    };

    const brackets = generateBrackets(teamNames);

    return res.status(200).json({ tournament: tournament.name, brackets });

  } catch (error) {
    console.error("[SERVER ERROR] Error generating brackets:", error.message);
    return res.status(500).json({ message: "Error generating brackets: " + error.message });
  }
});

module.exports = router;
