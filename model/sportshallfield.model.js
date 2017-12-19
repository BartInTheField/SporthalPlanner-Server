const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SportsHallFieldSchema = new Schema({
    amountOfFields: Number,
    price: Number
});

module.exports = SportsHallFieldSchema;