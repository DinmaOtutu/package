const calendarRepository = require('../repository/calendarRepository');
const moment = require('moment');
const { generateTimeSlots, isOverlapping } = require('../helpers/timeslotUtils');

const getAvailableTimeSlots = async (hostUserId) => {
    const startDate = moment.utc().add(1, 'days').startOf('day');
    const endDate = startDate.clone().add(7, 'days');
    const allTimeSlots = generateTimeSlots(startDate, endDate);

    const events = await calendarRepository.getUserEvents(hostUserId);

    const availableSlots = allTimeSlots.filter(slot => {
        return !isOverlapping(slot, events);
    });

    return availableSlots;
};

const getNonFreeTimes = async (hostUserId) => {
    const events = await calendarRepository.getUserEvents(hostUserId);
    return events;
};

module.exports = {
    getAvailableTimeSlots,
    getNonFreeTimes
};