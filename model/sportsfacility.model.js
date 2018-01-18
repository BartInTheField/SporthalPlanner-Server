const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OpeningHours = require('./openinghours.model');

const SportsFacilitySchema = new Schema({
    SportsFacilityId: Schema.ObjectId,
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
    userId: {
        type: String,
        require: true
    },
    openingHours: OpeningHours,
    sportsHalls: [{
        type: Schema.ObjectId,
        ref: 'sportshall'
    }]
});

const SportsFacility = mongoose.model('sportsfacility', SportsFacilitySchema);

module.exports = SportsFacility;