//Booking routes
var express = require('express');
var routes = express.Router();

const apiRequester = require('../config/api_requester');
const Booking = require('../model/booking.model');

//Boeking toevoegen:
routes.post('/bookings', function(req, res) {

});

//Retrieve booking data
routes.get('/bookings', function(req, res) {

        performRequest('/api/session', 'POST', {
            username: username,
            password: password,
            api_key_id: apiKey
        }, function(data) {
            sessionId = data.result.id;
        });
    }


        .then((bookings) => {
            res.status(200).json(bookings);
        })
        .catch((error) => {
            res.status(400).json({ error: 'Could not retrieve all bookings' });
            console.log(error);
        })
});

module.exports = routes;
