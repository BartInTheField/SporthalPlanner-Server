//Sportsfacility Routes
var express = require('express');
var routes = express.Router();

const SportsFacility = require('../model/sportsfacility.model');

//Closingdays opvragen:
routes.get('', function(req, res) {

});

//Closingday toevoegen:
routes.put('/:id/closingdays', function(req, res) {
    const id = req.params.id;
    const payload = req.body;

    SportsFacility.findById(id)
        .then((sportsFacility) => {
            sportsFacility.closingDays.push(payload);
            sportsFacility.save()
                .then(() => res.status(200).json(payload))
                .catch((error) => {
                    console.log(error);
                    res.status(400).json({ error: "Could not create closing days for sportsfacility" });
                });
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({ error: "Sportsfacility with given ID does not exist" });
        });
});

//Closingday verwijderen:
routes.delete('', function(req, res) {

});

module.exports = routes;