const assert = require('assert');
const Staffplanning = require('../model/staffplanning.model');

describe('Validating Staffplanning', () => {

    it('Staffplanning day property is required', () => {
        const staffplanning = new Staffplanning({ day: undefined });
        const validationResult = staffplanning.validateSync(staffplanning);
        const {message} = validationResult.errors.day;

        assert(message === 'Day is required.');
    });

    it('Staffplanning startingTime property is required', () => {
        const staffplanning = new Staffplanning({ startingTime: undefined});
        const validationResult = staffplanning.validateSync(staffplanning);
        const {message} = validationResult.errors.startingTime;

        assert(message === 'Starting time is required.');
    });

    it('Staffplanning endingTime property is required', () => {
        const staffplanning = new Staffplanning({ endingTime: undefined });
        const validationResult = staffplanning.validateSync(staffplanning);
        const {message} = validationResult.errors.endingTime;

        assert(message === 'Ending time is required.');
    });

    it('Staffplanning sportsFacility property is required', () => {
        const staffplanning = new Staffplanning({ sportsFacility: undefined });
        const validationResult = staffplanning.validateSync(staffplanning);
        const {message} = validationResult.errors.sportsFacility;

        assert(message === 'Sportfacility is required.');
    })

    it('Staffplanning staffMember property is required', () => {
        const staffplanning = new Staffplanning({ staffMember: undefined });
        const validationResult = staffplanning.validateSync(staffplanning);
        const {message} = validationResult.errors.staffMember;

        assert(message === 'Staffmember is required.');
    })
});