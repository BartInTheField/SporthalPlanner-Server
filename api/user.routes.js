//User routes
var express = require('express');
var routes = express.Router();

//Ophalen van alle users:
routes.get('/users', function(req, res) {

});

//Ophalen van 1 user:
routes.get('/users/:id', function(req, res) {

});

//Regristreren (Alleen server-side):
routes.post('/users', function(req, res) {

});

//Updaten van een user:
routes.put('/users/:id', function(req, res) {

});

//Verwijderen van een user:
routes.delete('/users/:id', function(req, res) {

}); 

module.exports = routes;