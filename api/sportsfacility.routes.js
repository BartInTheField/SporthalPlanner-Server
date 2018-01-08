//Sportsfacility Routes
var express = require('express');
var routes = express.Router();

const SportsFacility = require('../model/sportsfacility.model');

//Closingdays opvragen:
routes.get('', function(req, res) {

});

//Closingday toevoegen:
routes.put('', function(req, res) {

});

//Closingday verwijderen:
routes.delete('', function(req, res) {

});

module.exports = routes;