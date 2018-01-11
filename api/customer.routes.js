//Booking routes
var express = require('express');
var routes = express.Router();

const Customer = require('../model/customer.model');
const API = require('../config/api_requester');

//Add customer:
routes.post('', function(req, res) {
    res.contentType('application/json');
    const customerBody = req.body;

    //POST a customer to MongoDB
    const newCustomer = new Customer(customerBody);

    newCustomer.save()
        .then(() => {
            res.status(200).json(newCustomer);
        }).catch((error) => {
            res.status(400).json(error);
    });
});


module.exports = routes;
