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

//Get staffplanning using sportsfacility ID:
routes.get('/sportsfacilities/:sportsfacilityId', function(req, res) {
    res.contentType('application/json');
    const sportsfacilityParam = req.params.sportsfacilityId

    StaffPlanning.find({sportsFacility: sportsfacilityParam})
        .then((plannings) => {
            res.status(200).json(plannings);
        })
        .catch((error) => {
            res.status(400).json(error);
        })
});

//Get staffplanning using staffmember ID:
routes.get('/staffmembers/:staffmember', function(req, res) {
    res.contentType('application/json');
    const staffmemberParam = req.params.staffmember

    StaffPlanning.find({staffMember: staffmemberParam})
        .then((plannings) => {
            res.status(200).json(plannings);
        })
        .catch((error) => {
            res.status(400).json(error);
        });
});

//Delete staffplanning using staffplanning ID:
routes.delete('/:staffplanning', function(req, res) {
    res.contentType('application/json');
    const staffplanningParam = req.params.staffplanning

    StaffPlanning.findByIdAndRemove(staffplanningParam)
        .then((result) => {
            res.status(200).json({Message: "Removed " + staffplanningParam + " with success"})
        })
        .catch((error) => {
            res.status(400).json(error);
        });
});

module.exports = routes;
