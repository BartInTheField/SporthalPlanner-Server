//Customer routes
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

//Retrieve customer data from a user
routes.get('/:userid', function(req, res) {
    const paramUserId = req.params.userid;
    Customer.find({ userId : paramUserId})
        .then((users) => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(401).json({message:'Error'})
            console.log(error);
        });
});

//Update customer data from a customer id
routes.put('/:id', function(req, res) {
    const paramId = req.params.id;
    const customer = req.body;
    Customer.findByIdAndUpdate({_id: paramId}, customer)
        .then((customer) => Customer.findById({_id: paramId}).then((customer) => res.status(200).json(customer)))
        .catch(error => {
            res.status(401).json({message:'Error'})
            console.log(error);
        });
});

//Delete a customer using customer id
routes.delete('/:id', function(req, res) {
    const paramId = req.params.id;

    Customer.findByIdAndRemove({_id: paramId})
        .then(customer => res.status(200).json(customer))
        .catch(error => {
            res.status(401).json({message:'Error'})
            console.log(error);
        });
}); 


module.exports = routes;
