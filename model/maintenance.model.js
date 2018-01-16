const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SportsHallSchema = require('./sportshall.model');

const MaintenanceSchema = new Schema({
    days: {
        type: [Date],
        required: [true, 'Day is required.']
    },
    subject: {
        type: String,
        required: [true, 'Subject is required.']
    },
    materials: {
        type: [String],
        required: [true, 'material is required.']
    },
    reason: {
        type: String,
        required: false
    },
    sportsFacility: {
        type: Schema.ObjectId,
        ref: 'sportsfacility',
        required: [true, 'sportsfacility is required']
    },
});

const Maintenance = mongoose.model('maintenance', MaintenanceSchema);

module.exports = Maintenance;