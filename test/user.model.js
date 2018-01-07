const User = require('../model/user.model');
const assert = require('assert');

describe('Validating users', () => {

    it('user requires a name', () => {
        const user = new User({ username: undefined });
        const validationResult = user.validateSync(user);
        const {message} = validationResult.errors.username;

        assert(message === 'Username is required.');
    });

    it('user requires an email', () => {
        const user = new User({ email: 'tester@myowndomain.notexisting', username: 'Tester' });
        const validationResult = user.validateSync(user);
        const {message} = validationResult.errors.email;

        assert(message === 'Please enter a valid e-mail.');
    });
});