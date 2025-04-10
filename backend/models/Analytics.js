const mongoose = require('mongoose');
const { Schema } = mongoose;

const analyticsSchema = new Schema({
    analytics_id: {
        type: String,
        required: true,
        unique: true
    },
    tournament_id: {
        type: String,
        required: true,
        ref: 'Tournament'
    },
    participant_id: {
        type: String,
        required: true,
        ref: 'Participant'
    },
    player_status: {
        type: String,
        enum: ['active', 'eliminated', 'winner', 'runner-up']
    },
    tournament_performance_metrics: {
        type: Schema.Types.Mixed
    }
}, { timestamps: true });

// Add indexes to improve query performance
analyticsSchema.index({ participant_id: 1 });
analyticsSchema.index({ tournament_id: 1 });

const Analytics = mongoose.model('Analytics', analyticsSchema);

module.exports = Analytics;