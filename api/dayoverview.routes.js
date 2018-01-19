//Dayoverview routes
var express = require('express');
var routes = express.Router();

const Booking = require('../model/booking.model');
const SportsFacility = require('../model/sportsfacility.model');
const API = require('../config/api_requester');
const moment = require('moment');
//Retrieve booking data
routes.get('/:userid/:facilityid/:date', function(req, res) {

    const userid = req.params.userid;
    const facilityId = req.params.facilityid;
    let date = req.params.date + "";
    let year = date.substring(0,4);
    let month = date.substring(4,6);
    let day = date.substring(6,8);
    const parsedDate = year+"-"+month+"-"+day;

    Booking.find({})
      .then((bookings) => {
        
        let result = [];
        bookings.forEach(element => {
          if ((parsedDate == moment(element.day).subtract(1,'day').format('YYYY-MM-DD'))
            && (userid == element.sportsFacility.userId)) {
              
              SportsFacility.findById(facilityId)
                .then((facility) => {
                  if(facility){
                    if(facility.id == element.sportsFacility.sportsFacilityId){
                      result.push(element);
                    }
                  }
                })
                .catch((error) => {
                  console.log(error);
                })
          }
        });
        setTimeout(() => {
          res.status(200).json(result);

        },500)
      })
      .catch((error) => {
        res.status(400).json(error);
      });
});

module.exports = routes;
