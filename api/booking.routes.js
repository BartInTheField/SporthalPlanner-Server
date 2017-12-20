//Booking routes
var express = require('express');
var routes = express.Router();
const Booking = require('../model/booking.model');

const Booking = require('../model/booking.model');
const API = require('../config/api_requester');]

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

//Retrieve booking data
routes.get('/bookings', function(req, res) {
    API.request('/api/bookings', 'GET', {}, (response) => {
        if (response.error) {
            res.status(400).json({ error: 'Could not retrieve all bookings' });
            console.log(response);
        } else {
            res.status(200).json(response);
        }
    });
});

module.exports = routes;
