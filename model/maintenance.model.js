const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SportsHallSchema = require('./sportshall.model');

const MaintenanceSchema = new Schema({
    day: {
        type: [Date],
        required: [true, 'Day is required.']
    },
    subject: {
        type: String,
        required: [true, 'Subject is required.']
    },
    material: {
        type: [String],
        required: [true, 'material is required.']
    },
    reason: {
        type: String,
        required: false
    },
    sportsHall: SportsHallSchema
});

const Maintenance = mongoose.model('maintenance', MaintenanceSchema);

module.exports = Maintenance;