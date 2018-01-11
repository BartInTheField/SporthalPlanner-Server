const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    sporthalHurenUsername: {
        type: String,
        required: [false]
    },
    sporthalHurenUserId: {
        type: String,
        required: [false]
    },
    userId: {
        type: String,
        required: [true, 'userId is required.']
    },
    firstName: {
        type: String,
        required: [false]
    },
    lastName: {
        type: String,
        required: [false]
    },
    isSporthalHurenCustomer: {
        type: Boolean,
        default: false
    },
});

const Customer = mongoose.model('customer', CustomerSchema);

module.exports = Customer;