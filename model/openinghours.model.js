const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OpeningHoursSchema = new Schema({
    openingHoursId: Number,
    monday: {
        type: String,
        required: true
    },
    tuesday: {
        type: String,
        required: true
    },
    wednesday: {
        type: String,
        required: true
    },
    thursday: {
        type: String,
        required: true
    },
    friday: {
        type: String,
        required: true
    },
    saturday: {
        type: String,
        required: true
    },
    sunday: {
        type: String,
        required: true
    }
});

module.exports = OpeningHoursSchema;