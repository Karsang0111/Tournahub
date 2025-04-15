const Participant = require('../../models/Participant');

// Create a new participant
exports.createParticipant = async (req, res) => {
    try {
        const { player, tournament, teamName, contactNumber } = req.body;
        const newParticipant = new Participant({ player, tournament, teamName, contactNumber });
        await newParticipant.save();
        res.status(201).json(newParticipant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all participants
exports.getAllParticipants = async (req, res) => {
    try {
        const participants = await Participant.find()
            .populate('player')
            .populate('tournament');
        res.json(participants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get participant by ID
exports.getParticipantById = async (req, res) => {
    try {
        const participant = await Participant.findById(req.params.id)
            .populate('player')
            .populate('tournament');
        if (!participant) return res.status(404).json({ message: 'Participant not found' });
        res.json(participant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update participant by ID
exports.updateParticipant = async (req, res) => {
    try {
        const participant = await Participant.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!participant) return res.status(404).json({ message: 'Participant not found' });
        res.json(participant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update match result for participant
exports.updateMatchResult = async (req, res) => {
    const { round, result } = req.body;
    try {
        const participant = await Participant.findById(req.params.id);
        if (!participant) return res.status(404).json({ message: 'Participant not found' });

        await participant.updateMatchResult(round, result);
        res.json({ message: 'Match result updated', participant });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete participant by ID
exports.deleteParticipant = async (req, res) => {
    try {
        const participant = await Participant.findByIdAndDelete(req.params.id);
        if (!participant) return res.status(404).json({ message: 'Participant not found' });
        res.json({ message: 'Participant deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
