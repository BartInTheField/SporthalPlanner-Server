//StaffMember routes
var express = require('express');
var routes = express.Router();

const StaffMember = require('../model/staffmember.model');
const API = require('../config/api_requester');

//Add staffmember:
routes.post('', function(req, res) {
    res.contentType('application/json');
    const staffMemberBody = req.body;

    //POST a staffmember to MongoDB
    const newStaffMember = new StaffMember(staffMemberBody);

    newStaffMember.save()
        .then(() => {
            res.status(200).json(newStaffMember);
        }).catch((error) => {
            res.status(400).json(error);
    });
});


module.exports = routes;
