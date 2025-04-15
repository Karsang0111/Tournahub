const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Team schema
const teamSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    logo: {
        type: String,  // URL to the team logo image
        default: null
    },
    players: [{
        name: {
            type: String,
            required: true,
            trim: true
        }
    }],
    tournament: {
        type: Schema.Types.ObjectId,
        ref: 'Tournament',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });


const Team = mongoose.model('Team', teamSchema);

module.exports = Team;