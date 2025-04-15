const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
    payment_id: {
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
    payment_amount: {
        type: Number,
        required: true
    },
    payment_method: {
        type: String,
        enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer'],
        required: true
    },
    payment_status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    }
}, { timestamps: true });

// Add indexes to improve query performance
paymentSchema.index({ participant_id: 1 });
paymentSchema.index({ tournament_id: 1 });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;