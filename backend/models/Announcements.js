const mongoose = require('mongoose');
const { Schema } = mongoose;

const announcementSchema = new Schema({
    announcement_id: {
        type: String,
        required: true,
        unique: true
    },
    tournament_id: {
        type: String,
        required: true,
        ref: 'Tournament'
    },
    announcement_title: {
        type: String,
        required: true
    },
    announcement_content: {
        type: String,
        required: true
    },
    announcement_date: {
        type: Date,
        default: Date.now
    },
    prize_money: {
        type: Number
    },
    entry_fee: {
        type: Number
    }
}, { timestamps: true });

// Add index to improve query performance
announcementSchema.index({ tournament_id: 1 });

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;