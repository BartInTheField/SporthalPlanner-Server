//Dayoverview routes
var express = require('express');
var routes = express.Router();

const Booking = require('../model/booking.model');
const API = require('../config/api_requester');

//Retrieve booking data
routes.get('/:userid/:facilityid/:date', function(req, res) {

    const userId = req.params.userid;
    const facilityId = req.params.facilityid;
    let date = req.params.date + "";
    let year = date.substring(0,4);
    let month = date.substring(4,6);
    let day = date.substring(6,8);
    const parsedDate = year+"-"+month+"-"+day;

    API.request('/api/bookings', 'GET', {}, (response) => {
        if (response.error) {
            res.status(400).json({ error: 'Could not retrieve all bookings' });
            console.log(response);
        } else {
            let result = [];
          if(!response.message) {
            response.forEach(element => {
              if ((parsedDate === element.day.substring(0, 10))
                && (userId == element._embedded.SportsFacility.userId)
                && (facilityId == element._embedded.SportsFacility.sportsFacilityId)) {
                result.push(element);
              }
            });
          }
            res.status(200).json(result);
        }
    });
});

module.exports = routes;
