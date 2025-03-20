const express = require("express");
const { getPlayerStats, getLiveMatchDetails } = require("../utils/pubgApi");

const router = express.Router();

// Get player stats by name
router.get("/player/:playerName", async (req, res) => {
    try {
        const playerData = await getPlayerStats(req.params.playerName);
        res.json(playerData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get live match details by match ID
router.get("/match/:matchId", async (req, res) => {
    try {
        const matchData = await getLiveMatchDetails(req.params.matchId);
        res.json(matchData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
