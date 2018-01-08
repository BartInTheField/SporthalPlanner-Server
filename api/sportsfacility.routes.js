//Sportsfacility Routes
var express = require('express');
var routes = express.Router();

const SportsFacility = require('../model/sportsfacility.model');
const API = require('../config/api_requester');

//Closingdays opvragen:
routes.get('/:id', function(req, res) {
  const id = req.params.id;

  API.request('/api/sportsfacilities/'+id, 'GET', {}, (response) => {
    if (response.error) {
      res.status(400).json({ error: 'Could not retrieve Sportsfacility' });
    } else {
      res.status(200).json(response);
    }
  });
});

//Closingday toevoegen:
routes.put('', function(req, res) {

});

//Closingday verwijderen:
routes.delete('', function(req, res) {

});

module.exports = routes;