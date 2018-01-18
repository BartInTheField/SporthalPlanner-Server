const assert = require('assert');
const Maintenance  = require('../model/maintenance.model');

describe('Validating Maintenance', () => {

    it('Maintenance days property is required', () => {
        const maintenance = new Maintenance({ days: undefined });
        const validationResult = maintenance.validateSync(maintenance);
        const {message} = validationResult.errors.days;

        assert(message === 'Day is required.');
    });

    it('Maintenance subject property is required', () => {
        const maintenance = new Maintenance({ subject: undefined });
        const validationResult = maintenance.validateSync(maintenance);
        const {message} = validationResult.errors.subject;

        assert(message === 'Subject is required.');
    });

    it('Maintenance materials property is required', () => {
        const maintenance = new Maintenance({ materials: undefined });
        const validationResult = maintenance.validateSync(maintenance);
        const {message} = validationResult.errors.materials;

        assert(message === 'Material is required.');
    });

    it('Maintenance reason property is NOT required', () => {
        const maintenance = new Maintenance({ reason: undefined });
        const validationResult = maintenance.validateSync(maintenance);

        assert(validationResult.errors.reason === undefined);
    });

    it('Maintenance sportsFacility property is required', () => {
        const maintenance = new Maintenance({ sportsFacility: undefined });
        const validationResult = maintenance.validateSync(maintenance);
        const {message} = validationResult.errors.sportsFacility;

        assert(message === 'SportsFacility is required.');
    })
});