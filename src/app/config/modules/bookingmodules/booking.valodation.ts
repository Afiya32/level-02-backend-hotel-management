// booking validation

import { check } from 'express-validator';

export const bookingValidation = [
    check('date').isISO8601().withMessage('Date must be in ISO8601 format'),
    check('slots').isArray().withMessage('Slots must be an array of slot IDs'),
    check('room').isMongoId().withMessage('Room must be a valid MongoID'),
    check('user').isMongoId().withMessage('User must be a valid MongoID'),
];
