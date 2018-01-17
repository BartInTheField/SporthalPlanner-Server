const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StaffPlanningSchema = new Schema({
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
        required: [true, 'Sportfacility is required.']
    },
    staffMember: {
        type: Schema.ObjectId,
        ref: 'staffmember',
        required: [true, 'Staffmember is required.']
    },
});

const StaffPlanning = mongoose.model('staffplanning', StaffPlanningSchema);

module.exports = StaffPlanning;