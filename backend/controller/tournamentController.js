const Tournament = require("../models/TournamentDetail");

exports.createTournament = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);

    // Extract data from request
    const {
      title,
      mode,
      entry,
      prize,
      runnerup,
      status,
      time,
      description,
      maxPlayerCount,
      participants,
      prizeMoney,
      payment,
      startDate,
      endDate,
      scheduleDate,
      schedule,
      rules,
      organizer,
    } = req.body;

    // Parse JSON fields if needed
    let parsedSchedule;
    try {
      parsedSchedule = typeof schedule === 'string' ? JSON.parse(schedule) : schedule;
    } catch (e) {
      return res.status(400).json({ success: false, error: 'Invalid schedule format' });
    }

    // Handle rules - could be string, array, or missing
    let parsedRules;
    if (rules) {
      parsedRules = typeof rules === 'string' ? rules.split(',') : rules;
    } else {
      parsedRules = [];
    }

    // Handle file upload - get image path from file uploaded via multer
    const imagePath = req.file ? req.file.path : null;

    if (!imagePath) {
      return res.status(400).json({ success: false, error: 'Tournament image is required' });
    }

    // Validate date fields with safe parsing
    let parsedStartDate, parsedEndDate, parsedScheduleDate;

    try {
      parsedStartDate = startDate ? new Date(startDate) : null;
      parsedEndDate = endDate ? new Date(endDate) : null;
      parsedScheduleDate = scheduleDate ? new Date(scheduleDate) : null;

      // Check for invalid dates
      if (parsedStartDate && isNaN(parsedStartDate.getTime())) {
        return res.status(400).json({ success: false, error: 'Invalid start date format' });
      }

      if (parsedEndDate && isNaN(parsedEndDate.getTime())) {
        return res.status(400).json({ success: false, error: 'Invalid end date format' });
      }

      if (parsedScheduleDate && isNaN(parsedScheduleDate.getTime())) {
        return res.status(400).json({ success: false, error: 'Invalid schedule date format' });
      }
    } catch (e) {
      return res.status(400).json({ success: false, error: 'Date parsing error: ' + e.message });
    }

    // Validate that endDate is after startDate if both exist
    if (parsedStartDate && parsedEndDate && parsedEndDate <= parsedStartDate) {
      return res.status(400).json({ success: false, error: 'End date must be after the start date' });
    }

    // Validate scheduleDate is in the future if it exists
    if (parsedScheduleDate && parsedScheduleDate <= new Date()) {
      return res.status(400).json({ success: false, error: 'Schedule date must be in the future' });
    }

    // Parse number fields safely
    const parsedPrizeMoney = prizeMoney !== undefined && prizeMoney !== '' ? Number(prizeMoney) : 0;
    const parsedPayment = payment !== undefined && payment !== '' ? Number(payment) : 0;

    // Check for valid numbers
    if (isNaN(parsedPrizeMoney)) {
      return res.status(400).json({ success: false, error: 'Prize money must be a number' });
    }

    if (isNaN(parsedPayment)) {
      return res.status(400).json({ success: false, error: 'Payment must be a number' });
    }

    // Create the tournament with validated data
    const tournament = await Tournament.create({
      title,
      mode,
      entry,
      prize,
      runnerup,
      status,
      time,
      image: imagePath,
      description,
      maxPlayerCount,
      participants,
      prizeMoney: parsedPrizeMoney,
      payment: parsedPayment,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      scheduleDate: parsedScheduleDate,
      schedule: parsedSchedule,
      rules: parsedRules,
      organizer,
    });

    res.status(201).json({ success: true, data: tournament });
  } catch (error) {
    console.error('Tournament creation error:', error);

    // Send a more specific error message
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: 'Validation error',
        details: messages
      });
    }

    res.status(400).json({
      success: false,
      error: error.message || 'Error creating tournament'
    });
  }
};


exports.getTournamentByOrganizorId = async (req, res) => {
  const { organizerId } = req.params;
  console.log("-----" + organizerId + "-----")
  try {
    const tournaments = await Tournament.find({ organizer: organizerId });

    if (!tournaments.length) {
      return res.status(404).json({
        status: "error",
        message: "No tournaments found for this organizer."
      });
    }

    res.status(200).json({ status: "success", data:tournaments });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};



exports.getTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find()
      .populate({
        path: 'organizer',
        select: 'username -_id',
      });


    console.log(tournaments);

    res.status(200).json({ success: true, data: tournaments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getTournamentById = async (req, res) => {
  try {
    console.log(req.params.id)
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
