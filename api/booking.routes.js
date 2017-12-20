//Booking routes
const express = require('express');
const routes = express.Router();

const API = require('../config/api_requester');

//Boeking toevoegen:
routes.post('', function(req, res) {

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
