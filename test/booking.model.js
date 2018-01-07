const assert = require('assert');
const Booking = require('../model/booking.model');

describe('Validating bookings', () => {

    it('booking day property is required', () => {
        const booking = new Booking({ day: undefined });
        const validationResult = booking.validateSync(booking);
        const {message} = validationResult.errors.day;

        assert(message === 'Day is required.');
    });

    it('booking startingTime property is required', () => {
        const booking = new Booking({ startingTime: undefined });
        const validationResult = booking.validateSync(booking);
        const {message} = validationResult.errors.startingTime;

        assert(message === 'Starting time is required.');
    });

    it('booking endingTime property is required', () => {
        const booking = new Booking({ endingTime: undefined });
        const validationResult = booking.validateSync(booking);
        const {message} = validationResult.errors.endingTime;

        assert(message === 'Ending time is required.');
    });

    it('booking userId property is required', () => {
        const booking = new Booking({ userId: undefined });
        const validationResult = booking.validateSync(booking);
        const {message} = validationResult.errors.userId;

        assert(message === 'User ID is required.');
    });
});