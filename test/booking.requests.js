const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Booking = require('../model/booking.model');
const API = require('../config/api_requester');

var should = chai.should();
chai.use(chaiHttp);

describe('Booking requests', () => {
    it('Can post a booking to the NoSQL server', (done) => {
        done();
    });

    it('Can post a booking to the SQL server VIA the NoSQL server', (done) => {
        done();
    });

    it('Can retrieve bookings from the SQL server', (done) => {
        
        chai.request(server)
            .get('/api/bookings')
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                chai.assert.equal(res.body.error,undefined);
                
                done();
            });
    });
});