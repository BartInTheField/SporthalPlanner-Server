const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
chai.use(chaiHttp);

const User = require('../model/user.model');
const assert = require('assert');

describe('Validating users', () => {

    let userId;
    let hash;
    const password = 'secret123$';

    before((done) => {
        chai.request(server)
            .post('/api/users')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({ email: 'tester@sporthalplanner.nl',
                username: 'tester',
                password: password })
            .end((err, res) => {
                userId = res.body._id;
                hash = res.body.password;
                done();
            });
    });

    it('Requires a name', () => {
        const user = new User({ username: undefined });
        const validationResult = user.validateSync(user);
        const {message} = validationResult.errors.username;

        assert(message === 'Username is required.');
    });

    it('Requires an email', () => {
        const user = new User({ email: 'tester@myowndomain.notexisting', username: 'Tester' });
        const validationResult = user.validateSync(user);
        const {message} = validationResult.errors.email;

        assert(message === 'Please enter a valid e-mail.');
    });

    it('Hashes a password', () => {
        assert(password !== hash);
        assert(hash.length === 60);

    });

    after((done) => {
        chai.request(server)
            .delete('/api/users/' + userId)
            .end((err, res) => {
                done();
            });
    })
});