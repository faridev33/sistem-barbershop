const express = require('express');
const router = express.Router();
const { getServices, createBooking } = require('../controllers/bookingController');

router.get('/services', getServices); // Untuk mengisi dropdown
router.post('/create', createBooking); // Untuk submit form

module.exports = router;