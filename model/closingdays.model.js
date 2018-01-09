const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SportsFacility = require('./sportsfacility.model');

const ClosingDaysSchema = new Schema({
    date: {
        type: Date,
        required: [true, 'Date is required.']
    },
    reason: String,
    sportsFacility: {
        type: Schema.ObjectId,
        ref: 'sportsfacility'
    }
});

const ClosingDays = mongoose.model('closingdays', ClosingDaysSchema);

module.exports = ClosingDaysSchema;