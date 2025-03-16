const express = require('express');
const calendarController = require('../controller/calendarController.js');
const validateUser = require('../middleware/validateUser.js');

const router = express.Router();

router.get('/calendar', validateUser, calendarController.getAvailableTimeSlots);

module.exports = router;
