const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Maintenance = require('../model/maintenance.model');
const SportsFacility = require('../model/sportsfacility.model');

const should = chai.should();
const assert = require('assert');
chai.use(chaiHttp);

describe('Staffplanning requests', () => {
    let maintenance;
    let maintenanceId = '0';

    let sportsFacility;
    let sportsFacilityId = '0';

    beforeEach((done) => {
        
        sportsFacility = new SportsFacility({
            name: 'DuurzaamSport',
            address: 'Nog wat straat 11',
            city: 'Ridderkerk',
            phone: '0612349283',
            email: 'test@mail.com',
            openingHours: undefined
        });

        maintenance = new Maintenance({
            days: ['2018-01-28T00:00:00.000'],
            subject: 'Basketbal',
            materials: ['Basket, ballen'],
            reason: '',
            sportsFacility: sportsFacilityId
        }); 

        sportsFacility.save()
            .then((result) => {
                sportsFacilityId = result._id;
                maintenance.sportsFacility = sportsFacilityId;
                maintenance.save()
                    .then((result) => {
                        maintenanceId = result._id;
                        done();
                     })
            })
    })

    afterEach((done) => {
        Maintenance.findByIdAndRemove(maintenanceId)
            .then(() => SportsFacility.findByIdAndRemove(sportsFacilityId)
                .then(() => {
                    done();
                }))
    });


    it('Can post a Maintenance to the NoSQL server', (done) => {
        
        postBody = new Maintenance({
            days: ['2018-01-28T00:00:00.000'],
            subject: 'Basketbal',
            materials: ['Basket, ballen'],
            reason: '',
            sportsFacility: sportsFacilityId
        }); 

        chai.request(server)
            .post('/api/maintenances')
            .send(postBody)
            .end((err, res) => {
                //test response
                res.should.have.status(200);
                res.body.should.be.a('object');

                //properties the body should have:  
                res.body.should.have.property('days');
                res.body.should.have.property('subject');
                res.body.should.have.property('materials');
                res.body.should.have.property('reason');
                res.body.should.have.property('sportsFacility');

                Maintenance.findByIdAndRemove(res.body._id)
                    .then((res) => {
                        done();
                    })
        });
    });

    it('Can post a Maintenance to the NoSQL server without the property reason', (done) => {
        
        postBody = new Maintenance({
            days: ['2018-01-28T00:00:00.000'],
            subject: 'Basketbal',
            materials: ['Basket, ballen'],
            sportsFacility: sportsFacilityId
        }); 

        chai.request(server)
            .post('/api/maintenances')
            .send(postBody)
            .end((err, res) => {
                //test response
                res.should.have.status(200);
                res.body.should.be.a('object');

                //properties the body should have:  
                res.body.should.have.property('days');
                res.body.should.have.property('subject');
                res.body.should.have.property('materials');
                res.body.should.have.property('sportsFacility');

                Maintenance.findByIdAndRemove(res.body._id)
                    .then((res) => {
                        done();
                    })
        });
    });

    it('Can update a Maintenance in the NoSQL server', (done) => {
        putBody = {
            days: ['2018-01-28T00:00:00.000'],
            subject: 'Geupdate',
            materials: ['Basket, ballen'],
            sportsFacility: sportsFacilityId
        };

        chai.request(server)
            .put('/api/maintenances/' + maintenanceId)
            .send(putBody)
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                assert(res.body.subject === 'Geupdate');
                done();
            });

    });

    it('Can get all Maintenances', (done) => {
        chai.request(server)
            .get('/api/maintenances')
            .end((err,res) => {

                res.should.have.status(200);
                res.body.should.be.a('array');

                res.body[0].should.have.property('days');
                res.body[0].should.have.property('subject');
                res.body[0].should.have.property('materials');
                res.body[0].should.have.property('sportsFacility');

                done();
            });
    });

    it('Can get one Maintenance using its ID', (done) => {
        chai.request(server)
            .get('/api/maintenances/' + maintenanceId)
            .end((err,res) => {

                res.should.have.status(200);
                res.body.should.be.a('object');

                res.body.should.have.property('days');
                res.body.should.have.property('subject');
                res.body.should.have.property('materials');
                res.body.should.have.property('sportsFacility');

                done();
            });
    });

    it('Can delete a Maintenance', (done) => {
        toDelete = new Maintenance({
            days: ['2018-01-28T00:00:00.000'],
            subject: 'Basketbal',
            materials: ['Basket, ballen'],
            reason: '',
            sportsFacility: sportsFacilityId
        }); 

        let toDeleteId;

        toDelete.save()
            .then((res) => {
                toDeleteId = res._id;
                chai.request(server)
                    .del('/api/maintenances/' + toDeleteId)
                    .end((err, res) => {
        
                        res.should.have.status(200);

                        Maintenance.findById(toDeleteId)
                            .then((res) => {
                                assert(res === null);
                                done();
                            });
                    });
            });
    });
});