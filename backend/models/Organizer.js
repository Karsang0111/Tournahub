const mongoose = require('mongoose');
const { Schema } = mongoose;

const organizerSchema = new Schema({
  organizer_id: {
    type: String,
    required: true,
    unique: true
  },
  organizer_name: {
    type: String,
    required: true
  },
  organizer_email: {
    type: String,
    required: true,
    unique: true
  },
  organizer_phone_no: {
    type: String
  }
}, { timestamps: true });

const Organizer = mongoose.model('Organizer', organizerSchema);

module.exports = Organizer;
