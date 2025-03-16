const db = require('../../mock/db');

const getUserEvents = async (userId) => {
    try {
        const userEvents = await db.calendar.findEventsForUser(userId);
        return userEvents;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    getUserEvents
};
