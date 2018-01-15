const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StaffMemberSchema = new Schema({
    firstName: {
        type: String,
        required: [true]
    },
    lastName: {
        type: String,
        required: [true]
    },
    dateOfBirth: {
        type: Date,
        default: false
    },
});

const StaffMember = mongoose.model('staffmember', StaffMemberSchema);

module.exports = StaffMember;
