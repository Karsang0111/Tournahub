const mongoose = require("mongoose");
const { Schema } = mongoose;

const participantSchema = new Schema({
  player: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Player is required"], // Enhanced error message
  },
  tournament: {
    type: Schema.Types.ObjectId,
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
  bracketStatus: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
    default: "Not Started", // Status of the bracket for this participant
  },
  matchResults: {
    type: Map,
    of: String, // Key-value pairs for match results (e.g., {"Round 1": "Won", "Round 2": "Lost"}))
    default: {}, // Default is an empty object
  },
});

participantSchema.index({ player: 1, tournament: 1 }, { unique: true });

participantSchema.methods.updateMatchResult = function (round, result) {
  if (!this.matchResults) {
    this.matchResults = new Map();
  }
  this.matchResults.set(round, result);
  return this.save();
};

module.exports = mongoose.model("Participant", participantSchema);
