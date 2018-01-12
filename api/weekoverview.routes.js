//Weekoverview routes
var express = require('express');
var routes = express.Router();

const Booking = require('../model/booking.model');
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

    API.request('/api/bookings', 'GET', {}, (response) => {
        if (response.error) {
            res.status(400).json({ error: 'Could not retrieve all bookings' });
            console.log(response);
        } else {
            let result = [];

            for(let i = 0;i < 7;i++){   
                response.forEach(element => {
                    
                    if(element.day.substring(0,10) === moment(dateWrapper).add(i,'day').format('YYYY-MM-DD').toString()){
                        if(result[i])
                            result[i].push(element);
                        else{
                            result[i] = [];
                            result[i].push(element);
                        }
                    }
                });
                if(!result[i])
                    result[i] = null;
            }
            res.status(200).json(result);
        }
    });
});

module.exports = routes;
