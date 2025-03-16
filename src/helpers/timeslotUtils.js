const moment = require('moment');
const momentTimeZone = require('moment-timezone');

/**
 * Generates hourly time slots for the next 7 days, starting tomorrow.
 * 
 * Timezone Handling:
 * - I explicitly use 'Europe/Berlin' timezone to ensure that all generated times 
 *   are aligned with my local timezone. This avoids discrepancies caused by 
 *   Node.js defaulting to UTC, ensuring accurate time slot generation regardless of 
 *   server or system timezone settings.
 * 
 * Each slot is exactly 1 hour long, from 9 AM to 5 PM (last slot is 4 PM - 5 PM) as requested in the readme docs.
 */
const generateTimeSlots = (startDate, endDate) => {
    try {
        const timezone = 'Europe/Berlin';
        const slots = [];
        let currentDay = momentTimeZone.tz(startDate, timezone); // to set timezone explicitly

        while (currentDay.isBefore(endDate)) {
            for (let hour = 9; hour < 17; hour++) {
                const slot = currentDay.clone()
                    .tz(timezone)
                    .set({ hour, minute: 0, second: 0, millisecond: 0 })
                    .format(); // Format to local timezone
                slots.push(slot);
            }
            currentDay.add(1, 'day');
        }

        return slots;

    } catch (error) {
        console.error('Error generating time slots:', error);
        throw error;
    }
};

const isOverlapping = (slot, events) => {
    return events.some(event => {
        const slotStart = moment(slot).utc();
        const slotEnd = moment(slot).utc().add(1, 'hour');
        const eventStart = moment(event.start).utc();
        const eventEnd = moment(event.end).utc();

        return slotStart.isBefore(eventEnd) && slotEnd.isAfter(eventStart);
    });
};

module.exports = {
    generateTimeSlots,
    isOverlapping
};