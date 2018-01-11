const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const Booking = require('../model/booking.model');

const should = chai.should();
chai.use(chaiHttp);

describe('Closingdays requests', () => {
    let closingDays;

    beforeEach((done) => {
        closingDays = new Booking({
            date: '2017-12-27T12:50:23.452',
            reason: 'Test reason',
            sportsFacility: null
        });

        closingDays.save().then(() => done());
    });

    it('Can post closingdays to the NoSQL server', (done) => {
        chai.request(server)
            .post('/api/closingdays')
            .send(closingDays)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

                //properties the body should have
                res.body.closingdays.should.have.property('date');
                res.body.closingdays.should.have.property('reason');
                res.body.closingdays.should.have.property('sportsFacility');
                done();
        });
    });

    it('Cant insert data without a valid sportsFacility', (done) => {


        done();
    });

});