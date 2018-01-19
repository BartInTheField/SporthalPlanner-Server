//Weekoverview routes
var express = require('express');
var routes = express.Router();

const Booking = require('../model/booking.model');
const SportsFacility = require('../model/sportsfacility.model');
const API = require('../config/api_requester');
const moment = require('moment');

//Retrieve booking data
routes.get('/:userid/:facilityid/:date', function(req, res) {

    const userId = req.params.userid;
    const facilityId = req.params.facilityid;
    let date = req.params.date + "";
    let year = date.substring(0,4);
    let month = date.substring(4,6);
    let day = date.substring(6,8);
    let parsedDate = new Date(year,month-1,day);
    let dateWrapper = moment(parsedDate).format('YYYY-MM-DD');

    Booking.find({})
      .then((bookings) => {
        
        let result = [];
        for(let i = 0;i < 7;i++){
          bookings.forEach(element => {
              
            if(moment(element.day).subtract(1,'day').format('YYYY-MM-DD') === moment(dateWrapper).add(i,'day').format('YYYY-MM-DD').toString()
            && (userId == element.sportsFacility.userId)){
              SportsFacility.findById(facilityId)
                .then((facility) => {
                  if(facility){
                    if(facility.id == element.sportsFacility.sportsFacilityId){
                      if(result[i])
                        result[i].push(element);
                      else{
                        result[i] = [];
                        result[i].push(element);
                      }
                    }
                  }
                })
                .catch((error) => {
                  console.log(error);
                })
            }
          });
          if(!result[i])
            result[i] = null;
        }
        setTimeout(() => {
          res.status(200).json(result);

        },500);
      })
      .catch((error) => {
        res.status(400).json(error);
      });

});

module.exports = routes;
