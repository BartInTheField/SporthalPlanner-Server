const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SportsHallField = require('./sportshallfield.model');

const BookingSchema = new Schema({
    day: {
        type: Date,
        required: true
    },
    startingTime: {
        type: String,
        required: true
    },
    endingTime: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    sportsHallField: SportsHallField,
    status: Number
});

const Booking = mongoose.model('booking', BookingSchema);

module.exports = Booking;