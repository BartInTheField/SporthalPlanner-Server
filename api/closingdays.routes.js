//Sportsfacility Routes
var express = require('express');
var routes = express.Router();

const API = require('../config/api_requester');
const ClosingDays = require('../model/closingdays.model');
const SportsFacility = require('../model/sportsfacility.model');

//Alle closingdays opvragen:
routes.get('/', function(req, res, done) {
  ClosingDays.find({})
    .then((closingdays) => {
    res.status(200).json(closingdays);
})
  .catch(error => {
    res.status(401).json({message:'Error'})
  console.log(error);
});
});

//Eén closingdays opvragen:
routes.get('/:id', function(req, res) {
  const id = req.params.id;
  ClosingDays.findOne({_id:id})
    .then((closingdays) => {
    res.status(200).json(closingdays);
})
  .catch(error => {
    res.status(401).json({message:'Error'})
  console.log(error);
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
routes.delete('', function(req, res) {
    let id = req.params.id;
    let index = req.params.index;
    let closingday;

    SportsFacility.findById(id)
        .then((facility) => {
            closingday = facility.closingdays[index];
            facility.closingdays.splice(index, 1);
            facility.save()
            .then(() => {
                res.status(200).json(facility);
        }).catch((error) => {
            res.status(400).json(error);
        });
    });
});

module.exports = routes;