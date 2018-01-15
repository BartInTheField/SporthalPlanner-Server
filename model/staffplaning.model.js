const mongoose = require('mongoose');
const SportsFacilities = require('./sportsfacility.model');
const Schema = mongoose.Schema;

const StaffPlaningSchema = new Schema({
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
    sportsFacility: {
        type: Schema.ObjectId,
        ref: 'sportsfacility',
        required: [true, 'Sportfacility is required']
    },
    staffMember: {
        type: Schema.ObjectId,
        ref: 'staffmember',
        required: [true, 'Staffmember is required']
    },
});

const StaffPlaning = mongoose.model('staffplanning', StaffPlaning);

module.exports = StaffPlaning;