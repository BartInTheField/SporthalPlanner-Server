const mongoose = require('mongoose');
const SportsFacilities = require('./sportsfacility.model');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    sportsFacilities: [{
        type: Schema.ObjectId,
        ref: 'sportsfacility'
    }]
});

module.exports = CompanySchema;