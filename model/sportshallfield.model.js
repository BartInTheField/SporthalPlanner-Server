const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SportsHall = require('./sportshall.model');
const Field = require('./field.model');

const SportsHallFieldSchema = new Schema({
    amountOfFields: Number,
    price: Number,
    sportsHall: SportsHall,
    field: Field
});

module.exports = SportsHallFieldSchema;