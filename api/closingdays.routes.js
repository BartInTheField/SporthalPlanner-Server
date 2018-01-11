//Closingdays Routes
let express = require('express');
let routes = express.Router();
const ClosingDays = require('../model/closingdays.model');

//Alle closingdays opvragen:
routes.get('/', function(req, res, done) {
    ClosingDays.find({})
        .then((closingdays) => {
            res.status(200).json(closingdays);
        }).catch(error => {
            res.status(401).json(error);
        });
});

//Eén closingdays opvragen:
routes.get('/:id', function(req, res) {
    const id = req.params.id;

    ClosingDays.findOne({_id:id})
        .then((closingdays) => {
            res.status(200).json(closingdays);
        }).catch(error => {
            res.status(401).json(error);
        });
});

//Alle closingdays van 1 sportsfacility opvragen:
routes.get('/facility/:id', function(req, res) {
    const id = req.params.id;

    ClosingDays.find({sportsFacility: id})
        .then((closingdays) => {
            res.status(200).json(closingdays);
        }).catch((error) => {
            res.status(400).json(error);
        });
});

//Closingday toevoegen:
routes.post('', function(req, res) {
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