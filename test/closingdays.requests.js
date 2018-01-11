const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');

const ClosingDays = require('../model/closingdays.model');
const SportsFacility = require('../model/sportsfacility.model');

const should = chai.should();
chai.use(chaiHttp);

describe('Closingdays requests', () => {
    let closingDay;
    let closingDayId;

    const sportsFacility = new SportsFacility({
        name: 'T-kwadraat',
        address: 'Olympiaplein 3',
        city: 'Tilburg',
        phone: '0612345678',
        email: 'info@tkwadraat.nl',
        openingHours: null,
        sportsHalls: null
    });

    closingDay = new ClosingDays({
        date: '2017-12-27T12:50:23.452',
        reason: 'Test reason',
        sportsFacility: sportsFacility
    });

    it('can save closingdays to the NoSQL database', (done) => {
        chai.request(server)
            .post('/api/closingdays')
            .send(closingDay)
            .end((err, res) => {

                //save id for DELETE test
                closingDayId = res.body._id;

                //test response
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('date');
                res.body.should.have.property('reason');
                res.body.should.have.property('sportsFacility');
                done();
            })
    });

    it('can retrieve closingDays from NoSQL database', (done) => {
        chai.request(server)
            .get('/api/closingdays')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body[0].should.have.property('date');
                done();
            })
    });

    it('can retrieve one closingDay from NoSQL database', (done) => {
        chai.request(server)
            .get('/api/closingdays/' + closingDayId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            })
    });

    it('can delete closingdays from the NoSQL database', (done) => {
        chai.request(server)
            .delete('/api/closingdays/' + closingDayId)
            .end((err, res) => {
                ClosingDays.findById(res.body._id)
                    .then((closingDay) => {
                        assert(closingDay === null);
                        done();
                    });
            })
    })

});