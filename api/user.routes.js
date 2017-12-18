//User routes
var express = require('express');
var router = express.Router();

//Ophalen van alle users:
router.get('/users', function(req, res) {

});

//Ophalen van 1 user:
router.get('/users/:name', function(req, res) {

});

//Regristreren (Alleen server-side):
router.post('/users', function(req, res) {

});

//Updaten van een user:
router.put('/users/:name', function(req, res) {

});

//Verwijderen van een user:
router.delete('/users/:id', function(req, res) {

});