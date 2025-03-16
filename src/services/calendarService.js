const calendarRepository = require('../repository/calendarRepository');
const moment = require('moment');
const { generateTimeSlots, isOverlapping } = require('../helpers/timeslotUtils');

const getAvailableTimeSlots = async (hostUserId) => {
    const startDate = moment().add(1, 'days').startOf('day');
    const endDate = startDate.clone().add(7, 'days');
    const allTimeslots = generateTimeSlots(startDate, endDate);

    const events = await calendarRepository.getUserEvents(hostUserId);

    const result = allTimeslots.filter((slot) => !isOverlapping(slot, events));
    return result;
}

module.exports = {
    getAvailableTimeSlots
};