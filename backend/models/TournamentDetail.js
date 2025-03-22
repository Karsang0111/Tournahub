const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tournament name is required"],
      trim: true,
      maxlength: [100, "Tournament name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Tournament description is required"],
      trim: true,
    },
    scheduleDate: {
      type: Date,
      required: [true, "Schedule date is required"],
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
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
  }
);

module.exports = mongoose.model("Tournament", tournamentSchema);
