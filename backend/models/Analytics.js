const mongoose = require('mongoose');
const { Schema } = mongoose;

const analyticsSchema = new Schema({
    tournament_id: {
        type: Schema.Types.ObjectId,
        ref: 'Tournament',
        required: true
    },
    participant_id: {
        type: Schema.Types.ObjectId,
        ref: 'Participant',
        required: true
    },
    player_status: {
        type: String,
        enum: ['active', 'eliminated', 'winner', 'runner-up']
    },
    tournament_performance_metrics: {
        type: Schema.Types.Mixed
    }
}, { timestamps: true });

// Indexes for performance
analyticsSchema.index({ participant_id: 1 });
analyticsSchema.index({ tournament_id: 1 });

module.exports = mongoose.model('Analytics', analyticsSchema);
