const server = require('../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require('../../model/user.model');

let should = chai.should();
chai.use(chaiHttp);

describe('User POST routes tests', () => {
    //delete the database with users first:
    beforeEach((done) => {
        User.remove({}, (err) => {
            done();
        });
    });

    it('Can register an user', (done) => {
        let user = new User({
            email: 'nieuweuser@mail.nl',
            username: 'Regristeren1',
            password: 'NogEenHash'
        });

        chai.request(server)
            .post('/api/users')
            .send(user)
            .end((err, res) => {
                res.body.should.have.status(200);
                res.body.should.have.property('email');
                res.body.should.have.property('username');
                res.body.should.have.property('password');
                done();
        });
    });

    it('Can log in with an existing user', (done) => {
        done();
    });
});