const mongoose = require('mongoose');

const winnerSchema = new mongoose.Schema({
    tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament',
        required: true
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    position: {
        type: Number,
        enum: [1, 2],
        required: true
    },
    awardedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Winner', winnerSchema);