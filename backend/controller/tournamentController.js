const Tournament = require("../models/Tournament");

exports.createTournament = async (req, res) => {
  try {
    const tournament = await Tournament.create(req.body);
    res.status(201).json({ success: true, data: tournament });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find().populate("organizer", "name email");
    res.status(200).json({ success: true, data: tournaments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getTournamentById = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id).populate("organizer", "name email");
    if (!tournament) return res.status(404).json({ success: false, message: "Tournament not found" });

    res.status(200).json({ success: true, data: tournament });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!tournament) return res.status(404).json({ success: false, message: "Tournament not found" });

    res.status(200).json({ success: true, data: tournament });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndDelete(req.params.id);
    if (!tournament) return res.status(404).json({ success: false, message: "Tournament not found" });

    res.status(200).json({ success: true, message: "Tournament deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
