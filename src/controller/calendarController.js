const calendarService = require('../services/calendarService');
const { handleSuccess, handleError } = require('../helpers/responseHandler');

/**
 * Get available time slots for a given host user.
 * 
 * @async
 * @function getAvailableTimeSlots
 * @param {Object} req - Express request object.
 * @param {Object} req.query - Query parameters.
 * @param {string} req.query.hostUserId - ID of the host user.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Returns a promise that resolves to void.
 */
const getAvailableTimeSlots = async (req, res) => {
    try {
        const { hostUserId } = req.query;
        if (!hostUserId) {
            return handleError(res, 'hostUserId is required', 400);
        }
        const timeslots = await calendarService.getAvailableTimeSlots(hostUserId);
        return handleSuccess(res, {
            name: "Eng Test User",
            timeslotLengthMin: 60,
            timeslots,
        }, 200, true);
    } catch (err) {
        return handleError(res, 'Server Error', 500);
    }
};

module.exports = {
    getAvailableTimeSlots
};
