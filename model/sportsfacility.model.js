const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Company = require('./company.model');
const OpeningHours = require('./openinghours.model');
const ClosingDays = require('./closingdays.model');

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
    company: Company,
    openingHours: OpeningHours,
    closingDays: [ClosingDays]
});

const SportsFacility = mongoose.model('sportsfacility', SportsFacilitySchema);

module.exports = SportsFacility;