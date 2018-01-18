//Sportsfacility Routes
var express = require('express');
var routes = express.Router();

const API = require('../config/api_requester');
const SportsFacility = require('../model/sportsfacility.model');

//Retrieve all sportsfacilities
routes.get('/', function(req, res, done) {
    let aspCount;
    let mongoCount;
    let mongoFacilities = [];
    let amountSaved = 0;
    let existingSportsfacilities;

    API.request('/api/sportsfacilities/', 'GET', {}, (response) => {
        if (response.error) {
            res.status(400).json({ error: 'Could not retrieve sportsfacilities' });
        } else {
            //Count sportsfacilities from ASP.NET API
            aspCount = response.length;

            //Count sportsfacilities from MongoDB DB
            SportsFacility.find({})
                .then((sfs) => {
                    mongoCount = sfs !== null ? sfs.length : 0;
                    existingSportsfacilities = sfs;
                })
                .then(() => {

                    console.log("- ASP.NET API count = " + aspCount);
                    console.log("- MongoDB count = " + mongoCount);

                    //Compare both amounts of facilities
                    //Update if unequal
                    if (aspCount !== mongoCount) {
                        console.log('- Counts are not equal.');
                        console.log('- Updating MongoDB with ASP.NET API sportsfacilities...');
                        SportsFacility.remove({})
                            .then(() => {
                                for(let i = 0; i < aspCount; i++) {
                                    let sportsFacility = new SportsFacility();
                                    sportsFacility.name = response[i].name;
                                    sportsFacility.address = response[i].addres;
                                    sportsFacility.city = response[i].city;
                                    sportsFacility.phone = response[i].phone;
                                    sportsFacility.email = response[i].email;
                                    sportsFacility.userId = response[i]._embedded.SportsHalls[0] ?  response[i]._embedded.SportsHalls[0].sportsFacility.userId : null;
                                    sportsFacility.openingHours = response[i]._embedded.SportsHalls[0] ?  response[i]._embedded.SportsHalls[0].sportsFacility.openingHours : null;
                                    for(let j = 0; j < response[i]._embedded.SportsHalls; j++) {
                                        sportsFacility.sportsHalls = response[i]._embedded.SportsHalls[j].sportsHallId;
                                    }

                                    //Save newly created sportsFacility
                                    //and increment amountSaved
                                    sportsFacility.save()
                                        .then((sf) => {
                                            mongoFacilities.push(sf);
                                            amountSaved++;

                                            //Send response only when all items are saved
                                            if(amountSaved === aspCount) {
                                                res.status(200).json(mongoFacilities);
                                            }
                                        });
                                }
                        })
                    } else {
                        res.status(200).json(existingSportsfacilities);
                    }
                });
        }
    });
});

module.exports = routes;