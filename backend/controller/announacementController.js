const Announcement = require('../models/Announcements');

// Create a new announcement
exports.createAnnouncement = async (req, res) => {
    try {
        const announcement = new Announcement(req.body);
        await announcement.save();
        res.status(201).json(announcement);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all announcements
exports.getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find().populate('tournament_id');
        res.json(announcements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get announcement by ID
exports.getAnnouncementById = async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id).populate('tournament_id');
        if (!announcement) return res.status(404).json({ message: 'Announcement not found' });
        res.json(announcement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update announcement by ID
exports.updateAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!announcement) return res.status(404).json({ message: 'Announcement not found' });
        res.json(announcement);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete announcement by ID
exports.deleteAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.findByIdAndDelete(req.params.id);
        if (!announcement) return res.status(404).json({ message: 'Announcement not found' });
        res.json({ message: 'Announcement deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
