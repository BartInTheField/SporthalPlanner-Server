const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Booking = require('../model/booking.model');

var should = chai.should();
chai.use(chaiHttp);

describe('Booking requests', () => {
    it('Can post a booking to the NoSQL server', (done) => {

    });

    it('Can post a booking to the SQL server VIA the NoSQL server', (done) => {

    });

    it('Can retrieve bookings from the SQL server', (done) => {

    });
});