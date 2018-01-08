const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SportsHallField = require('./sportshallfield.model');

const BookingSchema = new Schema({
    day: {
        type: Date,
        required: [true, 'Day is required.']
    },
    startingTime: {
        type: String,
        required: [true, 'Starting time is required.']
    },
    endingTime: {
        type: String,
        required: [true, 'Ending time is required.']
    },
    userId: {
        type: String,
        required: [true, 'User ID is required.']
    },
    sportsHallField: SportsHallField,
    status: Number
});

const Booking = mongoose.model('booking', BookingSchema);

module.exports = Booking;