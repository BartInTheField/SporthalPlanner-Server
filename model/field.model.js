const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FieldSchema = new Schema({
    sport: {
        type: String,
        required: true
    }
});

module.exports = FieldSchema;