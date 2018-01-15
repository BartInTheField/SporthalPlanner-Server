//StaffMember routes
var express = require('express');
var routes = express.Router();
const StaffPlanning = require('../model/staffplanning.model');
const API = require('../config/api_requester');

//Add staffplanning:
routes.post('', function(req, res) {
    res.contentType('application/json');
    const staffPlanning = req.body;

    //POST a staffplanning to MongoDB
    const newStaffPlanning = new StaffPlanning(staffPlanning);

    newStaffPlanning.save()
        .then(() => {
            res.status(200).json(newStaffPlanning);
        }).catch((error) => {
            res.status(400).json(error);
    });
});

module.exports = routes;
