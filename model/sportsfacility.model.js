const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OpeningHours = require('./openinghours.model');
const ClosingDays = require('./closingdays.model');
const SportsHalls = require('./sportshall.model');

const SportsFacilitySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    openingHours: OpeningHours,
    closingDays: [ClosingDays],
    sportsHalls: [{
        type: Schema.ObjectId,
        ref: 'sportshall'
    }]
});

const SportsFacility = mongoose.model('sportsfacility', SportsFacilitySchema);

module.exports = SportsFacility;