const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Player is required"], // Enhanced error message
  },
  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    required: [true, "Tournament is required"], // Enhanced error message
  },
  teamName: {
    type: String,
    required: [true, "Team name is required"], // Enhanced error message
    trim: true, // Trim leading/trailing whitespace
    maxlength: [100, "Team name must not exceed 100 characters"], // Add length validation
  },
  contactNumber: {
    type: String,
    required: [true, "Contact number is required"], // Enhanced error message
    validate: {
      validator: function (v) {
        // Validate contact number format (e.g., 10-digit numbers)
        return /^[0-9]{10}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid 10-digit contact number!`, // Custom error message
    },
  },
  joinedAt: {
    type: Date,
    default: Date.now, // Automatically set the timestamp when a participant is created
  },
});

// Create a unique compound index to prevent duplicate entries
participantSchema.index({ player: 1, tournament: 1 }, { unique: true });

module.exports = mongoose.model("Participant", participantSchema);
