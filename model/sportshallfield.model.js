const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SportsHallFieldSchema = new Schema({
    amountOfFields: Number,
    price: Number,
    sportsHall: {
        type: Schema.ObjectId,
        ref: 'sportshall'
    },
    field: {
        type: Schema.ObjectId,
        ref: 'field'
    }
});

// const SportsHallField = mongoose.model('sportshallfield', SportsHallFieldSchema); //Geeft error

module.exports = SportsHallFieldSchema;