const server = require('../../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const User = require('../../model/user.model');

let should = chai.should();
chai.use(chaiHttp);

describe('User DELETE routes tests', () => {
    //delete the database with users first:
    beforeEach((done) => {
        User.remove({}, (err) => {
            done();
        });
    });
    
    it('Can delete 1 user', (done) => {
        let user = new User({
            email: 'dezeusergaatweg@delete.nl',
            username: 'deleteMij',
            password: 'OokEenHash'
        });

        user.save((err, user) => {
            chai.request(server)
                .delete('/api/users' + user._id)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
            });
        });
    });
});