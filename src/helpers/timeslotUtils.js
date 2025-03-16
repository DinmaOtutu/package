const moment = require('moment');

const START_HOUR = 9;
const END_HOUR = 17;

const generateTimeSlots = (startDate, endDate) => {
    const timeSlots = [];
    for (let date = moment(startDate); date.isBefore(endDate); date.add(1, 'days')) {
        for (let hour = START_HOUR; hour < END_HOUR; hour++) {
            const slotStart = date.clone().hour(hour).minute(0).second(0);
            timeSlots.push(slotStart.format());
        }
    }
    return timeSlots;
}

const isOverlapping = (slot, events) => {
    return events.some((event) => {
        return moment(slot).isBetween(event.start, event.end, null, '[)');
    });
};

module.exports = {
    generateTimeSlots,
    isOverlapping
};