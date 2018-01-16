//Maintenance routes
var express = require('express');
var routes = express.Router();

const Maintenance = require('../model/maintenance.model');
const API = require('../config/api_requester');

//Retrieve Maintenance data
routes.post('', function(req, res) {
    const maintenance = req.body;
    
    //POST een maintenance naar de NoSql database
    const newMaintenance = new Maintenance(maintenance);

    newMaintenance.save()
        .then(() => {
            res.status(200).json(newMaintenance);
        }).catch((error) => {
        res.status(400).json(error);
    });
});

module.exports = routes;
