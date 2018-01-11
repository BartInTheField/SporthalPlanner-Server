//Closingdays Routes
var express = require('express');
var routes = express.Router();

const API = require('../config/api_requester');
const ClosingDays = require('../model/closingdays.model');
const SportsFacility = require('../model/sportsfacility.model');

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
routes.post('', function(req, res, done) {
    const payload = req.body;
    const closingDay = new ClosingDays(payload);

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
routes.delete('/:id', function(req, res) {
    res.contentType('application/json');

    let id = req.params.id;

    ClosingDays.findByIdAndRemove({_id: id})
        .then((closingDay) => {
            if(closingDay)
                res.status(200).json(closingDay);
            else 
                res.status(200).json({
                    Error: 'Unable to find a closing day with given ID'
                });
        }).catch((error) => {
            res.status(400).json(error);
    });
});

module.exports = routes;