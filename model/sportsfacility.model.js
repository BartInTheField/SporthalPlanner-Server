const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Company = require('./company.model');
const OpeningHours = require('./openinghours.model');

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
    openingHours: OpeningHours
});

module.exports = SportsFacilitySchema;