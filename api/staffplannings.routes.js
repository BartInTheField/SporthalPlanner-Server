//StaffMember routes
var express = require('express');
var routes = express.Router();
const StaffPlanning = require('../model/staffplanning.model');
const StaffMember = require('../model/staffmember.model');
const API = require('../config/api_requester');

//Add staffplanning:
routes.post('', function(req, res) {
    res.contentType('application/json');

    // Create a staff planning object
    const newStaffPlanning = new StaffPlanning({
        day: req.body._day,
        startingTime: req.body._startingTime,
        endingTime: req.body._endingTime,
        sportsFacility: req.body._sportsFacilityId,
        staffMember: req.body._staffMember
    });

    //Save new staff planning to MongoDB
    newStaffPlanning.save()
        .then(() => {
            res.status(200).json({
                planning: newStaffPlanning,
                staffMember: req.body.staffMemberObject});
        }).catch((error) => {
            res.status(400).json(error);
    });
});

//Get staffplanning using sportsfacility ID:
routes.get('/sportsfacilities/:sportsfacilityId', function(req, res) {
    res.contentType('application/json');
    const sportsfacilityParam = req.params.sportsfacilityId;

    StaffPlanning.find({sportsFacility: sportsfacilityParam})
        .then((plannings) => {
            plannings.forEach(element => {
                StaffMember.findById(element.staffMember)
                .then((staffMember) => {
                    element.staffMember = staffMember;
                })
                .catch(error => {
                    res.status(401).json({message:'Error'})
                });    
            });
            setTimeout(() => {
                res.status(200).json(plannings);
            }, 500);
        })
        .catch((error) => {
            res.status(400).json(error);
            console.log('hierzoooooo');
        })
});

//Get staffplanning using staffmember ID:
routes.get('/staffmembers/:staffmember', function(req, res) {
    res.contentType('application/json');
    const staffmemberParam = req.params.staffmember

    StaffPlanning.find({staffMember: staffmemberParam})
        .then((plannings) => {
            StaffMember.findById(staffmemberParam)
            .then((staffMember) => {
                plannings.forEach(element => {
                    element.staffMember = staffMember;    
                });
                res.status(200).json(plannings);
            })
            .catch(error => {
                res.status(401).json({message:'Error'})
            });
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
