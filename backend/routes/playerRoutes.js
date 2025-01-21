const express = require("express");
const { protect } = require("../middleware/protect");
const Participant = require("../models/Participant");
const Tournament = require("../models/TournamentDetail");

const router = express.Router();

// Register a participant for a tournament
router.post("/", protect, async (req, res) => {
  try {
    // Ensure the user is authenticated and has the correct role
    if (!req.user || req.user.role !== "player") {
      console.error(`[JOIN ERROR] Unauthorized access. User (${req.user?.id || "unknown"}) is not a player.`);
      return res.status(403).json({ message: "Only players can join tournaments." });
    }

    const { tournamentId, teamName, contactNumber } = req.body;

    // Validate all required fields
    if (!tournamentId || !teamName || !contactNumber) {
      console.error("[VALIDATION ERROR] Missing required fields.");
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate contact number format
    const contactNumberRegex = /^[0-9]{10}$/;
    if (!contactNumberRegex.test(contactNumber)) {
      console.error(`[VALIDATION ERROR] Invalid contact number: ${contactNumber}`);
      return res.status(400).json({ message: "Contact number must be a valid 10-digit number." });
    }

    // Check if the tournament exists
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      console.error(`[NOT FOUND] Tournament not found for ID: ${tournamentId}`);
      return res.status(404).json({ message: "Tournament not found." });
    }

    // Prevent duplicate participation
    const existingParticipant = await Participant.findOne({
      player: req.user.id,
      tournament: tournamentId,
    });
    if (existingParticipant) {
      console.error(`[DUPLICATE ENTRY] User (${req.user.id}) already joined tournament (${tournamentId}).`);
      return res.status(400).json({ message: "You have already joined this tournament." });
    }

    // Register participant
    const participant = new Participant({
      player: req.user.id,
      tournament: tournamentId,
      teamName,
      contactNumber,
    });

    await participant.save();

    console.log(`[SUCCESS] Participant successfully registered with ID: ${participant._id}`);
    return res.status(201).json({
      message: "Successfully joined the tournament!",
      participant,
    });
  } catch (error) {
    console.error("[SERVER ERROR] Error while registering participant:", error.message);
    return res.status(500).json({ message: "Error joining tournament: " + error.message });
  }
});

// Fetch all tournaments the player has joined
router.get("/my-tournaments", protect, async (req, res) => {
  try {
    // Ensure the user is authenticated and has the correct role
    if (!req.user || req.user.role !== "player") {
      console.error(`[ACCESS DENIED] User (${req.user?.id || "unknown"}) is not a player.`);
      return res.status(403).json({ message: "Only players can access this information." });
    }

    // Fetch all tournaments the player has joined
    const joinedTournaments = await Participant.find({ player: req.user.id })
      .populate("tournament", "name description scheduleDate prizeMoney")
      .populate("player", "username email");

    if (!joinedTournaments || joinedTournaments.length === 0) {
      console.log(`[NO PARTICIPATIONS] No tournaments found for user (${req.user.id}).`);
      return res.status(404).json({ message: "No joined tournaments found." });
    }

    console.log(`[FETCH SUCCESS] Fetched ${joinedTournaments.length} tournaments for user (${req.user.id}).`);
    return res.status(200).json(joinedTournaments);
  } catch (error) {
    console.error("[SERVER ERROR] Error fetching tournaments:", error.message);
    return res.status(500).json({ message: "Error fetching joined tournaments: " + error.message });
  }
});

// Fetch details of a specific participant for a tournament
router.get("/my-team/:tournamentId", protect, async (req, res) => {
  try {
    const { tournamentId } = req.params;

    // Ensure the user is authenticated and has the correct role
    if (!req.user || req.user.role !== "player") {
      console.error(`[ACCESS DENIED] User (${req.user?.id || "unknown"}) is not a player.`);
      return res.status(403).json({ message: "Only players can access this information." });
    }

    // Fetch participant details for the logged-in user and the given tournament
    const participant = await Participant.findOne({
      player: req.user.id,
      tournament: tournamentId,
    })
      .populate("tournament", "name description scheduleDate prizeMoney")
      .populate("player", "username email");

    if (!participant) {
      console.log(`[NOT FOUND] No participation found for user (${req.user.id}) in tournament (${tournamentId}).`);
      return res.status(404).json({ message: "You have not joined this tournament." });
    }

    console.log(`[FETCH SUCCESS] Fetched participant details for user (${req.user.id}).`);
    return res.status(200).json(participant);
  } catch (error) {
    console.error("[SERVER ERROR] Error fetching participant details:", error.message);
    return res.status(500).json({ message: "Error fetching participant details: " + error.message });
  }
});

module.exports = router;
