const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Tournament title is required"],
    trim: true,
    maxlength: [100, "Tournament title cannot exceed 100 characters"],
  },
  mode: {
    type: String,
    required: [true, "Tournament mode is required"],
    trim: true,
  },
  entry: {
    type: String,
    required: [true, "Entry fee is required"],
  },
  prize: {
    type: String,
    required: [true, "Prize amount is required"],
  },
  runnerup: {
    type: String,
    required: [true, "Runner-up prize is required"],
  },
  status: {
    type: String,
    enum: ["Ongoing", "Upcoming", "Completed"],
    required: [true, "Tournament status is required"],
  },
  time: {
    type: String,
    required: [true, "Tournament start time is required"],
  },
  image: {
    type: String,
    required: [true, "Tournament image is required"],
  },
  description: {
    type: String,
    required: [true, "Tournament description is required"],
    trim: true,
  },
  maxPlayerCount: {
    type: String,
    required: [true, "Maximum Player count is required"],
  },
  participants: {
    type: String,
    required: [true, "Participants field is required"],
  },
  rules: {
    type: [String],
    required: [true, "Tournament rules are required"],
  },
  schedule: [
    {
      round: {
        type: String,
        required: [true, "Round name is required"],
      },
      time: {
        type: String,
        required: [true, "Round time is required"],
      },
    },
  ],
  scheduleDate: {
    type: Date,
    required: [true, "Schedule date is required"],
    default: function () {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow;
    },
    validate: {
      validator: function (value) {
        return value > Date.now();
      },
      message: "Schedule date must be in the future",
    },
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required"],
  },
  endDate: {
    type: Date,
    required: [true, "End date is required"],
    validate: {
      validator: function (value) {
        return this.startDate ? value > this.startDate : true;
      },
      message: "End date must be after the start date",
    },
  },
  prizeMoney: {
    type: Number,
    required: [true, "Prize money is required"],
    min: [0, "Prize money cannot be negative"],
  },
  payment: {
    type: Number,
    required: [true, "Payment amount is required"],
    min: [0, "Payment cannot be negative"],
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Ensure "User" model exists
    required: [true, "Organizer is required"],
  },
}, { timestamps: true });

// Pre-save hook to handle date and number parsing if necessary
tournamentSchema.pre('save', function (next) {
  if (typeof this.schedule === 'string') {
    try {
      this.schedule = JSON.parse(this.schedule);
    } catch (error) {
      return next(new Error('Invalid schedule format'));
    }
  }

  if (this.prizeMoney && typeof this.prizeMoney !== 'number') {
    this.prizeMoney = Number(this.prizeMoney);
  }

  if (this.payment && typeof this.payment !== 'number') {
    this.payment = Number(this.payment);
  }

  // Parse dates to ensure proper validation
  if (this.startDate) {
    this.startDate = new Date(this.startDate);
  }

  if (this.endDate) {
    this.endDate = new Date(this.endDate);
  }

  if (this.scheduleDate) {
    this.scheduleDate = new Date(this.scheduleDate);
  }

  next();
});

module.exports = mongoose.model('Tournament', tournamentSchema);
