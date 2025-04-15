const Winner = require('../models/Winners');
const mongoose = require('mongoose');

// GET all winners
exports.getAllWinners = async (req, res) => {
    try {
        const winners = await Winner.find()
            .populate('tournament')
            .populate('team');
        res.json(winners);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET winners by tournament ID
exports.getWinnersByTournamentId = async (req, res) => {
    try {

        const winners = await Winner.find({ tournament: req.params.tournamentId })
            .populate('team')
            .populate('tournament');

        if (!winners.length) {
            return res.status(404).json({ message: 'No winners found for this tournament' });
        }

        res.json(winners);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.tournamentWinner = async (req, res) => {
    const { tournamentId } = req.params;

    // ✅ Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(tournamentId)) {
        return res.status(400).json({
            status: "error",
            message: "Invalid tournament ID"
        });
    }

    try {
        const winners = await Winner.find({ tournament: tournamentId })
            .populate('tournament')
            .populate('team');

        if (!winners.length) {
            return res.status(404).json({
                status: "error",
                message: "No winners found for this tournament."
            });
        }

        const formattedWinners = winners.map(winner => ({
            position: winner.position,
            awardedAt: winner.awardedAt,
            tournamentTitle: winner.tournament?.title || '',
            team: {
                id: winner.team?._id,
                name: winner.team?.name,
                logo: winner.team?.logo,
                players: winner.team?.players || []
            }
        }));

        res.status(200).json({
            status: "success",
            data: formattedWinners
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};



// GET a winner by ID
exports.getWinnerById = async (req, res) => {
    try {
        const winner = await Winner.findById(req.params.id)
            .populate('tournament')
            .populate('team');

        if (!winner) return res.status(404).json({ message: 'Winner not found' });

        res.json(winner);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createWinner = async (req, res) => {
    const { tournament, team, position } = req.body;
    console.log(tournament, team, position);

    try {
        // ✅ Check if the same team is already marked as winner in this tournament
        const existingWinner = await Winner.findOne({ tournament, team });
        if (existingWinner) {
            return res.status(400).json({
                status: "error",
                message: "This team has already been marked as a winner for the selected tournament."
            });
        }

        // ✅ Check if a winner already exists for this position in the tournament
        const positionTaken = await Winner.findOne({ tournament, position });
        if (positionTaken) {
            return res.status(400).json({
                status: "error",
                message: `Position ${position} is already assigned in this tournament.`
            });
        }

        const winner = new Winner({
            tournament,
            team,
            position
        });

        const savedWinner = await winner.save();
        res.status(201).json({ status: "success", savedWinner });
    } catch (err) {
        res.status(400).json({ status: "error", message: err.message });
    }
};


// UPDATE a winner
exports.updateWinner = async (req, res) => {
    try {
        const updatedWinner = await Winner.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedWinner) return res.status(404).json({ message: 'Winner not found' });

        res.json(updatedWinner);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE a winner
exports.deleteWinner = async (req, res) => {
    try {
        const deletedWinner = await Winner.findByIdAndDelete(req.params.id);
        if (!deletedWinner) return res.status(404).json({ message: 'Winner not found' });

        res.json({ message: 'Winner deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
