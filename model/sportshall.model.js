const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SportsFacility = require('./sportsfacility.model');

const SportsHallSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: String,
    description: String,
    sportsFacility: SportsFacility
});

module.exports = SportsHallSchema;