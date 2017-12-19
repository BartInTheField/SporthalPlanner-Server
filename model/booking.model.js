const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SportsHallField = require('./sportshallfield.model.js');

const BookingSchema = new Schema({
    day: {
        type: Date,
        required: true
    },
    startingTime: {
        type: Date,
        required = true
    },
    endingTime: {
        type: Date,
        required: true
    },
    userId: {
        type: Number,
        required: true
    },
    sportsHallField: SportsHallField
});

const Booking = mongoose.model('booking', BookingSchema);

module.exports = Booking;