//Booking routes
var express = require('express');
var routes = express.Router();

const Booking = require('../model/booking.model');
const API = require('../config/api_requester');

//Boeking toevoegen:
routes.post('', function(req, res) {
    res.contentType('application/json');
    const bookingBody = req.body;

    //POST een booking naar de SQL database
    API.request('/api/bookings', 'POST', bookingBody, (response) => {
        if(response.error) {
            res.status(400).json({error: 'POST request failed'});
        } else {
            //POST een booking naar de NoSql database
            const newBooking = new Booking(bookingBody);

            newBooking.save()
                .then(() => {
                    res.status(200).json(newBooking);
                }).catch((error) => {
                res.status(400).json(error);
            });
        }
    });
});

//Retrieve booking data
routes.get('', function(req, res) {
    let aspCount;
    let mongoCount;
    let mongoBookings = [];
    let amountSaved = 0;
    let existingBookings;

    API.request('/api/bookings/', 'GET', {}, (response) => {
        if (response.error) {
            res.status(400).json({ error: 'Could not retrieve bookings' });
        } else {
            //Count bookings from ASP.NET API
            aspCount = response.length;

            //Count bookings from MongoDB DB
            Booking.find({})
                .then((bookings) => {
                    mongoCount = bookings !== null ? bookings.length : 0;
                    existingBookings = bookings;
                })
                .then(() => {

                    console.log("- ASP.NET API count = " + aspCount);
                    console.log("- MongoDB count = " + mongoCount);

                    //Compare both amounts of facilities
                    //Update if unequal
                    if (aspCount !== mongoCount) {
                        console.log('- Counts are not equal.');
                        console.log('- Updating MongoDB with ASP.NET API bookings...');
                        Booking.remove({})
                            .then(() => {
                                for(let i = 0; i < aspCount; i++) {
                                    let booking = new Booking();
                                    booking.day = response[i].day;
                                    booking.startingTime = response[i].startingTime;
                                    booking.endingTime = response[i].endingTime;
                                    booking.status = response[i].status;
                                    booking.userId = response[i].userId;
                                    booking.sportsFacility = response[i]._embedded.SportsFacility;

                                    //Save newly created booking
                                    //and increment amountSaved
                                    booking.save()
                                        .then((bk) => {
                                            mongoBookings.push(bk);
                                            amountSaved++;

                                            //Send response only when all items are saved
                                            if(amountSaved === aspCount) {
                                                res.status(200).json(mongoBookings);
                                            }   
                                        });
                                }
                        })
                    } else {
                        res.status(200).json(existingBookings);
                    }
                });
        }
    });

/*    API.request('/api/bookings', 'GET', {}, (response) => {
        if (response.error) {
            res.status(400).json({ error: 'Could not retrieve all bookings' });
            console.log(response);
        } else {
            res.status(200).json(response);
        }
    });*/
});

module.exports = routes;
