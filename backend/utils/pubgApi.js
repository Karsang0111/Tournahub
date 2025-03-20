const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.PUBG_API_KEY;
const BASE_URL = "https://api.pubg.com/shards/steam";

const pubgApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/vnd.api+json",
    },
});

// Fetch player details
const getPlayerStats = async (playerName) => {
    try {
        const response = await pubgApi.get(`/players?filter[playerNames]=${playerName}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching player stats:", error.response ? error.response.data : error.message);
        throw new Error("Failed to fetch player stats");
    }
};

// Fetch live match details
const getLiveMatchDetails = async (matchId) => {
    try {
        const response = await pubgApi.get(`/matches/${matchId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching match details:", error.response ? error.response.data : error.message);
        throw new Error("Failed to fetch match details");
    }
};

module.exports = { getPlayerStats, getLiveMatchDetails };
