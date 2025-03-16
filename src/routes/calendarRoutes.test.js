const request = require('supertest');
const express = require('express');

const calendarRoutes = require('./calendarRoutes.js');
const calendarService = require('../services/calendarService');

jest.mock('../services/calendarService');

const app = express();
app.use(express.json());
app.use('/api', calendarRoutes);

describe('GET /api/calendar', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return available timeslots', async () => {
        const mockTimeslots = [
            '2025-03-18T10:00:00.000',
            '2025-03-18T11:00:00.000',
        ];
    
        calendarService.getAvailableTimeSlots.mockResolvedValue(mockTimeslots);
    
        const response = await request(app)
            .get('/api/calendar')
            .query({ hostUserId: 'host_user_1' })
            .expect('Content-Type', /json/)
            .expect(200);
    
        expect(response.body).toEqual({
            status: 'success',
            message: 'Success',
            data: {
                name: 'Eng Test User',
                timeslotLengthMin: 60,
                timeslots: mockTimeslots,
            },
        });
    
        expect(calendarService.getAvailableTimeSlots).toHaveBeenCalledWith('host_user_1');
    });
    
    it('should return 400 if hostUserId is missing', async () => {
        const response = await request(app)
            .get('/api/calendar')
            .expect(400);
    
        expect(response.body).toEqual({
            error: 'hostUserId is required',
        });
    });

    it('should handle internal server error', async () => {
        calendarService.getAvailableTimeSlots.mockRejectedValue(new Error('Database error'));

        const response = await request(app)
            .get('/api/calendar')
            .query({ hostUserId: 'host_user_1' })
            .expect(500);

        expect(response.body).toEqual({
            status: 'error',
            message: 'Server Error',
        });
    });
});
