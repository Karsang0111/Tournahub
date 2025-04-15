const Analytics = require('../models/Analytics');

// Create a new analytics record
exports.createAnalytics = async (req, res) => {
    try {
        const analytics = new Analytics(req.body);
        await analytics.save();
        res.status(201).json(analytics);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all analytics
exports.getAllAnalytics = async (req, res) => {
    try {
        const analytics = await Analytics.find()
            .populate('tournament_id')
            .populate('participant_id');
        res.json(analytics);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get analytics by ID
exports.getAnalyticsById = async (req, res) => {
    try {
        const analytics = await Analytics.findById(req.params.id)
            .populate('tournament_id')
            .populate('participant_id');
        if (!analytics) return res.status(404).json({ message: 'Analytics not found' });
        res.json(analytics);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update analytics by ID
exports.updateAnalytics = async (req, res) => {
    try {
        const analytics = await Analytics.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!analytics) return res.status(404).json({ message: 'Analytics not found' });
        res.json(analytics);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete analytics by ID
exports.deleteAnalytics = async (req, res) => {
    try {
        const analytics = await Analytics.findByIdAndDelete(req.params.id);
        if (!analytics) return res.status(404).json({ message: 'Analytics not found' });
        res.json({ message: 'Analytics deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
