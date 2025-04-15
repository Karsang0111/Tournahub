const express = require('express');
const router = express.Router();
const {
    getAllTeams,
    getTeamById,
    createTeam,
    updateTeam,
    deleteTeam,
    getTeamsByPlayerName,
    getByTournamentID
} = require('../controller/TeamController');

// Base routes
router.route('/')
    .get(getAllTeams)
    .post(createTeam);

router.get('/:tournamentId', getByTournamentID);

// Routes with ID parameter
router.route('/:id')
    .get(getTeamById)
    .put(updateTeam)
    .delete(deleteTeam);

// Additional routes
router.get('/player/:playerName', getTeamsByPlayerName);

module.exports = router;