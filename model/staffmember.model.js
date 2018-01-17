const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StaffMemberSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'firstName is required.']
    },
    lastName: {
        type: String,
        required: [true, 'lastName is required.']
    },
    dateOfBirth: {
        type: Date,
        default: new Date()
    },
});

const StaffMember = mongoose.model('staffmember', StaffMemberSchema);

module.exports = StaffMember;
