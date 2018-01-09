const server = require('../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require('../../model/user.model');

let should = chai.should();
chai.use(chaiHttp);

describe('User PUT routes tests', () => {
    //delete the database with users first:
    beforeEach((done) => {
        User.remove({}, (err) => {
            done();
        });
    });

    it('Can update an existing user with the given id', (done) => {
        let user = new User({
            email: 'testuser@test.nl',
            username: 'rickvoermans',
            password: 'ditwordtgehashed'
        });

        user.save((err, user) => {
            chai.request(server)
                .put('/api/users' + user._id)
                .send({
                    email: 'veranderde@mail.com',
                    username: 'rickvoermans',
                    password: 'ditwordtgehashed'
            }).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('email').eql('veranderde@mail.com');
                done();
            });
        });
    });
});