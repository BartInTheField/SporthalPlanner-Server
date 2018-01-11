const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    username: {
        type: String,
        required: [false]
    },
    userId: {
        type: String,
        required: [false]
    },
    customerId: {
        type: Number,
        required: [true, 'Customer Id is required.']
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
        required: [true]
    },
});

const Customer = mongoose.model('customer', CustomerSchema);

module.exports = customerId;