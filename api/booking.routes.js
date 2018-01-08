//Booking routes
var express = require('express');
var routes = express.Router();

const Booking = require('../model/booking.model');
const API = require('../config/api_requester');

//Boeking toevoegen:
routes.post('', function(req, res) {
    res.contentType('application/json');
    const bookingBody = req.body;

    //POST een booking naar de SQL database
    API.request('/api/bookings', 'POST', bookingBody, (response) => {
        if(response.error) {
            res.status(400).json({error: 'POST request failed'});
        } else {
            res.status(200).json(response);
        }
    });

    //POST een booking naar de NoSql database
    const newBooking = new Booking(bookingBody);

    newBooking.save()
        .then(() => {
            res.status(200).json(newBooking);
        }).catch((error) => {
            res.status(400).json(error);
    });
});

//Retrieve booking data
routes.get('', function(req, res) {
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
