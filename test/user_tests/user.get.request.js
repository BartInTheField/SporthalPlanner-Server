const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require('../model/user.model');

var should = chai.should();
chai.use(chaiHttp);


describe('User GET routes tests', () => {
    let testUser

    //Eerst user aanmaken zodat je die weer kan opvragen
    beforEach((done) => {
        testUser = new User({
            email: 'testmail@mail.nl',
            username: 'testUser',
            password: 'hashdingen'
        });

        testUser.save().then(() => done());
    });


    it('Can retrieve users', (done) => {
        chai.request(server)
            .get('/api/users')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();        
        });
    });

    it('Can retrieve 1 user', (done) => {
        chai.request(server)
            .get('/api/users/1')
            .end((err, res) => {
                res.should.have.status(200);
                done();
        });
    });
});