jest.mock('../../src/helpers/responseHandler', () => ({
    handleSuccess: jest.fn(),
    handleError: jest.fn(),
}));

const calendarController = require('./calendarController.js');
const calendarService = require('../../src/services/calendarService');
const { handleSuccess, handleError } = require('../../src/helpers/responseHandler');

jest.mock('../../src/services/calendarService');

describe('Calendar Controller - getAvailableTimeSlots', () => {

    let req;
    let res;

    beforeEach(() => {
        req = {
            query: { hostUserId: 'host_user_1' }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        jest.clearAllMocks();
    });

    it('should return available timeslots successfully', async () => {
        const mockTimeslots = ['2025-03-18T10:00:00.000', '2025-03-18T11:00:00.000'];

        calendarService.getAvailableTimeSlots.mockResolvedValue(mockTimeslots);

        await calendarController.getAvailableTimeSlots(req, res);

        expect(calendarService.getAvailableTimeSlots).toHaveBeenCalledWith('host_user_1');
        expect(handleSuccess).toHaveBeenCalledWith(
            res,
            {
                name: 'Eng Test User',
                timeslotLengthMin: 60,
                timeslots: mockTimeslots,
            },
            200,
            true
        );
    });

    it('should handle missing hostUserId', async () => {
        req.query.hostUserId = null;

        await calendarController.getAvailableTimeSlots(req, res);

        expect(calendarService.getAvailableTimeSlots).not.toHaveBeenCalled();
        expect(handleError).toHaveBeenCalledWith(res, 'hostUserId is required', 400);
    });

    it('should handle internal server error', async () => {
        calendarService.getAvailableTimeSlots.mockRejectedValue(new Error('Database error'));

        await calendarController.getAvailableTimeSlots(req, res);

        expect(calendarService.getAvailableTimeSlots).toHaveBeenCalledWith('host_user_1');
        expect(handleError).toHaveBeenCalledWith(res, 'Server Error', 500);
    });
});
