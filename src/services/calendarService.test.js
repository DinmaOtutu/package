const calendarService = require('../services/calendarService');
const calendarRepository = require('../repository/calendarRepository');
const moment = require('moment');

jest.mock('../repository/calendarRepository');

describe('Calendar Service', () => {
  it('should exclude overlapping events from timeslots', async () => {
    const mockEvents = [
      { start: moment().add(2, 'days').hour(10).format(), end: moment().add(2, 'days').hour(11).format() },
    ];

    calendarRepository.getUserEvents.mockResolvedValue(mockEvents);

    const timeslots = await calendarService.getAvailableTimeSlots('hostUserId');
    expect(timeslots).not.toContain(mockEvents[0].start);
  });
});
