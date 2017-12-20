//Booking routes
var express = require('express');
var routes = express.Router();

const Booking = require('../model/openinghours.model');
const API = require('../config/api_requester');


//Retrieve openinghours data
routes.get('/', function(req, res) {
    API.request('/api/openinghours', 'GET', {}, (response) => {
        if (response.error) {
            res.status(400).json({ error: 'Could not retrieve all openinghours' });
        } else {
            res.status(200).json(response);
        }
    });
});

module.exports = routes;