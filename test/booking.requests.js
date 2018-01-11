const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Booking = require('../model/booking.model');

const should = chai.should();
chai.use(chaiHttp);

describe('Booking requests', () => {
    let booking;
    let bookingId;

    booking = new Booking({
        day: '2017-12-27T12:50:23.452',
        startingTime: '11:00',
        endingTime: '12:00',
        userId: '54e6392e-6d8a-4436-8e91-a2c5daf0b660',
        SportsHallField: 1,
        status: 0
    });

    afterEach((done) => {
        Booking.findByIdAndRemove(bookingId)
            .then(() => done());
    });

    it('Can post a booking to the NoSQL server', (done) => {
        chai.request(server)
            .post('/api/bookings')
            .send(booking)
            .end((err, res) => {

                //set bookingId (to later delete the same booking)
                bookingId = res.body._id;

                //test response
                res.should.have.status(200);
                res.body.should.be.a('object');

                //properties the body should have:
                res.body.should.have.property('day');
                res.body.should.have.property('startingTime');
                res.body.should.have.property('endingTime');
                res.body.should.have.property('userId');
                res.body.should.have.property('status');
                done();
        });
    });

    // it('Can post a booking to the SQL server VIA the NoSQL server', (done) => {
    //     done();
    // });

    it('Can retrieve bookings from the SQL server', (done) => {
        chai.request(server)
            .get('/api/bookings')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                chai.assert.equal(res.body.error, undefined);
                
                done();
        });
    });
});