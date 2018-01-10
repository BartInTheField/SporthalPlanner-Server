const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SportsHallField = require('./sportshallfield.model');

const SportsHallSchema = new Schema({
    sportsHallId: Schema.ObjectId,
    name: {
        type: String,
        required: true
    },
    location: String,
    description: String
});

const SportsHall = mongoose.model('sportshall', SportsHallSchema);

module.exports = SportsHall;