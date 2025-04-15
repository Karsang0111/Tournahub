const Team = require('../models/TeamsModel'); // Adjust path as needed

// Get all teams
exports.getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find();
        console.log(teams)
        res.status(200).json({
            success: true,
            count: teams.length,
            data: teams
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


exports.getByTournamentID = async (req, res) => {
    try {
        const { tournamentId } = req.params;
        console.log(tournamentId)

        if (!tournamentId) {
            return res.status(400).json({
                success: false,
                error: 'Tournament ID is required',
            });
        }

        const teams = await Team.find({ tournament: tournamentId })
            .populate('tournament', 'title startDate endDate')
            .sort({ createdAt: -1 });

            console.log(teams)

        res.status(200).json({
            success: true,
            count: teams.length,
            data: teams
        });
    } catch (error) {
        console.error('Error fetching teams by tournament ID:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch teams for the given tournament',
        });
    }
};

// Get single team by ID
exports.getTeamById = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);

        if (!team) {
            return res.status(404).json({
                success: false,
                error: 'Team not found'
            });
        }

        res.status(200).json({
            success: true,
            data: team
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Create new team
exports.createTeam = async (req, res) => {
    try {
        const { name, logo, players, tournament:tournamentId } = req.body;
        console.log(tournamentId)

        if (!name) {
            return res.status(400).json({ success: false, error: 'Please provide a team name' });
        }

        if (!tournamentId) {
            return res.status(400).json({ success: false, error: 'Tournament ID is required' });
        }

        if (!players || !Array.isArray(players) || players.length === 0) {
            return res.status(400).json({ success: false, error: 'At least one player is required' });
        }

        const invalidPlayers = players.filter(player => !player.name || !player.name.trim());
        if (invalidPlayers.length > 0) {
            return res.status(400).json({ success: false, error: 'All players must have a name' });
        }

        // Create the team with tournament reference
        const team = await Team.create({
            name,
            logo: logo || null,
            players: players.map(player => ({ name: player.name.trim() })),
            tournament: tournamentId
        });

        res.status(201).json({
            success: true,
            data: team
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Update team
exports.updateTeam = async (req, res) => {
    try {
        const { name, logo, players } = req.body;
        const updateData = {};

        // Only update fields that were sent
        if (name !== undefined) updateData.name = name;
        if (logo !== undefined) updateData.logo = logo;

        // Handle players array update
        if (players !== undefined) {
            // Validate players array if provided
            if (!Array.isArray(players)) {
                return res.status(400).json({
                    success: false,
                    error: 'Players must be an array'
                });
            }

            // Check if players array is empty
            if (players.length === 0) {
                return res.status(400).json({
                    success: false,
                    error: 'At least one player is required'
                });
            }

            // Validate each player has a name
            const invalidPlayers = players.filter(player => !player.name || !player.name.trim());
            if (invalidPlayers.length > 0) {
                return res.status(400).json({
                    success: false,
                    error: 'All players must have a name'
                });
            }

            updateData.players = players.map(player => ({ name: player.name.trim() }));
        }

        const team = await Team.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!team) {
            return res.status(404).json({
                success: false,
                error: 'Team not found'
            });
        }

        res.status(200).json({
            success: true,
            data: team
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Delete team
exports.deleteTeam = async (req, res) => {
    const team = await Team.findById(req.params.id);

    if (!team) {
        return res.status(404).json({
            success: false,
            error: 'Team not found'
        });
    }

    await team.deleteOne();

    res.status(200).json({
        success: true,
        data: {}
    });

};

// Get teams by player name
exports.getTeamsByPlayerName = async (req, res) => {
    try {
        const { playerName } = req.params;

        if (!playerName) {
            return res.status(400).json({
                success: false,
                error: 'Player name is required'
            });
        }

        // Find teams that have a player with the given name
        const teams = await Team.find({
            'players.name': { $regex: new RegExp(playerName, 'i') }
        });

        res.status(200).json({
            success: true,
            count: teams.length,
            data: teams
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};