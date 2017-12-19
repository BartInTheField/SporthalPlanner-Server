//Booking routes
var express = require('express');
var routes = express.Router();
const Booking = require('../model/booking.model');

//Ophalen van alle boekingen:
routes.get('', function(req, res) {

});

//Boeking toevoegen:
routes.post('', function(req, res) {
    res.contentType('application/json');

    const bookingBody = req.body;
    const booking = new Booking(bookingBody);

    booking.save()
        .then(() => {
            res.status(200).json(booking);
        }).catch((error) => {
            res.status(400).json(error);
    });
});

module.exports = routes;