const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    //Booking schema
});

const Booking = mongoose.model('booking', BookingSchema);

module.exports = Booking;