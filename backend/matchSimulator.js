const express = require("express");
const router = express.Router();
const Match = require("../models/Match");
const Bracket = require("../models/Bracket");

// Function to simulate match results
const simulateMatch = (team1, team2) => {
    const winner = Math.random() > 0.5 ? team1 : team2; // Random winner
    return { team1, team2, winner };
};

// Simulate a match and update the database
router.post("/simulate", async (req, res) => {
    const { team1, team2, round } = req.body;

    if (!team1 || !team2) {
        return res.status(400).json({ message: "Both teams are required!" });
    }

    const result = simulateMatch(team1, team2);

    // Save match result in MongoDB
    const newMatch = new Match({
        team1: result.team1,
        team2: result.team2,
        winner: result.winner,
        round,
    });

    await newMatch.save();

    // Update the bracket with the winner
    await Bracket.updateOne(
        { round: round + 1, teams: { $in: [result.team1, result.team2] } },
        { $set: { teams: [result.winner] } }
    );

    res.json({ message: "Match result updated!", match: result });
});

module.exports = router;
