const assert = require('assert');
const Staffmember = require('../model/staffmember.model');

describe('Validating Staffmember', () => {

    it('Staffmember firstName property is required', () => {
        const staffmember = new Staffmember({ firstName: undefined });
        const validationResult = staffmember.validateSync(staffmember);
        const {message} = validationResult.errors.firstName;

        assert(message === 'firstName is required.');
    });

    it('Staffmember lastName property is required', () => {
        const staffmember = new Staffmember({ lastName: undefined });
        const validationResult = staffmember.validateSync(staffmember);
        const {message} = validationResult.errors.lastName;

        assert(message === 'lastName is required.');
    });

    it('Staffmember dateOfBirth propery defaults to today', () => {
        const staffmember = new Staffmember({firstName: 'Test', lastName: 'Man'})
        assert(staffmember.dateOfBirth.getFullYear() === new Date().getFullYear())
        assert(staffmember.dateOfBirth.getMonth() === new Date().getMonth())
        assert(staffmember.dateOfBirth.getDay() === new Date().getDay())
    })
});