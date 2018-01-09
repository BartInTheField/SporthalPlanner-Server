//Sportsfacility Routes
var express = require('express');
var routes = express.Router();
const ClosingDays = require('./closingdays.routes');

const SportsFacility = require('../model/sportsfacility.model');
const API = require('../config/api_requester');

//Alle closingdays opvragen:
routes.get('/', function(req, res, done) {

  API.request('/api/sportsfacilities/', 'GET', {}, (response) => {
    if (response.error) {
      res.status(400).json({ error: 'Could not retrieve Sportsfacility' });
    } else {
        res.status(200).json(response);
    }
  });
});

//Eén closingdays opvragen:
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
routes.put('/:id/closingdays', function(req, res, done) {
    const closingDay = new ClosingDays(req.body);

    closingDay.save()
        .then((closingDay) => {
            res.status(200).json(closingDay);
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({ error: "Could not create closing day" });
        });
});

//Closingday verwijderen:
routes.delete('', function(req, res) {

});

module.exports = routes;