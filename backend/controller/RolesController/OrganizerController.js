const Organizer = require('../../models/Organizer');

// Create a new organizer
exports.createOrganizer = async (req, res) => {
    try {
        const { organizer_id, organizer_name, organizer_email, organizer_phone_no } = req.body;

        const existingOrganizer = await Organizer.findOne({ organizer_email });
        if (existingOrganizer) {
            return res.status(400).json({ message: 'Organizer with this email already exists' });
        }

        const newOrganizer = new Organizer({
            organizer_id,
            organizer_name,
            organizer_email,
            organizer_phone_no
        });

        await newOrganizer.save();
        res.status(201).json({ message: 'Organizer created successfully', organizer: newOrganizer });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all organizers
exports.getAllOrganizers = async (req, res) => {
    try {
        const organizers = await Organizer.find();
        res.json(organizers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get organizer by ID
exports.getOrganizerById = async (req, res) => {
    try {
        const organizer = await Organizer.findById(req.params.id);
        if (!organizer) return res.status(404).json({ message: 'Organizer not found' });
        res.json(organizer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update organizer
exports.updateOrganizer = async (req, res) => {
    try {
        const updatedOrganizer = await Organizer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedOrganizer) {
            return res.status(404).json({ message: 'Organizer not found' });
        }

        res.json({ message: 'Organizer updated', organizer: updatedOrganizer });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete organizer
exports.deleteOrganizer = async (req, res) => {
    try {
        const deleted = await Organizer.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Organizer not found' });

        res.json({ message: 'Organizer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
