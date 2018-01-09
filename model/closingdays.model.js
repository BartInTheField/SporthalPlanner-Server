const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClosingDaysSchema = new Schema({
    date: {
        type: Date,
        required: [true, 'Date is required.']
    },
    reason: String,
});

const ClosingDays = mongoose.model('closingdays', ClosingDaysSchema);

module.exports = ClosingDaysSchema;