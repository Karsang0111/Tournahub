const express = require('express');
const router = express.Router();
const winnerController = require('../controller/WinnerController');

// GET all winners
router.get('/', winnerController.getAllWinners);

router.get("/tournament-winner/:tournamentId", winnerController.tournamentWinner);

// GET winners by tournament ID
router.get('/tournament/:tournamentId', winnerController.getWinnersByTournamentId);

// GET a single winner by ID
router.get('/:id', winnerController.getWinnerById);

// CREATE a new winner
router.post('/', winnerController.createWinner);

// UPDATE a winner by ID
router.put('/:id', winnerController.updateWinner);

// DELETE a winner by ID
router.delete('/:id', winnerController.deleteWinner);


module.exports = router;
