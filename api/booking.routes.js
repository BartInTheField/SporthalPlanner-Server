//Booking routes
var express = require('express');
var routes = express.Router();
const Booking = require('../model/booking.model');

//Ophalen van alle boekingen:
routes.get('', function(req, res) {
    
});

//Boeking toevoegen:
routes.post('', function(req, res) {

});

module.exports = routes;